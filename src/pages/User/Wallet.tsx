import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { Hand, WalletCards, ArrowDownUp, CreditCard, Banknote } from "lucide-react";
import TransactionHistory from "./Features/TransactionHistory";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Wallet() {

    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data;
    const wallet = user?.wallet;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading wallet data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-4 md:p-8">

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div>
                        <div className="flex gap-2 items-center">
                            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 md:text-4xl">
                                Hey {user?.name || "User"}!
                            </h1>
                            <Hand
                                size={32}
                                className="text-yellow-700 waving-hand"
                            />
                        </div>
                        <div>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Welcome to your financial hub. Here you can view your balance and manage all your transactions.  </p>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <CreditCard size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Banknote size={20} />
                    </Button>
                </div>
            </div >


            <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-gray-200 dark:border-gray-700">
                <CardHeader className="p-6">
                    <div className="flex items-center space-x-4">
                        <WalletCards size={42} className="text-primary" />
                        <div>
                            <CardTitle className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
                                Current Balance
                            </CardTitle>
                            <div className="flex items-end mt-1">
                                <span className="text-3xl font-bold text-primary mr-1">
                                    {wallet?.balance?.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }) || "0.00"}
                                </span>
                                <span className="text-2xl font-semibold text-primary">৳</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <Card className="lg:col-span-1 p-6 mt-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <CardHeader className="p-0">
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <div className="flex flex-col space-y-4">
                        <Link to={'/user/sendMoney'}> <Button variant={"outline"} className="w-full justify-start text-lg h-12">

                            <ArrowDownUp className="mr-2 h-5 w-5" /> Send Money
                        </Button></Link>
                        <Link to={'/user/addMoney'}> <Button variant={"outline"} className="w-full justify-start text-lg h-12" >
                            <CreditCard className="mr-2 h-5 w-5" /> Top-Up
                        </Button></Link>
                        <Link to={'/user/withdrawMoney'}>
                            <Button className="w-full  justify-start text-lg h-12" variant={"outline"}>
                                <Banknote className="mr-2 h-5 w-5" /> Withdraw
                            </Button>
                        </Link>
                    </div>
                </Card>


                <div className="lg:col-span-2">

                    <TransactionHistory />
                </div>
            </div>
        </div >
    );
}