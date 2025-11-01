import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FileUpload from "@/components/FileUpload";
import HealthScore from "@/components/HealthScore";
import HealthTimeline from "@/components/HealthTimeline";
import QREmergencyCard from "@/components/QREmergencyCard";
import { useHealthRecords, useHealthMetrics } from "@/hooks/useHealthData";
import { cn } from "@/lib/utils";
import {
  FileText,
  Upload,
  Download,
  Calendar,
  Activity,
  Pill,
  TestTube,
  Heart,
} from "lucide-react";

export default function HealthVault() {
  const [activeTab, setActiveTab] = useState("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { records, isLoading } = useHealthRecords();
  const { metrics } = useHealthMetrics();

  const filteredRecords = activeTab === "all"
    ? records
    : records?.filter((record) =>
        activeTab === "prescriptions"
          ? record.category === "prescription"
          : record.category !== "prescription"
      );

  const healthMetrics = [
    { icon: Heart, label: "Heart Rate", value: metrics?.find(m => m.metric_type === "heart_rate")?.value || "-- bpm", status: "normal" },
    { icon: Activity, label: "Blood Pressure", value: "120/80", status: "normal" },
    { icon: TestTube, label: "Blood Sugar", value: metrics?.find(m => m.metric_type === "blood_sugar")?.value || "-- mg/dL", status: "normal" },
    { icon: Pill, label: "Active Records", value: records?.length || 0, status: "info" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">HealthVault</h1>
          <p className="text-muted-foreground">
            Your secure medical records in one place
          </p>
        </div>
        <Button className="shadow-lg" onClick={() => setShowUploadDialog(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Records
        </Button>
      </div>

      {/* Health Score and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthScore />
        <QREmergencyCard />
      </div>

      <HealthTimeline />

      {/* Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-4 shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    metric.status === "normal"
                      ? "bg-success/10"
                      : "bg-primary/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      metric.status === "normal" ? "text-success" : "text-primary"
                    )}
                  />
                </div>
                <Badge
                  variant={metric.status === "normal" ? "outline" : "secondary"}
                  className="text-xs"
                >
                  {metric.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Records */}
      <Card className="p-6 shadow-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
            ) : !filteredRecords || filteredRecords.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No records found</p>
                <p className="text-sm">Upload your first medical record to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRecords.map((record) => (
                  <Card
                    key={record.id}
                    className="p-4 hover:shadow-elevated transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {record.category === "prescription" ? (
                            <Pill className="w-5 h-5 text-primary" />
                          ) : (
                            <FileText className="w-5 h-5 text-secondary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {record.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {record.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(record.record_date).toLocaleDateString()}
                            </span>
                            {record.doctor_name && <span>{record.doctor_name}</span>}
                          </div>
                        </div>
                      </div>
                      {record.file_url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={() => window.open(record.file_url!, "_blank")}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Health Record</DialogTitle>
          </DialogHeader>
          <FileUpload onClose={() => setShowUploadDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
