import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Phone,
  MapPin,
  AlertCircle,
  Users,
  Heart,
  Ambulance,
  Clock,
} from "lucide-react";

const emergencyContacts = [
  {
    name: "Emergency Services",
    number: "911",
    icon: Ambulance,
    description: "Police, Fire, Ambulance",
  },
  {
    name: "Poison Control",
    number: "1-800-222-1222",
    icon: AlertCircle,
    description: "24/7 Poison Help",
  },
  {
    name: "Mental Health Crisis",
    number: "988",
    icon: Heart,
    description: "Suicide & Crisis Lifeline",
  },
];

const nearbyHospitals = [
  {
    name: "City General Hospital",
    distance: "2.3 km",
    emergency: true,
    address: "123 Medical Center Dr",
  },
  {
    name: "St. Mary's Medical Center",
    distance: "4.1 km",
    emergency: true,
    address: "456 Healthcare Ave",
  },
  {
    name: "Community Health Clinic",
    distance: "5.8 km",
    emergency: false,
    address: "789 Wellness Blvd",
  },
];

const personalEmergencyContacts = [
  { name: "John Doe", relation: "Spouse", number: "+1 234-567-8900" },
  { name: "Jane Smith", relation: "Daughter", number: "+1 234-567-8901" },
];

export default function Emergency() {
  return (
    <div className="space-y-6">
      {/* Header Alert */}
      <Alert className="border-emergency bg-emergency/10 shadow-emergency">
        <AlertCircle className="h-5 w-5 text-emergency" />
        <AlertDescription className="text-foreground font-medium">
          Emergency Mode Active - Quick access to emergency services and contacts
        </AlertDescription>
      </Alert>

      {/* Emergency Services */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Emergency Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <Card
                key={contact.number}
                className="p-6 hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emergency/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-emergency" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {contact.description}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full bg-emergency hover:bg-emergency/90"
                      onClick={() => (window.location.href = `tel:${contact.number}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call {contact.number}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Nearby Hospitals</h2>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            View Map
          </Button>
        </div>
        <div className="space-y-3">
          {nearbyHospitals.map((hospital) => (
            <Card
              key={hospital.name}
              className="p-4 hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Ambulance className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {hospital.name}
                      </h3>
                      {hospital.emergency && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {hospital.address}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {hospital.distance} away
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Personal Emergency Contacts */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Personal Emergency Contacts
        </h2>
        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            {personalEmergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {contact.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {contact.relation}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = `tel:${contact.number}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full">
              + Add Emergency Contact
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
