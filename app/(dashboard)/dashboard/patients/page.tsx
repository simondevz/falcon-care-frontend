"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import { usePatients, useDeletePatient } from "@/hooks/api-hooks";
import { useUIStore } from "@/stores/ui-store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { format } from "date-fns";
import Link from "next/link";

export default function PatientsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { setCreatePatientModalOpen } = useUIStore();

  const { data, isLoading, error } = usePatients({
    page,
    per_page: 10,
    search: search || undefined,
  });

  const deletePatient = useDeletePatient();

  const handleDelete = async (patientId: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      await deletePatient.mutateAsync(patientId);
    }
  };

  const getInsuranceStatus = (provider: string | null) => {
    if (!provider)
      return { label: "Uninsured", variant: "destructive" as const };

    const statusMap: Record<
      string,
      {
        label: string;
        variant: "default" | "secondary" | "destructive" | "outline";
      }
    > = {
      DAMAN: { label: "DAMAN", variant: "default" },
      ADNIC: { label: "ADNIC", variant: "secondary" },
      THIQA: { label: "THIQA", variant: "outline" },
      BUPA: { label: "BUPA", variant: "default" },
    };

    return (
      statusMap[provider.toUpperCase()] || {
        label: provider,
        variant: "outline" as const,
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-destructive">
            Error loading patients. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  const patients = data?.patients || [];
  const totalPatients = data?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Manage your patient database and medical records
          </p>
        </div>
        <Button onClick={() => setCreatePatientModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Total Patients</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">Active in system</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Recent Encounters</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Scheduled</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>MRN</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient: any) => {
                const insurance = getInsuranceStatus(
                  patient.insurance_provider
                );

                return (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {patient.mrn}
                      </code>
                    </TableCell>
                    <TableCell>
                      {patient.date_of_birth
                        ? format(
                            new Date(patient.date_of_birth),
                            "MMM dd, yyyy"
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={insurance.variant}>
                        {insurance.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {patient.updated_at
                          ? format(new Date(patient.updated_at), "MMM dd, yyyy")
                          : "Never"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/patients/${patient.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/patients/${patient.id}/edit`}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Patient
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/patients/${patient.id}/encounters`}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View Encounters
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(patient.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Patient
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {patients.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No patients found</h3>
              <p className="text-muted-foreground mb-4">
                {search
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first patient"}
              </p>
              <Button onClick={() => setCreatePatientModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, totalPatients)} of {totalPatients} patients
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= data.total_pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
