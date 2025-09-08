/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Types for API responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ErrorResponse {
  error: string;
  detail: string;
  timestamp: string;
}

// API Client class
class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor for auth
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          // Redirect to login if needed
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );

    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("auth_token");
      if (savedToken) {
        this.token = savedToken;
      }
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  getToken() {
    return this.token;
  }

  // Generic request method
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request({
      method: "POST",
      url: "/auth/login",
      data: { email, password },
    });
  }

  async logout() {
    return this.request({
      method: "POST",
      url: "/auth/logout",
    });
  }

  async getCurrentUser() {
    return this.request({
      method: "GET",
      url: "/auth/me",
    });
  }

  // Patient endpoints
  async getPatients(params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }) {
    return this.request({
      method: "GET",
      url: "/patients",
      params,
    });
  }

  async getPatient(id: string) {
    return this.request({
      method: "GET",
      url: `/patients/${id}`,
    });
  }

  async createPatient(data: any) {
    return this.request({
      method: "POST",
      url: "/patients",
      data,
    });
  }

  async updatePatient(id: string, data: any) {
    return this.request({
      method: "PUT",
      url: `/patients/${id}`,
      data,
    });
  }

  async deletePatient(id: string) {
    return this.request({
      method: "DELETE",
      url: `/patients/${id}`,
    });
  }

  async getPatientEncounters(id: string) {
    return this.request({
      method: "GET",
      url: `/patients/${id}/encounters`,
    });
  }

  // Encounter endpoints
  async getEncounters(params?: {
    patient_id?: string;
    status?: string;
    page?: number;
    per_page?: number;
  }) {
    return this.request({
      method: "GET",
      url: "/encounters",
      params,
    });
  }

  async getEncounter(id: string) {
    return this.request({
      method: "GET",
      url: `/encounters/${id}`,
    });
  }

  async createEncounter(data: any) {
    return this.request({
      method: "POST",
      url: "/encounters",
      data,
    });
  }

  async updateEncounter(id: string, data: any) {
    return this.request({
      method: "PUT",
      url: `/encounters/${id}`,
      data,
    });
  }

  async processEncounter(id: string, forceReprocess = false) {
    return this.request({
      method: "POST",
      url: `/encounters/${id}/process`,
      data: { encounter_id: id, force_reprocess: forceReprocess },
    });
  }

  // Claims endpoints
  async getClaims(params?: {
    patient_id?: string;
    status?: string;
    payer_id?: string;
    page?: number;
    per_page?: number;
  }) {
    return this.request({
      method: "GET",
      url: "/claims",
      params,
    });
  }

  async getClaim(id: string) {
    return this.request({
      method: "GET",
      url: `/claims/${id}`,
    });
  }

  async createClaim(data: any) {
    return this.request({
      method: "POST",
      url: "/claims",
      data,
    });
  }

  async updateClaim(id: string, data: any) {
    return this.request({
      method: "PUT",
      url: `/claims/${id}`,
      data,
    });
  }

  async submitClaim(id: string, submitToPayer = true) {
    return this.request({
      method: "POST",
      url: `/claims/${id}/submit`,
      data: { claim_id: id, submit_to_payer: submitToPayer },
    });
  }

  async checkEligibility(data: {
    patient_id: string;
    payer_id: string;
    service_date: string;
  }) {
    return this.request({
      method: "POST",
      url: "/claims/check-eligibility",
      data,
    });
  }

  async getClaimDenials(id: string) {
    return this.request({
      method: "GET",
      url: `/claims/${id}/denials`,
    });
  }

  // AI Agent endpoints
  async chatWithAgent(data: {
    message: string;
    session_id?: string;
    context?: any;
  }) {
    return this.request({
      method: "POST",
      url: "/ai/chat",
      data,
    });
  }

  async getChatSession(sessionId: string) {
    return this.request({
      method: "GET",
      url: `/ai/chat/sessions/${sessionId}`,
    });
  }

  async deleteChatSession(sessionId: string) {
    return this.request({
      method: "DELETE",
      url: `/ai/chat/sessions/${sessionId}`,
    });
  }

  async processEncounterWithAgent(encounterId: string) {
    return this.request({
      method: "POST",
      url: `/ai/chat/process-encounter?encounter_id=${encounterId}`,
    });
  }

  async getAgentStatus() {
    return this.request({
      method: "GET",
      url: "/ai/status",
    });
  }

  // Health check
  async healthCheck() {
    return this.request({
      method: "GET",
      url: "/health",
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export for use in React Query
export default apiClient;
