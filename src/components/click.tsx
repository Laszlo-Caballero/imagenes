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
          if (!url) {
            toast.error("No hay URL para copiar");
            return;
          }
          navigator.clipboard.writeText(url);
          toast.success("URL copiada al portapapeles");
        }}
      />
    </div>
  );
}
