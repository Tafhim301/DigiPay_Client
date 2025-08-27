import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {


    RefreshCcw,
    Send,
    SquareArrowDownLeft,


} from "lucide-react";
import { useOwnTransactionQuery } from "@/redux/feature/transaction/transaction.api";
import SkeletonTable from "./Skeletons/TableSkeletons";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IUserRef {
    _id: string;
    name: string;
}

interface ITransaction {
    _id: string;
    sender: IUserRef | null;
    receiver: IUserRef | null;
    amount: number;
    transactionType: "SEND_MONEY" | "CASH_IN" | "CASH_OUT" | "TOP_UP" | "WITHDRAW" | "ADMIN_CASH_IN";
    status: "SUCCESSFUL" | "FAILED" | "PENDING" | "DISMISSED";
    createdAt: string;
    failure_reason?: string;
}



const getTransactionIcon = (type: ITransaction['transactionType']) => {

    switch (type) {
        case "SEND_MONEY":
        case "CASH_OUT":
        case "WITHDRAW":
            return <Send className={"h-5 w-5 text-red-500"} />;
        case "CASH_IN":
        case "TOP_UP":
        case "ADMIN_CASH_IN":
            return <SquareArrowDownLeft className="h-6 w-6 text-green-500" />;
        default:
            return <RefreshCcw className="h-5 w-5 text-gray-500" />;
    }
};

export default function TransactionTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setlimit] = useState(10)
    const location = useLocation();
    const [sortBy, setSortBy] = useState("-createdAt");
    const [transactionType, setTransactionType] = useState("all")
    const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined)
    const currentUserId = userData?.data?._id
    const { data, isLoading } = useOwnTransactionQuery({
        page: currentPage,
        limit,
        ...(transactionType !== 'all' ? { transactionType } : {}),

        sort: sortBy
    });
    const transactions: ITransaction[] = data?.data?.data || [];
    const { totalPage } = data?.data?.meta || 1
    useEffect(() => {
        if (location.pathname === "/user/wallet") {

            setlimit(5)
        }

        else if (location.pathname === "/agent/overview") {
            setlimit(5)

        }

    }, [location.pathname, limit])




    if (isLoading || userLoading) {
        return <SkeletonTable />;
    }



    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <Select value={transactionType} onValueChange={(val) => setTransactionType(val)}>
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Transactions</SelectItem>
                            <SelectItem value="CASH_IN">Cash In</SelectItem>
                            <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                            <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                            <SelectItem value="WITHDRAW">Withdraw Money</SelectItem>
                            <SelectItem value="TOP_UP">Top Up</SelectItem>
                            {userData?.data?.isAgent && <SelectItem value="ADMIN_CASH_IN">Admin Cash In</SelectItem>}
                        </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-createdAt">Newest</SelectItem>
                            <SelectItem value="createdAt">Oldest</SelectItem>
                            <SelectItem value="amount">Amount Asc</SelectItem>
                            <SelectItem value="-amount">Amount Desc</SelectItem>
                            <SelectItem value="transactionType">Type A-Z</SelectItem>
                            <SelectItem value="-transactionType">Type Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Party</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => {
                                const isSender = tx.sender && tx.sender._id === currentUserId;
                                const partyName = isSender ? (tx.receiver ? tx.receiver.name : "N/A") : (tx.sender ? tx.sender.name : "Admin");
                                const amountColor = tx.transactionType === "TOP_UP" ? "text-green-500" : isSender ? "text-red-500" : "text-green-500";
                                const amountSign = tx.transactionType === 'TOP_UP' ? "+" : isSender ? "-" : "+";
                                const failureReason = tx.failure_reason ? ` (${tx.failure_reason})` : '';

                                return (
                                    <TableRow key={tx._id}>

                                        <TableCell className="font-semibold flex items-center gap-2">
                                            {getTransactionIcon(tx.transactionType)}
                                            <div className="flex flex-col">
                                                <span>{tx.transactionType.replace(/_/g, " ")}</span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(tx.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </TableCell>


                                        <TableCell className="font-semibold text-md">
                                            {isSender ? "To" : "From"}: {partyName}
                                        </TableCell>


                                        <TableCell className={`font-bold text-right ${amountColor}`}>
                                            <Badge variant={"outline"} className={`w-18 p-2  text-md font-bold  text-right ${amountColor}`}> {amountSign}{tx.amount.toFixed(2)} ৳</Badge>
                                        </TableCell>


                                        <TableCell className="text-right">
                                            <Badge
                                                className="p-2 font-bold bg-blue-700"

                                                variant={
                                                    tx.status === "SUCCESSFUL" ? "default" : "destructive"
                                                }
                                            >
                                                {tx.status}
                                            </Badge>
                                            {tx.status === "FAILED" && (
                                                <div className="text-xs text-red-500 mt-1">
                                                    {failureReason || "N/A"}
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
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
        </div >
    );
}