import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Brain, Moon } from "lucide-react";
import { useHealthMetrics } from "@/hooks/useHealthData";

export default function HealthScore() {
  const { metrics } = useHealthMetrics();

  // Calculate health score based on recent metrics
  const calculateScore = () => {
    if (!metrics || metrics.length === 0) return 75;
    
    // Simple scoring algorithm - can be enhanced with AI
    const recentMetrics = metrics.slice(0, 5);
    let score = 70;
    
    // Add points for consistent tracking
    score += Math.min(recentMetrics.length * 2, 10);
    
    // Add points for healthy ranges (simplified)
    recentMetrics.forEach((metric) => {
      if (metric.metric_type === "heart_rate" && metric.value >= 60 && metric.value <= 100) {
        score += 2;
      }
      if (metric.metric_type === "blood_pressure_systolic" && metric.value >= 90 && metric.value <= 120) {
        score += 2;
      }
    });

    return Math.min(score, 100);
  };

  const score = calculateScore();
  const scoreColor = score >= 80 ? "text-success" : score >= 60 ? "text-secondary" : "text-destructive";
  const progressColor = score >= 80 ? "bg-success" : score >= 60 ? "bg-secondary" : "bg-destructive";

  const categories = [
    { icon: Heart, label: "Cardiovascular", score: 85, color: "text-success" },
    { icon: Activity, label: "Physical Activity", score: 72, color: "text-secondary" },
    { icon: Brain, label: "Mental Wellness", score: 78, color: "text-success" },
    { icon: Moon, label: "Sleep Quality", score: 65, color: "text-secondary" },
  ];

  return (
    <Card className="p-6 shadow-card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Your Health Score</h2>
      
      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className={`text-6xl font-bold ${scoreColor} mb-2`}>{score}</div>
        <Progress value={score} className="h-3 mb-4" />
        <p className="text-muted-foreground">
          {score >= 80 ? "Excellent health!" : score >= 60 ? "Good, keep improving" : "Needs attention"}
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground mb-3">Category Breakdown</h3>
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${cat.color}`} />
                  </div>
                  <span className="text-sm font-medium">{cat.label}</span>
                </div>
                <span className={`text-sm font-bold ${cat.color}`}>{cat.score}%</span>
              </div>
              <Progress value={cat.score} className="h-2" />
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h4 className="font-semibold text-sm mb-2">AI Recommendations</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Increase daily water intake to 2-3 liters</li>
          <li>• Add 30 minutes of walking to your routine</li>
          <li>• Track sleep patterns for better analysis</li>
        </ul>
      </div>
    </Card>
  );
}
