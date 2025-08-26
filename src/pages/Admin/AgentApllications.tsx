/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import SkeletonTable from "@/components/Skeletons/TableSkeletons";
import { FileText, UserX, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
    useApproveAgentApplicationsMutation,
    useGetAllAgentApplicationsQuery,
    useRejectAgentApplicationsMutation,

} from "@/redux/feature/agent/agent.api";

interface IAgentApplication {
    _id: string;
    name: string;
    phone: string;
    role: string;
    approvalStatus: "PENDING" | "APPROVED";
    createdAt: string;
}


const StatusBadge = ({
    status,
}: {
    status: IAgentApplication["approvalStatus"];
}) => {
    const getBadgeClass = () => {
        switch (status) {
            case "APPROVED":
                return "bg-green-100 text-green-800 border-green-300";

            case "PENDING":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };
    return <Badge className={getBadgeClass()}>{status}</Badge>;
};

export default function AgentApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const {
        data: applicationsData,
        isLoading,
        refetch,
    } = useGetAllAgentApplicationsQuery({
        page: currentPage,
        limit,
    });

    const [approveApplication, { isLoading: isApproving }] =
        useApproveAgentApplicationsMutation();
    const [rejectApplication, { isLoading: isRejecting }] =
        useRejectAgentApplicationsMutation();

    const isActionLoading = isApproving || isRejecting;

    const applications: IAgentApplication[] = applicationsData?.data?.data || [];
    const totalPage = applicationsData?.data?.meta?.totalPage;




    const handleStatusUpdate = async (
        action: Promise<any>,
        successMessage: string
    ) => {
        try {
            await action;
            toast.success(successMessage);
            refetch();
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Action failed. Please try again."
            );
            console.error("Agent application action failed:", error);
        }
    };

    if (isLoading) {
        return <SkeletonTable />;
    }

    if (!applications.length) {
        return (
            <div className="p-4 flex justify-center">
                <Card className="w-full max-w-2xl text-center p-8 mt-4">
                    <CardHeader>
                        <div className="flex flex-col items-center gap-4">
                            <UserX className="w-16 h-16 text-muted-foreground" />
                            <CardTitle>No Pending Applications</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        There are no new agent applications to display at this time.
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        Agent Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Applied At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.map((app) => (
                                    <TableRow key={app._id}>
                                        <TableCell className="font-medium">{app.name}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {app.phone}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={app.approvalStatus} />
                                        </TableCell>
                                        <TableCell className="text-right text-sm text-muted-foreground">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                                                    disabled={isActionLoading}
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            approveApplication(app._id).unwrap(),
                                                            "Application approved successfully."
                                                        )
                                                    }
                                                >
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={isActionLoading}
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            rejectApplication(app._id).unwrap(),
                                                            "Application has been rejected."
                                                        )
                                                    }
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {
                        totalPage !== 1 && (
                            <Pagination className="mt-6">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(1, prev - 1))
                                            }
                                            className={
                                                currentPage === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                    {Array.from({ length: totalPage }, (_, idx) => idx + 1).map(
                                        (pageNumber) => (
                                            <PaginationItem
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className="cursor-pointer"
                                            >
                                                <PaginationLink isActive={currentPage === pageNumber}>
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(totalPage, prev + 1))
                                            }
                                            className={
                                                currentPage === totalPage
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )
                    }
                </CardContent>
            </Card>
        </div>
    );
}