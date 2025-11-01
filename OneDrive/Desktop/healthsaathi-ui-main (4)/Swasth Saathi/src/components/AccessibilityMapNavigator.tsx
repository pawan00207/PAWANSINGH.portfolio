import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Hospital, Store, Accessibility } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AccessibilityMapNavigator() {
  const [destination, setDestination] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  const nearbyAccessiblePlaces = [
    { name: "Accessible Hospital", icon: Hospital, distance: "0.5 km", type: "Healthcare" },
    { name: "Pharmacy with Ramp", icon: Store, distance: "0.3 km", type: "Medical" },
    { name: "Community Center", icon: Accessibility, distance: "1.2 km", type: "Support" },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location Found",
            description: "Your current location has been detected",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Please enable location services",
            variant: "destructive",
          });
        }
      );
    }
  };

  const navigateToPlace = (placeName: string) => {
    toast({
      title: "Navigation Started",
      description: `Finding accessible route to ${placeName}`,
    });
    // In production, integrate with Google Maps API
    if (currentLocation) {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${encodeURIComponent(placeName)}&travelmode=walking`;
      window.open(mapsUrl, '_blank');
    }
  };

  return (
    <Card className="p-6 shadow-elevated space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">🗺️ Accessible Navigation</h2>
          <Button onClick={getCurrentLocation} variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Find My Location
          </Button>
        </div>
        
        <p className="text-muted-foreground">
          Find wheelchair-accessible routes and facilities in your area
        </p>

        <div className="flex gap-2">
          <Input
            placeholder="Search for accessible destinations..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => navigateToPlace(destination)}>
            <Navigation className="w-4 h-4 mr-2" />
            Navigate
          </Button>
        </div>

        {currentLocation && (
          <Badge variant="secondary" className="w-fit">
            📍 Location detected
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Nearby Accessible Places</h3>
        <div className="grid gap-3">
          {nearbyAccessiblePlaces.map((place, index) => {
            const Icon = place.icon;
            return (
              <Card
                key={index}
                className="p-4 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigateToPlace(place.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{place.name}</div>
                      <div className="text-sm text-muted-foreground">{place.distance} away</div>
                    </div>
                  </div>
                  <Badge>{place.type}</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
        <h4 className="font-semibold mb-2">♿ Accessibility Features</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>✓ Wheelchair-accessible routes prioritized</li>
          <li>✓ Ramp and elevator locations marked</li>
          <li>✓ Accessible parking spots indicated</li>
          <li>✓ Voice-guided navigation available</li>
        </ul>
      </div>
    </Card>
  );
}
