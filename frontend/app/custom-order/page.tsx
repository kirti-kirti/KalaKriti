"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Upload, Camera, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@tanstack/react-query";

export default function CustomOrderPage() {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    clothType: "T-Shirt",
    size: "M",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const customOrderMutation = useMutation({
    mutationFn: async (data: FormData) => api.post("/api/custom-orders", data),
    onSuccess: () => {
      toast.success("Custom order request submitted!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit request");
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to place a custom order");
      return;
    }

    const data = new FormData();
    data.append("clothType", formData.clothType);
    data.append("size", formData.size);
    data.append("description", formData.description);
    if (image) data.append("image", image);

    customOrderMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-1 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Design Your Own</h1>
        <p className="text-muted-foreground">Tell us your vision, and our artists will bring it to life.</p>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-xl">
        <div className="bg-muted/30 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border">
          <label className="w-full h-full min-h-[300px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors group relative overflow-hidden">
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
              </>
            ) : (
              <div className="p-8">
                <Upload className="w-12 h-12 text-muted-foreground mb-4 mx-auto" />
                <h3 className="font-bold text-lg mb-2">Upload Reference</h3>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop your sketch here.</p>
                <div className="bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium">Browse Files</div>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <div className="p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cloth Type</label>
                <select 
                  value={formData.clothType}
                  onChange={(e) => setFormData(p => ({ ...p, clothType: e.target.value }))}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-none text-sm"
                >
                  <option>T-Shirt</option>
                  <option>Kurti</option>
                  <option>Jeans</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <select 
                  value={formData.size}
                  onChange={(e) => setFormData(p => ({ ...p, size: e.target.value }))}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-none text-sm"
                >
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </select>
              </div>
            </div>
            
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe your design..."
              className="w-full px-4 py-3 bg-muted rounded-xl border-none text-sm resize-none"
            />

            <button 
              type="submit" 
              disabled={customOrderMutation.isPending}
              className="w-full bg-foreground text-background py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              {customOrderMutation.isPending ? "Submitting..." : "Submit Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
