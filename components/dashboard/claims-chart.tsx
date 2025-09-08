import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data for the chart - in a real app, this would come from your API
const claimsData = [
  { name: "Jan", submitted: 45, approved: 38, denied: 7 },
  { name: "Feb", submitted: 52, approved: 44, denied: 8 },
  { name: "Mar", submitted: 48, approved: 42, denied: 6 },
  { name: "Apr", submitted: 61, approved: 54, denied: 7 },
  { name: "May", submitted: 55, approved: 49, denied: 6 },
  { name: "Jun", submitted: 67, approved: 61, denied: 6 },
];

export function ClaimsChart() {
  // Calculate totals and trends
  const currentMonth = claimsData[claimsData.length - 1];
  const previousMonth = claimsData[claimsData.length - 2];

  const approvalRate = Math.round(
    (currentMonth.approved / currentMonth.submitted) * 100
  );
  const previousApprovalRate = Math.round(
    (previousMonth.approved / previousMonth.submitted) * 100
  );
  const approvalTrend = approvalRate - previousApprovalRate;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Claims Overview
            </CardTitle>
            <CardDescription>
              Monthly claims submission and approval trends
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {approvalTrend >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(approvalTrend)}% vs last month
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {currentMonth.submitted}
            </div>
            <div className="text-sm text-muted-foreground">Submitted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {currentMonth.approved}
            </div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {currentMonth.denied}
            </div>
            <div className="text-sm text-muted-foreground">Denied</div>
          </div>
        </div>

        {/* Simple bar chart representation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Approval Rate</span>
            <span className="text-green-600 font-semibold">
              {approvalRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${approvalRate}%` }}
            />
          </div>
        </div>

        {/* Monthly breakdown */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Last 6 Months</h4>
          <div className="space-y-2">
            {claimsData.slice(-6).map((month, index) => {
              const monthApprovalRate = Math.round(
                (month.approved / month.submitted) * 100
              );
              return (
                <div
                  key={month.name}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm text-muted-foreground">
                    {month.name}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-blue-600">
                      {month.submitted} submitted
                    </span>
                    <span className="text-xs text-green-600">
                      {month.approved} approved
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {monthApprovalRate}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
