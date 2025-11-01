import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Activity, AlertCircle, CheckCircle } from "lucide-react";

export default function HealthTimeline() {
  const { data: timeline, isLoading } = useQuery({
    queryKey: ["health-timeline"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_timeline")
        .select("*")
        .order("event_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg"></div>;
  }

  const getIcon = (eventType: string) => {
    switch (eventType) {
      case "appointment":
        return Calendar;
      case "symptom":
        return AlertCircle;
      case "treatment":
        return Activity;
      default:
        return CheckCircle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <h2 className="text-2xl font-bold text-foreground mb-6">AI Health Timeline</h2>
      
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {timeline?.map((event, index) => {
            const Icon = getIcon(event.event_type);
            return (
              <div key={event.id} className="relative pl-14">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                
                <Card className="p-4 hover:shadow-elevated transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                    </div>
                    {event.severity && (
                      <Badge variant={getSeverityColor(event.severity) as any}>
                        {event.severity}
                      </Badge>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {event.description}
                    </p>
                  )}
                </Card>
              </div>
            );
          })}
          
          {(!timeline || timeline.length === 0) && (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No health events recorded yet</p>
              <p className="text-sm mt-2">Your health journey will appear here</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
