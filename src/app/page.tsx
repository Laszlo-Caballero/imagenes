import Click from "@/components/click";
import FormImage from "@/components/form/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CloudinaryResponse } from "@/interface/res";
import axios from "axios";
import { LucideCopy } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const res = await axios.get(`${process.env.BASE_URL}/api`);
  const images: CloudinaryResponse[] = res.data;
  return (
    <div className="w-full min-h-screen p-12 bg-gray-100 flex flex-col items-center justify-center">
      <FormImage />

      <div className="grid grid-cols-4 gap-2 mt-8 w-full">
        {images.map((image) => {
          return (
            <Card key={image.public_id}>
              <CardHeader>
                <div className="flex items-center gap-x-2">
                  <p className="text-black">Copiar</p>
                  <Click url={image.url} />
                </div>
              </CardHeader>

              <CardContent>
                <Image
                  src={image.secure_url}
                  alt={image.display_name}
                  width={image.width}
                  height={image.height}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
