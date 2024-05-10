import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Geo } from "@/types/geo.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDrawer } from "@/state";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FlareCategorySelect } from "@/components/flare-category-select/flare-category-select";
import {
  FLARE_BODY_PLACEHOLDERS,
  FLARE_CREATE_INITIAL_VALUES,
  FLARE_CREATE_SCHEMA,
} from "@/constants/flare.constants";
import { FlareTagsField } from "@/components/flare-tags-field/flare-tags-field";
import { insertFlare } from "@/db/queries/flares.queries";
import { LoadingButton } from "@/components/ui/loading-button";

type NewPostFormProps = {
  location: Geo;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ location }) => {
  const { closeDrawer } = useDrawer();
  const { isPending, mutateAsync } = useMutation({ mutationFn: insertFlare });
  const form = useForm<z.infer<typeof FLARE_CREATE_SCHEMA>>({
    resolver: zodResolver(FLARE_CREATE_SCHEMA),
    defaultValues: {
      ...FLARE_CREATE_INITIAL_VALUES,
      lat: location.lat,
      lng: location.lng,
    },
  });
  const category = form.watch("category");

  const handleSubmit = useCallback(
    async (values: z.infer<typeof FLARE_CREATE_SCHEMA>) => {
      await mutateAsync(values);
      closeDrawer();
      toast("Flare created successfully");
    },
    [mutateAsync, closeDrawer]
  );

  const isButtonDisabled = !form.formState.isDirty || isPending;

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
        <LoadingButton loading={isPending} disabled={isButtonDisabled}>
          POST
        </LoadingButton>
      </form>
    </Form>
  );
};

export { NewPostForm };
