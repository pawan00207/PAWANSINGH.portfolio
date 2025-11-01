import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageSquare,
  Hospital,
  Video,
  Users,
  Shield,
  Activity,
  Calendar,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "HealthVault",
    description: "Store and manage all your medical records securely in one place",
    color: "text-success",
    path: "/health-vault",
  },
  {
    icon: MessageSquare,
    title: "AI Companion",
    description: "Get instant health guidance from our intelligent AI assistant",
    color: "text-primary",
    path: "/ai-companion",
  },
  {
    icon: Hospital,
    title: "Hospital Navigator",
    description: "Find the best hospitals and specialists near you",
    color: "text-secondary",
    path: "/hospital-navigator",
  },
  {
    icon: Video,
    title: "Teleconsultation",
    description: "Connect with healthcare professionals from anywhere",
    color: "text-accent",
    path: "/teleconsultation",
  },
  {
    icon: Users,
    title: "NGO Hub",
    description: "Access support and resources from healthcare NGOs",
    color: "text-warning",
    path: "/ngo-hub",
  },
  {
    icon: Shield,
    title: "Emergency Mode",
    description: "Quick access to emergency services and contacts",
    color: "text-destructive",
    path: "/emergency",
  },
];

const stats = [
  { icon: Activity, label: "Active Users", value: "50K+" },
  { icon: Hospital, label: "Partner Hospitals", value: "1,200+" },
  { icon: Calendar, label: "Consultations", value: "100K+" },
];

export default function Home() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 lg:p-12 text-white shadow-elevated hover:shadow-glow transition-shadow duration-300">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
            <p className="text-sm font-medium">🩺 Your 24/7 Health Partner</p>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
            Your Health Companion, Always by Your Side
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-white/90 max-w-2xl">
            HealthSaathi brings together AI-powered health guidance, medical records management, 
            and instant access to healthcare services—all in one inclusive platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/health-vault">
              <Button size="lg" variant="secondary" className="shadow-lg hover:scale-105 transition-transform">
                Get Started
              </Button>
            </Link>
            <Link to="/ai-companion">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white hover:scale-105 transition-transform"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Try AI Assistant
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/30 border-2 border-white" />
              ))}
            </div>
            <p className="text-sm text-white/80">Join 50,000+ users trusting HealthSaathi</p>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-40 -bottom-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-75" />
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: ${index * 100}ms }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 text-foreground">
            Everything You Need for Better Health
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive healthcare tools designed for everyone, accessible from anywhere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.path}>
                <Card 
                  className="p-6 h-full shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-pointer group animate-fade-in border-2 border-transparent hover:border-primary/20"
                  style={{ animationDelay: ${index * 100}ms }}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                        "bg-gradient-primary",
                        "group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg"
                      )}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-4">{feature.description}</p>
                    <div className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 lg:p-12 shadow-elevated hover:shadow-glow transition-shadow">
        <div className="relative z-10 text-center max-w-2xl mx-auto text-white">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
            <p className="text-sm font-medium">✨ Start Your Health Journey Today</p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of users who trust HealthSaathi for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/health-vault">
              <Button size="lg" variant="secondary" className="shadow-lg hover:scale-105 transition-transform w-full sm:w-auto">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/ai-companion">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white hover:scale-105 transition-transform w-full sm:w-auto">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </section>
    </div>
  );
}

function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}