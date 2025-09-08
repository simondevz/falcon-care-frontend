import { create } from "zustand";

interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;

  // Chat state
  chatOpen: boolean;
  currentChatSession: string | null;

  // Modal states
  createPatientModalOpen: boolean;
  createEncounterModalOpen: boolean;
  createClaimModalOpen: boolean;

  // Loading states (for operations not handled by React Query)
  globalLoading: boolean;

  // Notifications
  notifications: Notification[];

  // Theme
  theme: "light" | "dark" | "system";

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  setChatOpen: (open: boolean) => void;
  setCurrentChatSession: (sessionId: string | null) => void;

  setCreatePatientModalOpen: (open: boolean) => void;
  setCreateEncounterModalOpen: (open: boolean) => void;
  setCreateClaimModalOpen: (open: boolean) => void;

  setGlobalLoading: (loading: boolean) => void;

  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  setTheme: (theme: "light" | "dark" | "system") => void;
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  sidebarOpen: true,
  sidebarCollapsed: false,
  chatOpen: false,
  currentChatSession: null,
  createPatientModalOpen: false,
  createEncounterModalOpen: false,
  createClaimModalOpen: false,
  globalLoading: false,
  notifications: [],
  theme: "system",

  // Sidebar actions
  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  // Chat actions
  setChatOpen: (open: boolean) => {
    set({ chatOpen: open });
  },

  setCurrentChatSession: (sessionId: string | null) => {
    set({ currentChatSession: sessionId });
  },

  // Modal actions
  setCreatePatientModalOpen: (open: boolean) => {
    set({ createPatientModalOpen: open });
  },

  setCreateEncounterModalOpen: (open: boolean) => {
    set({ createEncounterModalOpen: open });
  },

  setCreateClaimModalOpen: (open: boolean) => {
    set({ createClaimModalOpen: open });
  },

  // Loading actions
  setGlobalLoading: (loading: boolean) => {
    set({ globalLoading: loading });
  },

  // Notification actions
  addNotification: (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      duration: 5000, // Default 5 seconds
      ...notification,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Theme actions
  setTheme: (theme: "light" | "dark" | "system") => {
    set({ theme });

    // Apply theme to document
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.toggle("dark", systemTheme === "dark");
      } else {
        root.classList.toggle("dark", theme === "dark");
      }

      localStorage.setItem("falcon-theme", theme);
    }
  },
}));

// Helper hooks for specific UI actions
export const useNotifications = () => {
  const notifications = useUIStore((state) => state.notifications);
  const addNotification = useUIStore((state) => state.addNotification);
  const removeNotification = useUIStore((state) => state.removeNotification);
  const clearNotifications = useUIStore((state) => state.clearNotifications);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success: (title: string, message?: string) =>
      addNotification({ type: "success", title, message }),
    error: (title: string, message?: string) =>
      addNotification({ type: "error", title, message }),
    warning: (title: string, message?: string) =>
      addNotification({ type: "warning", title, message }),
    info: (title: string, message?: string) =>
      addNotification({ type: "info", title, message }),
  };
};
