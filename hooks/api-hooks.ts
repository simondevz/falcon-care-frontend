import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useNotifications } from "@/stores/ui-store";

// Query keys
export const queryKeys = {
  patients: ["patients"] as const,
  patient: (id: string) => ["patients", id] as const,
  patientEncounters: (id: string) => ["patients", id, "encounters"] as const,
  encounters: ["encounters"] as const,
  encounter: (id: string) => ["encounters", id] as const,
  claims: ["claims"] as const,
  claim: (id: string) => ["claims", id] as const,
  claimDenials: (id: string) => ["claims", id, "denials"] as const,
  agentStatus: ["agent", "status"] as const,
  chatSession: (id: string) => ["chat", "sessions", id] as const,
};

// Patient hooks
export function usePatients(params?: {
  page?: number;
  per_page?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [...queryKeys.patients, params],
    queryFn: () => apiClient.getPatients(params),
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: queryKeys.patient(id),
    queryFn: () => apiClient.getPatient(id),
    enabled: !!id,
  });
}

export function usePatientEncounters(id: string) {
  return useQuery({
    queryKey: queryKeys.patientEncounters(id),
    queryFn: () => apiClient.getPatientEncounters(id),
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (data: any) => apiClient.createPatient(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients });
      success("Patient Created", "Patient has been successfully created.");
    },
    onError: (err: any) => {
      error(
        "Creation Failed",
        err.response?.data?.detail || "Failed to create patient."
      );
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.updatePatient(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients });
      queryClient.invalidateQueries({
        queryKey: queryKeys.patient(variables.id),
      });
      success(
        "Patient Updated",
        "Patient information has been successfully updated."
      );
    },
    onError: (err: any) => {
      error(
        "Update Failed",
        err.response?.data?.detail || "Failed to update patient."
      );
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (id: string) => apiClient.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients });
      success("Patient Deleted", "Patient has been successfully deleted.");
    },
    onError: (err: any) => {
      error(
        "Deletion Failed",
        err.response?.data?.detail || "Failed to delete patient."
      );
    },
  });
}

// Encounter hooks
export function useEncounters(params?: {
  patient_id?: string;
  status?: string;
  page?: number;
  per_page?: number;
}) {
  return useQuery({
    queryKey: [...queryKeys.encounters, params],
    queryFn: () => apiClient.getEncounters(params),
  });
}

export function useEncounter(id: string) {
  return useQuery({
    queryKey: queryKeys.encounter(id),
    queryFn: () => apiClient.getEncounter(id),
    enabled: !!id,
  });
}

export function useCreateEncounter() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (data: any) => apiClient.createEncounter(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.encounters });
      if (data.patient_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.patientEncounters(data.patient_id),
        });
      }
      success("Encounter Created", "Encounter has been successfully created.");
    },
    onError: (err: any) => {
      error(
        "Creation Failed",
        err.response?.data?.detail || "Failed to create encounter."
      );
    },
  });
}

export function useUpdateEncounter() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.updateEncounter(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.encounters });
      queryClient.invalidateQueries({
        queryKey: queryKeys.encounter(variables.id),
      });
      success("Encounter Updated", "Encounter has been successfully updated.");
    },
    onError: (err: any) => {
      error(
        "Update Failed",
        err.response?.data?.detail || "Failed to update encounter."
      );
    },
  });
}

export function useProcessEncounter() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: ({
      id,
      forceReprocess = false,
    }: {
      id: string;
      forceReprocess?: boolean;
    }) => apiClient.processEncounter(id, forceReprocess),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.encounters });
      queryClient.invalidateQueries({
        queryKey: queryKeys.encounter(variables.id),
      });
      success("Processing Complete", "Encounter has been processed by AI.");
    },
    onError: (err: any) => {
      error(
        "Processing Failed",
        err.response?.data?.detail || "Failed to process encounter."
      );
    },
  });
}

// Claims hooks
export function useClaims(params?: {
  patient_id?: string;
  status?: string;
  payer_id?: string;
  page?: number;
  per_page?: number;
}) {
  return useQuery({
    queryKey: [...queryKeys.claims, params],
    queryFn: () => apiClient.getClaims(params),
  });
}

export function useClaim(id: string) {
  return useQuery({
    queryKey: queryKeys.claim(id),
    queryFn: () => apiClient.getClaim(id),
    enabled: !!id,
  });
}

export function useCreateClaim() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (data: any) => apiClient.createClaim(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.claims });
      success("Claim Created", "Claim has been successfully created.");
    },
    onError: (err: any) => {
      error(
        "Creation Failed",
        err.response?.data?.detail || "Failed to create claim."
      );
    },
  });
}

export function useUpdateClaim() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.updateClaim(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.claims });
      queryClient.invalidateQueries({
        queryKey: queryKeys.claim(variables.id),
      });
      success("Claim Updated", "Claim has been successfully updated.");
    },
    onError: (err: any) => {
      error(
        "Update Failed",
        err.response?.data?.detail || "Failed to update claim."
      );
    },
  });
}

export function useSubmitClaim() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: ({
      id,
      submitToPayer = true,
    }: {
      id: string;
      submitToPayer?: boolean;
    }) => apiClient.submitClaim(id, submitToPayer),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.claims });
      queryClient.invalidateQueries({
        queryKey: queryKeys.claim(variables.id),
      });
      success(
        "Claim Submitted",
        "Claim has been successfully submitted to payer."
      );
    },
    onError: (err: any) => {
      error(
        "Submission Failed",
        err.response?.data?.detail || "Failed to submit claim."
      );
    },
  });
}

export function useCheckEligibility() {
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (data: {
      patient_id: string;
      payer_id: string;
      service_date: string;
    }) => apiClient.checkEligibility(data),
    onSuccess: () => {
      success(
        "Eligibility Verified",
        "Patient eligibility has been successfully verified."
      );
    },
    onError: (err: any) => {
      error(
        "Verification Failed",
        err.response?.data?.detail || "Failed to verify eligibility."
      );
    },
  });
}

export function useClaimDenials(id: string) {
  return useQuery({
    queryKey: queryKeys.claimDenials(id),
    queryFn: () => apiClient.getClaimDenials(id),
    enabled: !!id,
  });
}

// AI Agent hooks
export function useAgentStatus() {
  return useQuery({
    queryKey: queryKeys.agentStatus,
    queryFn: () => apiClient.getAgentStatus(),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useChatWithAgent() {
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (data: {
      message: string;
      session_id?: string;
      context?: any;
    }) => apiClient.chatWithAgent(data),
    onError: (err: any) => {
      error(
        "Chat Error",
        err.response?.data?.detail || "Failed to send message to AI agent."
      );
    },
  });
}

export function useChatSession(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.chatSession(sessionId),
    queryFn: () => apiClient.getChatSession(sessionId),
    enabled: !!sessionId,
  });
}

export function useProcessEncounterWithAgent() {
  const queryClient = useQueryClient();
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: (encounterId: string) =>
      apiClient.processEncounterWithAgent(encounterId),
    onSuccess: (data, encounterId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.encounters });
      queryClient.invalidateQueries({
        queryKey: queryKeys.encounter(encounterId),
      });
      success(
        "AI Processing Complete",
        "Encounter has been processed by the AI agent."
      );
    },
    onError: (err: any) => {
      error(
        "AI Processing Failed",
        err.response?.data?.detail || "Failed to process with AI agent."
      );
    },
  });
}
