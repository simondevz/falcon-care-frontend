/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Brain,
  Activity,
} from "lucide-react";
import { usePatients, useClaims, useEncounters } from "@/hooks/api-hooks";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ClaimsChart } from "@/components/dashboard/claims-chart";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  const { data: patientsData, isLoading: patientsLoading } = usePatients({
    per_page: 1,
  });
  const { data: claimsData, isLoading: claimsLoading } = useClaims({
    per_page: 1,
  });
  const { data: encountersData, isLoading: encountersLoading } = useEncounters({
    per_page: 1,
  });

  const isLoading = patientsLoading || claimsLoading || encountersLoading;

  const stats: {
    title: string;
    value: any;
    change: string;
    trend: "up" | "down";
    icon: typeof Users;
    description: string;
  }[] = [
    {
      title: "Total Patients",
      value: patientsData?.total || 0,
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Active patients in system",
    },
    {
      title: "Pending Claims",
      value: 23,
      change: "-8%",
      trend: "down",
      icon: CreditCard,
      description: "Claims awaiting processing",
    },
    {
      title: "Monthly Revenue",
      value: "AED 125,430",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
      description: "Revenue this month",
    },
    {
      title: "AI Efficiency",
      value: "94%",
      change: "+5%",
      trend: "up",
      icon: Brain,
      description: "Automated processing rate",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your RCM operations.
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims overview chart */}
        <div className="lg:col-span-2">
          <ClaimsChart />
        </div>

        {/* Recent activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Additional cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Processing Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span>AI Processing Status</span>
            </CardTitle>
            <CardDescription>
              Current AI agent performance and queue status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Structuring</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            <Progress value={94} className="w-full" />
            <p className="text-xs text-muted-foreground">94% accuracy rate</p>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Medical Coding</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            <Progress value={91} className="w-full" />
            <p className="text-xs text-muted-foreground">91% accuracy rate</p>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Eligibility Verification
              </span>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                <Clock className="h-3 w-3 mr-1" />
                Processing
              </Badge>
            </div>
            <Progress value={87} className="w-full" />
            <p className="text-xs text-muted-foreground">3 requests in queue</p>
          </CardContent>
        </Card>

        {/* Payer Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Payer Performance</span>
            </CardTitle>
            <CardDescription>
              Approval rates and processing times by payer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">DAMAN</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">94%</div>
                  <div className="text-xs text-muted-foreground">
                    3.2 days avg
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium">ADNIC</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">89%</div>
                  <div className="text-xs text-muted-foreground">
                    4.1 days avg
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-medium">THIQA</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">87%</div>
                  <div className="text-xs text-muted-foreground">
                    5.8 days avg
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-purple-500 rounded-full" />
                  <span className="text-sm font-medium">BUPA</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">82%</div>
                  <div className="text-xs text-muted-foreground">
                    6.2 days avg
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  3 claims require manual review
                </p>
                <p className="text-xs text-yellow-700">
                  Low confidence scores detected for medical coding
                </p>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">
                  AI training update completed
                </p>
                <p className="text-xs text-blue-700">
                  Medical coding accuracy improved by 2.3%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
