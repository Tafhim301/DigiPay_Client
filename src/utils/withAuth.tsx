
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);

        if (isLoading) {
            return <DashboardSkeleton></DashboardSkeleton>


        }

        if (!isLoading && !data?.data?.phone) {
            return <Navigate to={'/login'}></Navigate>
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {

            return <Navigate to={'/unauthorized'}></Navigate>
        }


        return <Component />
    }
}