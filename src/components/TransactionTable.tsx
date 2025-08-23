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

export default function TransactionTable() {
    const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined)
    const currentUserId = userData?.data?._id
    const { data, isLoading } = useOwnTransactionQuery(undefined);
    const transactions: ITransaction[] = data?.data?.data || [];

    if (isLoading || userLoading) {
        return <SkeletonTable />;
    }

    if (transactions.length === 0) {
        return (
            <div className="p-4 flex justify-center">
                <Card className="w-full max-w-2xl text-center p-8">
                    <CardHeader>
                        <CardTitle>No Transactions Found</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-500">
                        It looks like you haven't made any transactions yet.
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your recent transactions.</TableCaption>
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
                                            className="p-2 font-bold"

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
                </CardContent>
            </Card>
        </div>
    );
}