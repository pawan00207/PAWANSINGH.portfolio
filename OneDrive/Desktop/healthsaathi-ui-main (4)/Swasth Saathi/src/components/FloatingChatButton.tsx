import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-elevated hover:shadow-glow transition-all duration-300 z-50 animate-pulse-glow"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </Button>

      {/* Popup Card */}
      {isOpen && (
        <Card className="fixed bottom-28 right-6 w-80 p-6 shadow-elevated z-50 animate-slide-up">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Health Companion</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Get instant health guidance, symptom analysis, and wellness advice from our AI assistant powered by advanced AI technology.
            </p>

            <div className="space-y-2">
              <Link to="/ai-companion" className="block">
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Start Consultation
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>

            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                💡 Free consultations available • No appointment needed
              </p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
