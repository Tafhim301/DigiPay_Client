/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Users,
  Wallet,
  Activity,
  UserCheck,
  UserX,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  LogIn,
  LogOut,
  Send,
} from "lucide-react";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminDashboardSkeleton from "@/components/Skeletons/AdminDashboardSkeleton";
import {
  useTransactionStatsQuery,
  useUserStatsQuery,
} from "@/redux/feature/stats/stats.auth";



interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description?: string;
  iconBgColor?: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};



const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconBgColor,
}: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`rounded-lg p-2 ${iconBgColor || "bg-gray-100"}`}>
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Amount
            </span>
            <span className="font-bold">
              {formatCurrency(payload[0].value)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const transactionTypeDetails: {
  [key: string]: { icon: React.ElementType; name: string };
} = {
  TOP_UP: { icon: ArrowUpCircle, name: "Top Up" },
  CASH_IN: { icon: LogIn, name: "Cash In" },
  CASH_OUT: { icon: LogOut, name: "Cash Out" },
  SEND_MONEY: { icon: Send, name: "Send Money" },
  WITHDRAW: { icon: ArrowDownCircle, name: "Withdraw" },
};


export default function AdminDashboard() {
  const { data: userData, isLoading: isUserLoading } =
    useUserStatsQuery(undefined);
  const { data: transactionData, isLoading: isTransactionLoading } =
    useTransactionStatsQuery(undefined);

  const stats = transactionData?.data;
  const userStats = userData?.data;

  const dailyChartData = useMemo(() => {
    if (!stats?.dailyTransactions) return [];
    return stats.dailyTransactions
      .map((d: any) => ({
        name: new Date(d._id).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        Amount: d.totalAmount,
      }))
      .slice(-7);
  }, [stats]);

  const userRoleData = useMemo(() => {
    if (!userStats?.userByRole) return [];
    return userStats.userByRole.map((r: any) => ({
      name: r.role.charAt(0) + r.role.slice(1).toLowerCase(),
      value: r.count,
    }));
  }, [userStats]);

  const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (isUserLoading || isTransactionLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (!stats || !userStats) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back, Admin!
          </h2>
          <p className="text-muted-foreground">{today}</p>
        </div>
      </div>

      
      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Transacted Amount"
          value={formatCurrency(stats.totalTransactedAmount)}
          icon={Wallet}
          description={`${stats.totalTransactionLast30Days.totalTransactions.toLocaleString()} transactions in 30 days`}
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Total Users"
          value={userStats.totalUsers.toLocaleString()}
          icon={Users}
          description={`+${userStats.newUserInLast7Days} this week / +${userStats.newUserInLast30Days} this month`}
          iconBgColor="bg-sky-100"
        />
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          icon={Activity}
          description={`${stats.failedTransactions} failed transactions`}
          iconBgColor="bg-amber-100"
        />
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-sm font-medium">User Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-green-600">
                <UserCheck className="w-4 h-4 mr-2" /> Active
              </span>
              <span className="font-bold">
                {userStats.totalActiveUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-amber-600">
                <UserX className="w-4 h-4 mr-2" /> Inactive
              </span>
              <span className="font-bold">
                {userStats.totalInActiveUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-red-600">
                <Trash2 className="w-4 h-4 mr-2" /> Deleted
              </span>
              <span className="font-bold">
                {userStats.totalDeletedUsers.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

     
      <div className="grid gap-4  lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Daily Transaction Volume</CardTitle>
            <CardDescription>
              Total in last 7 days:{" "}
              <span className="font-bold text-primary">
                {formatCurrency(stats.totalTransactionLast7Days.totalAmount)}
              </span>{" "}
              across{" "}
              {stats.totalTransactionLast7Days.totalTransactions.toLocaleString()}{" "}
              transactions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dailyChartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="80%" stopColor="#21abcd" stopOpacity={1} />
                
               
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="Amount"
                  fill="url(#colorAmount)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>User Distribution by Role</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userRoleData.map((_entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      stroke={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Users`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-3xl font-bold">{userStats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Breakdown</CardTitle>
            <CardDescription>
              Breakdown of all transaction types by volume and count.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...stats.transactionTypeBreakdown]
              .sort((a, b) => b.totalAmount - a.totalAmount)
              .map((item: any) => {
                const details = transactionTypeDetails[item._id] || {
                  icon: Activity,
                  name: item._id,
                };
                const Icon = details.icon;
                return (
                  <div key={item._id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium flex items-center">
                        <Icon className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                        {details.name}
                      </span>
                      <span className="font-bold">
                        {formatCurrency(item.totalAmount)}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({item.totalTransactions} txns)
                        </span>
                      </span>
                    </div>
                    <Progress
                      value={
                        (item.totalAmount / stats.totalTransactedAmount) * 100
                      }
                    />
                  </div>
                );
              })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Active Users</CardTitle>
            <CardDescription>
              Top users by total number of transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Transactions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.mostActiveUsers.slice(0, 5).map((user: any) => (
                  <TableRow key={user.userId}>
                    <TableCell className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="font-mono text-sm" variant="secondary">
                        {user.totalTransactions}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}