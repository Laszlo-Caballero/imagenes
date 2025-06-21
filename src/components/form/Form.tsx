"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  image: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Image is required",
  }),
});

export default function FormImage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", data.image);
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api`, formData);
      window.location.reload(); // Reload the page to see the new image
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="text-white">Cargando...</div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <Input
              type="file"
              accept="image/*"
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
          )}
        />

        <Button type="submit" className="w-full">
          Subir
        </Button>
      </form>
    </Form>
  );
}
