/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
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
import {

  ClipboardList,
  UserX,

  Ban,
  CheckCircle2,


} from "lucide-react";
import { toast } from "sonner";
import {
  useApproveAgentMutation,
  useGetAllAgentsQuery,
  useSuspendAgentMutation,

} from "@/redux/feature/user/user.api";

interface IUser {
  _id: string;
  name: string;
  phone: string;
  role: string;
  approvalStatus: "UNAPPLIED" | "SUSPENDED" | "APPROVED" | "PENDING";
  wallet: {
    _id: string;
    balance: number;
    isBlocked: boolean;
  };
  createdAt: string;
}


const StatusBadge = ({ status }: { status: IUser["approvalStatus"] }) => {
  const getBadgeClass = () => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-300";
      case "SUSPENDED":
        return "bg-red-100 text-red-800 border-red-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  return <Badge className={getBadgeClass()}>{status}</Badge>;
};

export default function ManageAgent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const location = useLocation();

  const { data, isLoading, refetch } = useGetAllAgentsQuery({
    page: currentPage,
    limit,
  });

  const [suspendAgent, { isLoading: isSuspending }] = useSuspendAgentMutation();
  const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();


  const isActionLoading = isSuspending || isApproving;

  const agents: IUser[] = data?.data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;

  useEffect(() => {
    if (location.pathname === "/admin/overview") {
      setLimit(10);
    }
  }, [location.pathname]);

  const handleStatusUpdate = async (
    action: Promise<any>,
    successMessage: string
  ) => {
    try {
      await action;
      toast.success(successMessage);
      refetch();
    } catch (error) {
      toast.error("Action failed. Please try again.");
      console.error("Agent status update failed:", error);
    }
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  if (!agents.length) {
    return (
      <div className="p-4 flex justify-center">
        <Card className="w-full max-w-2xl text-center p-8">
          <CardHeader>
            <div className="flex flex-col items-center gap-4">
              <UserX className="w-16 h-16 text-muted-foreground" />
              <CardTitle>No Agents Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            There are no agents to display at this time.
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
            <ClipboardList className="h-6 w-6" />
            Manage Agents
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
                  <TableHead className="text-right">Wallet Balance</TableHead>
                  <TableHead className="text-right">Joined At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent._id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {agent.phone}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={agent.approvalStatus} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <Badge className="w-20">{`${agent.wallet.balance.toFixed(2)} ৳`}</Badge>

                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(agent.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">

                        {agent.approvalStatus === "APPROVED" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isActionLoading}
                            onClick={() => handleStatusUpdate(suspendAgent(agent._id).unwrap(), "Agent has been suspended.")}
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </Button>
                        )}
                        {agent.approvalStatus === "SUSPENDED" && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isActionLoading}
                            onClick={() => handleStatusUpdate(approveAgent(agent._id).unwrap(), "Agent has been unsuspended.")}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Unsuspend
                          </Button>
                        )}
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