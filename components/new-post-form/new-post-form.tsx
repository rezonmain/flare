import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Geo } from "@/types/geo.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FlareCategorySelect } from "../flare-category-select/flare-category-select";
import {
  FLARE_BODY_PLACEHOLDERS,
  FLARE_CREATE_INITIAL_VALUES,
  FLARE_CREATE_SCHEMA,
} from "@/constants/flare.constants";
import { FlareTagsField } from "../flare-tags-field/flare-tags-field";
import { Button } from "../ui/button";
import { insertFlare } from "@/db/queries/flares.queries";

type NewPostFormProps = {
  location: Geo;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ location }) => {
  const form = useForm<z.infer<typeof FLARE_CREATE_SCHEMA>>({
    resolver: zodResolver(FLARE_CREATE_SCHEMA),
    defaultValues: { ...FLARE_CREATE_INITIAL_VALUES, location },
  });
  const category = form.watch("category");

  const handleSubmit = useCallback(
    async (values: z.infer<typeof FLARE_CREATE_SCHEMA>) => {
      await insertFlare(values);
    },
    []
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8"
      >
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
                  placeholder={FLARE_BODY_PLACEHOLDERS[category]}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isDirty}>POST</Button>
      </form>
    </Form>
  );
};

export { NewPostForm };
