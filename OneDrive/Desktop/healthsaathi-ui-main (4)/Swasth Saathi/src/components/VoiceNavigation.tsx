import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    toast({
      title: "Voice Command",
      description: `You said: "${command}"`,
    });

    if (command.includes("home")) {
      navigate("/");
    } else if (command.includes("health vault") || command.includes("records")) {
      navigate("/health-vault");
    } else if (command.includes("ai") || command.includes("companion")) {
      navigate("/ai-companion");
    } else if (command.includes("hospital") || command.includes("navigator")) {
      navigate("/hospital-navigator");
    } else if (command.includes("emergency")) {
      navigate("/emergency");
    } else if (command.includes("settings")) {
      navigate("/settings");
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Voice navigation is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast({
        title: "Listening",
        description: "Say a command like 'go to health vault' or 'emergency'",
      });
    }
  };

  return (
    <Button
      onClick={toggleListening}
      variant={isListening ? "default" : "outline"}
      size="icon"
      className="rounded-full"
      aria-label="Voice navigation"
    >
      {isListening ? (
        <Mic className="w-4 h-4 animate-pulse" />
      ) : (
        <MicOff className="w-4 h-4" />
      )}
    </Button>
  );
}
