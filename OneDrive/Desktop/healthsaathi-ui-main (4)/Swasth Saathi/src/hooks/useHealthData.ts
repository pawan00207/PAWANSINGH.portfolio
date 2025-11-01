import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHealthRecords = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: records, isLoading } = useQuery({
    queryKey: ["health-records"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_records")
        .select("*")
        .order("record_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const uploadRecord = useMutation({
    mutationFn: async ({ file, metadata }: { file: File; metadata: any }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");

      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("health-records")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("health-records")
        .getPublicUrl(fileName);

      // Insert record
      const { error: insertError } = await supabase
        .from("health_records")
        .insert({
          user_id: user.id,
          file_url: publicUrl,
          file_type: file.type,
          ...metadata,
        });

      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["health-records"] });
      toast({
        title: "Success",
        description: "Health record uploaded successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { records, isLoading, uploadRecord };
};

export const useHealthMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ["health-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_metrics")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  return { metrics };
};

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: any) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
  });

  return { profile, updateProfile };
};
