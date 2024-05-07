import { z } from "zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FlareCategory } from "@/constants/flare.enums";
import { Geo } from "@/types/geo.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FlareCategorySelect } from "../flare-category-select/flare-category-select";
import { FLARE_BODY_PLACEHOLDERS } from "@/constants/flare.constants";
import { FlareTagsField } from "../flare-tags-field/flare-tags-field";

type NewPostFormProps = {
  location: Geo;
};

const newFlareSchema = z.object({
  body: z.string().min(1).max(256),
  tags: z.array(z.string().min(1).max(64)),
  category: z.nativeEnum(FlareCategory),
  location: z.object({ lat: z.number(), lng: z.number() }),
});

const NewPostForm: React.FC<NewPostFormProps> = ({ location }) => {
  const form = useForm<z.infer<typeof newFlareSchema>>({
    resolver: zodResolver(newFlareSchema),
    defaultValues: {
      body: "",
      tags: [],
      category: FlareCategory.CHECK_IN,
      location,
    },
  });

  const handleSubmit = useCallback((values: z.infer<typeof newFlareSchema>) => {
    console.info(values);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormControl>
                <FlareCategorySelect
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormControl>
                <FlareTagsField value={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={
                    FLARE_BODY_PLACEHOLDERS[form.getValues().category]
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export { NewPostForm };
