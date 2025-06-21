"use client";
import { LucideCopy } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function Click({ url }: { url?: string }) {
  return (
    <div>
      <LucideCopy
        className="cursor-pointer"
        onClick={() => {
          url && navigator.clipboard.writeText(url);
          toast.success("URL copiada al portapapeles");
        }}
      />
    </div>
  );
}
