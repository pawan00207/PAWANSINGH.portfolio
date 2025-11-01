import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock } from "lucide-react";

export default function Teleconsultation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Teleconsultation</h1>
        <p className="text-muted-foreground">Connect with healthcare providers remotely</p>
      </div>

      <div className="text-center py-12 text-muted-foreground">
        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg">Schedule your virtual consultation</p>
        <Button className="mt-4">Book Appointment</Button>
      </div>
    </div>
  );
}
