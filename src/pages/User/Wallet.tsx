import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { Hand, WalletCards } from "lucide-react";
import TransactionHistory from "./Features/TransactionHistory";

export default function Wallet() {
    const { data } = useUserInfoQuery(undefined);
    const user = data?.data;
    const wallet = data?.data?.wallet;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center mb-2 gap-2">
                    <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                        Hey {user?.name || "User"}!
                    </h1>
                  
                    <Hand 
                        size={32} 
                        className="text-yellow-700 origin-[70%_70%] waving-hand" 
                    />
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Welcome to your financial hub. Here you can view your balance and manage all your transactions.
                </p>
            </div>

   
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <WalletCards size={42} className="text-primary" />
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                            Current Balance
                        </h3>
                        <div className="flex items-end">
                            <span className="text-3xl font-bold text-primary mr-1">
                                {wallet?.balance?.toLocaleString() || "0.00"}
                            </span>
                            <span className="text-2xl font-semibold text-primary">৳</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
     
                    <TransactionHistory></TransactionHistory>
                
            </div>
        </div>
    );
}