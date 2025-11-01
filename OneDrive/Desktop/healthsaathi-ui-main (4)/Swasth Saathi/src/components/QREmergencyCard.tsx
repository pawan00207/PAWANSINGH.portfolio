import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import QRCode from "qrcode";
import { useProfile } from "@/hooks/useHealthData";

export default function QREmergencyCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { profile } = useProfile();

  useEffect(() => {
    if (profile && canvasRef.current) {
      const emergencyData = {
        name: profile.full_name,
        bloodGroup: profile.blood_group,
        allergies: profile.allergies,
        conditions: profile.medical_conditions,
        emergencyContact: profile.emergency_contact,
      };

      QRCode.toCanvas(
        canvasRef.current,
        JSON.stringify(emergencyData),
        { width: 256, margin: 2 },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [profile]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "health-emergency-qr.png";
      link.click();
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <h2 className="text-xl font-bold text-foreground mb-4">Emergency QR Card</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Download and carry this QR code for offline access to your medical information in emergencies.
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white rounded-lg">
          <canvas ref={canvasRef}></canvas>
        </div>
        
        <Button onClick={downloadQR} variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </div>

      <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
        <p className="font-semibold mb-2">Includes:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Name & Blood Group</li>
          <li>• Allergies & Medical Conditions</li>
          <li>• Emergency Contact</li>
        </ul>
      </div>
    </Card>
  );
}
