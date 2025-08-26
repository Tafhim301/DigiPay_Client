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
import { useGetAllUsersQuery } from "@/redux/feature/agent/agent.api";
import { useBlockUserMutation } from "@/redux/feature/user/user.api";
import {
  Users,
  Phone,
  ShieldCheck,
  Wallet,
  CalendarDays,
  Lock,
  ClipboardList,
  UserX,
  Unlock,
  Settings,
} from "lucide-react";
import { toast } from "sonner";


interface IUser {
  _id: string;
  name: string;
  phone: string;
  role: string;
  wallet: {
    _id: string;
    balance: number;
    isBlocked: boolean;
  };
  createdAt: string;
}

export default function ManageUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const location = useLocation();

  const { data, isLoading, refetch } = useGetAllUsersQuery({
    page: currentPage,
    limit,
  });
  const [blockUser, { isLoading: isBlockLoading }] = useBlockUserMutation();

  const users: IUser[] = data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;

  useEffect(() => {
    if (location.pathname === "/admin/overview") {
      setLimit(10);
    }
  }, [location.pathname]);

  const handleBlockToggle = async (walletId: string, isBlocked: boolean) => {
    try {
      await blockUser(walletId).unwrap();
      toast.success(`User wallet has been ${isBlocked ? 'unblocked' : 'blocked'}.`);
      refetch();
    } catch (error) {
      toast.error("Failed to update user status. Please try again.");
      console.error("Failed to block/unblock user:", error);
    }
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  if (users.length === 0) {
    return (
      <div className="p-4 flex justify-center">
        <Card className="w-full max-w-2xl text-center p-8">
          <CardHeader>
            <div className="flex flex-col items-center gap-4">
              <UserX className="w-16 h-16 text-muted-foreground" />
              <CardTitle>No Users Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            No users are available for review at this time.
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
            Users Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Role
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Wallet className="h-4 w-4" />
                      Wallet Balance
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Joined At
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Settings className="h-4 w-4" />
                      Actions
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.phone}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <Badge
                        variant={
                          user.wallet.isBlocked ? "destructive" : "default"
                        }
                        className="min-w-[100px] justify-center"
                      >
                        {`${user.wallet.balance.toFixed(2)} ৳`}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {user.wallet.isBlocked ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isBlockLoading}
                          onClick={() =>
                            handleBlockToggle(user.wallet._id, user.wallet.isBlocked)
                          }
                          className="w-28"
                        >
                          <Unlock className="mr-2 h-4 w-4" />
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isBlockLoading}
                          onClick={() =>
                            handleBlockToggle(user.wallet._id, user.wallet.isBlocked)
                          }
                          className="w-28"
                        >
                          <Lock className="mr-2 h-4 w-4" />
                          Block
                        </Button>
                      )}
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