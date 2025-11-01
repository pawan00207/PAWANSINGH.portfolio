import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useHealthRecords } from "@/hooks/useHealthData";

export default function FileUpload({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [notes, setNotes] = useState("");
  
  const { uploadRecord } = useHealthRecords();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    uploadRecord.mutate(
      {
        file,
        metadata: {
          title,
          category,
          doctor_name: doctorName,
          record_date: recordDate,
          notes,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div>
        <Label htmlFor="title">Document Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Blood Test Results"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prescription">Prescription</SelectItem>
            <SelectItem value="lab-report">Lab Report</SelectItem>
            <SelectItem value="imaging">Imaging</SelectItem>
            <SelectItem value="discharge-summary">Discharge Summary</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="doctor">Doctor Name</Label>
        <Input
          id="doctor"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Dr. Smith"
        />
      </div>

      <div>
        <Label htmlFor="date">Record Date</Label>
        <Input
          id="date"
          type="date"
          value={recordDate}
          onChange={(e) => setRecordDate(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes..."
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={uploadRecord.isPending} className="flex-1">
          <Upload className="w-4 h-4 mr-2" />
          {uploadRecord.isPending ? "Uploading..." : "Upload"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
