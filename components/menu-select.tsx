"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { getAllMusic, getFilteredMusic } from "@/lib/api";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Menu, Music } from "@/lib/types";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function MenuSelect({
  items,
  setData,
  data,
}: {
  items: Menu[];
  data: Music[];
  setData: (arr: Music[]) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setData(await getFilteredMusic(data.items));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <>
              {items.map(({ title, label, description, values }) => (
                <FormItem key={title}>
                  <div className="mb-4">
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormDescription>{description}</FormDescription>
                  </div>
                  {values.map(({ id, label }) => (
                    <FormField
                      key={id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              ))}
            </>
          )}
        />
        <Button type="submit">Применить</Button>
      </form>
    </Form>
  );
}
