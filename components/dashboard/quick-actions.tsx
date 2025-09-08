import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, FileText, CreditCard } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";

export function QuickActions() {
  const {
    setCreatePatientModalOpen,
    setCreateEncounterModalOpen,
    setCreateClaimModalOpen,
    setChatOpen,
  } = useUIStore();

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => setChatOpen(true)}>
        <MessageSquare className="h-4 w-4 mr-2" />
        AI Assistant
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCreateEncounterModalOpen(true)}
      >
        <FileText className="h-4 w-4 mr-2" />
        New Encounter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setCreateClaimModalOpen(true)}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        New Claim
      </Button>

      <Button
        onClick={() => setCreatePatientModalOpen(true)}
        className="bg-falcon-500 hover:bg-falcon-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Patient
      </Button>
    </div>
  );
}
