import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Clock, Phone } from "lucide-react";

export default function HospitalNavigator() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Navigator</h1>
        <p className="text-muted-foreground">Find healthcare facilities near you</p>
      </div>

      <Card className="p-4 shadow-card">
        <div className="flex gap-2">
          <Input placeholder="Search hospitals, clinics, specialists..." className="flex-1" />
          <Button>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <div className="text-center py-12 text-muted-foreground">
        <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg">Search for healthcare facilities</p>
      </div>
    </div>
  );
}
