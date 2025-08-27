import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    RefreshCcw,
    Send,
    SquareArrowDownLeft,
    Wallet,
} from "lucide-react";
import SkeletonTable from "@/components/Skeletons/TableSkeletons";
import { useGetAlltransactionsQuery } from "@/redux/feature/transaction/transaction.api";

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
            return <Send className="h-5 w-5 text-red-500" />;
        case "CASH_IN":
        case "TOP_UP":
        case "ADMIN_CASH_IN":
            return <SquareArrowDownLeft className="h-6 w-6 text-green-500" />;
        default:
            return <RefreshCcw className="h-5 w-5 text-gray-500" />;
    }
};

export default function AllTransactionTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("-createdAt");
    const [transactionType, setTransactionType] = useState("all")
    const limit = 10;

    const { data, isLoading, isError } = useGetAlltransactionsQuery({
        page: currentPage,
        limit,
        ...(transactionType !== 'all' ? { transactionType } : {}),

        sort: sortBy
    });




    const transactions: ITransaction[] = data?.data?.data || [];
    const totalPage = data?.data?.meta?.totalPage || 1;

    if (isLoading) return <SkeletonTable />;
    if (isError) return <div className="text-center p-4">Failed to load transactions.</div>;
    if (!transactions.length)
        return (
            <div className="p-4 flex justify-center">
                <Card className="w-full max-w-2xl text-center p-8 mt-4 shadow-lg rounded-lg">
                    <CardHeader className="flex flex-col items-center gap-4">
                        <Wallet className="w-16 h-16 text-muted-foreground" />
                        <CardTitle>No Transactions Found</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        Sorry, it seems no transactions have occurred.
                    </CardContent>
                </Card>
            </div>
        );

    return (
        <div className="p-4">
            <Card className="shadow-lg rounded-lg">
                <CardHeader className="flex flex-col gap-4">
                    <CardTitle>All Transactions</CardTitle>


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
                            <SelectItem value="ADMIN_CASH_IN">Admin Cash In</SelectItem>
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
                    <Table className="rounded-lg overflow-hidden">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Sender</TableHead>
                                <TableHead>Receiver</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx._id} className="hover:bg-muted-foreground">
                                    <TableCell className="flex items-center gap-2">
                                        {getTransactionIcon(tx.transactionType)}
                                        {tx.transactionType.replace(/_/g, " ")}
                                    </TableCell>
                                    <TableCell>{tx.sender?.name || "Admin"}</TableCell>
                                    <TableCell>{tx.receiver?.name || "Admin"}</TableCell>
                                    <TableCell className="text-right font-bold text-green-600">
                                        {tx.amount.toFixed(2)} ৳
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={tx.status === "SUCCESSFUL" ? "default" : "destructive"}>
                                            {tx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Pagination className="mt-5  justify-center flex">
                        <PaginationPrevious
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                        {Array.from({ length: totalPage }, (_, idx) => idx + 1).map((page) => (
                            <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                                <PaginationLink className="mx-2" isActive={currentPage === page}> {page} </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationNext
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))}
                            className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </Pagination>
                </CardContent>
            </Card>
        </div>
    );
}
