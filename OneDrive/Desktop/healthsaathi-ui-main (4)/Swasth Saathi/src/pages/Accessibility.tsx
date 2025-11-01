import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, QrCode, Users, MessageSquare } from "lucide-react";
import AccessibilityMapNavigator from "@/components/AccessibilityMapNavigator";
import DisabilityCommunity from "@/components/DisabilityCommunity";
import VernacularAIChat from "@/components/VernacularAIChat";
import QREmergencyCard from "@/components/QREmergencyCard";

export default function Accessibility() {
  const [activeTab, setActiveTab] = useState("navigation");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-primary p-6 rounded-2xl text-white shadow-glow">
        <h1 className="text-3xl font-bold mb-2">♿ Accessibility Hub</h1>
        <p className="text-white/90">
          Your personalized accessibility companion with navigation, medical records, community support, and multilingual AI assistance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto gap-2">
          <TabsTrigger value="navigation" className="flex flex-col gap-2 py-3">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Navigation</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex flex-col gap-2 py-3">
            <QrCode className="w-5 h-5" />
            <span className="text-xs">Medical Records</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex flex-col gap-2 py-3">
            <Users className="w-5 h-5" />
            <span className="text-xs">Community</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex flex-col gap-2 py-3">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">AI Assistant</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="space-y-6">
          <AccessibilityMapNavigator />
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card className="p-6 shadow-elevated">
            <h2 className="text-2xl font-bold mb-4">📋 Medical Records & Certificates</h2>
            <p className="text-muted-foreground mb-6">
              Scan your QR code to instantly access your medical history, treatment records, and disability certificates
            </p>
            <QREmergencyCard />
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <DisabilityCommunity />
        </TabsContent>

        <TabsContent value="assistant" className="space-y-6">
          <VernacularAIChat />
        </TabsContent>
      </Tabs>
    </div>
  );
}
