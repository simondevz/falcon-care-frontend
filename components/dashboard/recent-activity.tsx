import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  Users,
  ArrowRight,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

const recentActivities = [
  {
    id: 1,
    type: "claim_submitted",
    title: "Claim Submitted",
    description: "Claim CLM12345678 submitted to DAMAN",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    status: "success",
    icon: CreditCard,
  },
  {
    id: 2,
    type: "encounter_processed",
    title: "AI Processing Complete",
    description: "Encounter for Sarah Al-Zahra processed with 94% confidence",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: "success",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "patient_added",
    title: "New Patient Added",
    description: "Ahmed Mohammed registered in system",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "info",
    icon: Users,
  },
  {
    id: 4,
    type: "claim_denied",
    title: "Claim Denied",
    description: "Claim CLM12345670 denied by ADNIC - Prior auth required",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "warning",
    icon: AlertCircle,
  },
  {
    id: 5,
    type: "encounter_created",
    title: "New Encounter",
    description: "Outpatient visit created for Fatima Hassan",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: "info",
    icon: FileText,
  },
];

export function RecentActivity() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-full ${getStatusColor(activity.status)}`}
            >
              <activity.icon className="h-3 w-3" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </div>
        ))}

        {recentActivities.length === 0 && (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
