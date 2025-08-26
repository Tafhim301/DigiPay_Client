import { Link } from "react-router"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
    ArrowDown,
    ArrowUp,
    Banknote,
    LineChart as LineChartIcon,
    ArrowUpCircle,
    ArrowDownCircle,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { useGetWalletSummaryQuery } from "@/redux/feature/wallet/wallet.api";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";


import TransactionTable from "@/pages/User/Features/TransactionHistory";


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 items-center gap-x-2">
                    <span className="text-[0.70rem] col-span-2 uppercase text-muted-foreground pb-1 border-b mb-1">
                        {label}
                    </span>
                    {payload.map((p, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-[0.70rem] uppercase" style={{ color: p.color }}>
                                {p.name}
                            </span>
                            <span className="font-bold" style={{ color: p.color }}>
                                ${p.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default function AgentOverview() {
    const { data: summaryData, isLoading: isSummaryLoading } = useGetWalletSummaryQuery(undefined);
    const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);


    const summary = summaryData?.data?.summary || {};
    const trends = summaryData?.data?.trends || [];
    const agentName = userData?.data?.name || "Agent";
    const balance = userData?.data?.wallet?.balance ?? 0;
    const cashInTotal = summary.cashInTotal ?? 0;
    const cashOutTotal = (summary.cashOutTotal ?? 0) + (summary.withdrawTotal ?? 0);
    const adminCashInTotal = summary.adminCashInTotal ?? 0;
    console.log(summaryData)

    if (isSummaryLoading || isUserLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 space-y-8">
                <Skeleton className="h-8 w-1/3 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <Skeleton className="h-5 w-2/5" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-3/5 mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <Skeleton className="col-span-1 lg:col-span-3 h-[400px] rounded-xl" />
                    <Skeleton className="col-span-1 lg:col-span-2 h-[250px] rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <main className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="space-y-8">

                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, {agentName}!</h1>
                    <p className="text-muted-foreground">Here is your financial overview for today, {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                    <Card className="transition-all duration-300 border-border/40 hover:border-border/80">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                                <Banknote className="h-5 w-5 text-indigo-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl lg:text-3xl font-bold text-foreground">BDT {balance.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Your current available balance</p>
                        </CardContent>
                    </Card>

                    <Card className="transition-all duration-300 border-border/40 hover:border-border/80">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Admin Cash In</CardTitle>
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
                                <ArrowUpCircle className="h-5 w-5 text-blue-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl lg:text-3xl font-bold text-foreground">BDT {adminCashInTotal.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total money added by admin</p>
                        </CardContent>
                    </Card>


                    <Card className="transition-all duration-300 border-border/40 hover:border-border/80">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cash In</CardTitle>
                            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/50">
                                <ArrowUp className="h-5 w-5 text-rose-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl lg:text-3xl font-bold text-foreground">BDT {cashInTotal.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total amount sent to users</p>
                        </CardContent>
                    </Card>


                    <Card className="transition-all duration-300 border-border/40 hover:border-border/80">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cash Out</CardTitle>
                            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                <ArrowDown className="h-5 w-5 text-emerald-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl lg:text-3xl font-bold text-foreground">BDT {cashOutTotal.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total amount received from users</p>
                        </CardContent>
                    </Card>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <Card className="col-span-1 lg:col-span-3">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LineChartIcon className="h-5 w-5 text-primary" />
                                Transaction Trends
                            </CardTitle>
                            <CardDescription>Quick overview of your wallet</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px] p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <defs>

                                        <linearGradient id="cashInGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="adminCashInGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>

                                        <linearGradient id="cashOutGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted-foreground/20" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="Cash In" stroke="#f43f5e" fill="url(#cashInGradient)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="Cash Out" stroke="#10b981" fill="url(#cashOutGradient)" strokeWidth={2} />
                                    <Area
                                        type="monotone"
                                        dataKey="Admin Cash In"
                                        stroke="#3b82f6"
                                        fill="url(#adminCashInGradient)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Facilitate user transactions.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            <Link to="/agent/cash-in">
                                <Button size="lg" className="w-full justify-start gap-3">
                                    <ArrowUpCircle className="h-4 w-4" />
                                    <span>Cash In</span>
                                </Button>
                            </Link>
                            <Link to="/agent/cash-out">
                                <Button size="lg" variant="secondary" className="w-full justify-start gap-3">
                                    <ArrowDownCircle className="h-4 w-4" />
                                    <span>Cash Out</span>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>


                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">

                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Latest wallet activities</CardDescription>


                    </CardHeader>
                    <CardContent className=" p-0  w-full">
                        <TransactionTable />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}