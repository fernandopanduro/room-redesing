"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  CldUploadButton,
  CldImage,
  CldUploadWidgetResults,
} from "next-cloudinary";

const FormSchema = z.object({
  Prompt: z.string().min(2, {
    message: "La descripcion debe tener al menos 2 caracteres.",
  }),
  Keywords: z.string().min(2, {
    message: "Las palabras clave deben tener al menos 2 caracteres.",
  }),
  NegativeKeywords: z.string().min(2, {
    message: "Palabras negativas must be at least 2 characters.",
  }),
  NumberImages: z.string({
    required_error: "Selecciona una opción.",
  }),
});

export function InputForm() {
  const [images, setImages] = useState<[]>([]);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [imageId, setImageId] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Prompt: "",
      Keywords: "",
      NegativeKeywords: "",
      NumberImages: "1",
    },
  });

  const getImage = (data: any) => {
    data.Image = imageURL;
    fetch("/api/image", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(error => console.log(error));
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (imageURL === undefined) {
      toast({
        title: "Sube una imagen",
        description: "Vuelve a intentarlo",
      });
    } else {
      getImage(data);
      toast({
        title: "Generando Rediseño",
        description: "Espere unos segundos",
      });
    }
  }
  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-12">
      <div className="flex-grow flex flex-col gap-3 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tu habitaciòn actual</CardTitle>
            <CardDescription>Sube una Imagen</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="default">
              {" "}
              <CldUploadButton
                onUpload={(result: CldUploadWidgetResults) => {
                  if (
                    result.info !== undefined &&
                    typeof result.info !== "string"
                  ) {
                    setImageURL(result.info.url);
                    setImageId(result.info.public_id);
                  }
                }}
                uploadPreset="bwiqbsmi"
              />
            </Badge>

            {imageId && (
              <CldImage
                className="mt-5"
                width="400"
                height="300"
                src={imageId}
                sizes="100vw"
                alt="Description of my image"
              />
            )}
          </CardContent>
          <CardFooter>
            <p>Mejora tu habitaciòn</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rediseña tu habitaciòn</CardTitle>
            <CardDescription>Rellena los datos</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="Prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion de tu habitan soñada</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="una habitaciòn moderna"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Descripcion para el modelo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Palabras clave</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mejor calidad, extremadamente detallado..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Complementos.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="NegativeKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caracteristicas que no quieres</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="cuerpo largo, baja resolución, mala anatomía, malas manos, dedos faltantes, dígitos extra, menos dígitos, recortado, peor calidad, baja calidad..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Caracteristicas negativas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="NumberImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero de images</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un numero" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Numero de resultados</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Rediseñar</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="flex-grow h-full">
        <Card>
          <CardHeader>
            <CardTitle>Rediseño</CardTitle>
            <CardDescription>Sugerencia:</CardDescription>
          </CardHeader>
          <CardContent>
            {images.length == 0 && (
              <>
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-muted rounded-md"></AspectRatio>
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-muted rounded-md mt-3 md:mt-6"></AspectRatio>
              </>
            )}

            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                className="rounded-md object-cover"
                alt="Image of Room"
                width={500}
                height={800}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
