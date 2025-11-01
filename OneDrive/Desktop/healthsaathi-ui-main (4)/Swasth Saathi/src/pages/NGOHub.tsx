import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function NGOHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">NGO Hub</h1>
        <p className="text-muted-foreground">Access healthcare support from NGOs</p>
      </div>

      <div className="text-center py-12 text-muted-foreground">
        <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg">Explore NGO programs and resources</p>
      </div>
    </div>
  );
}
