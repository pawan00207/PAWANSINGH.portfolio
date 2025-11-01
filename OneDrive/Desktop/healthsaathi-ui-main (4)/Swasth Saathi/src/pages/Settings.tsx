import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Lock, User, Palette } from "lucide-react";

const settingsSections = [
  {
    title: "Profile",
    icon: User,
    settings: [
      { label: "Edit Profile", action: true },
      { label: "Medical Information", action: true },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { label: "Medication Reminders", toggle: true },
      { label: "Appointment Alerts", toggle: true },
      { label: "Health Tips", toggle: true },
    ],
  },
  {
    title: "Privacy & Security",
    icon: Lock,
    settings: [
      { label: "Two-Factor Authentication", toggle: true },
      { label: "Biometric Login", toggle: true },
    ],
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-6 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div
                    key={setting.label}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <Label htmlFor={setting.label} className="text-foreground cursor-pointer">
                      {setting.label}
                    </Label>
                    {setting.toggle ? (
                      <Switch id={setting.label} />
                    ) : (
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
