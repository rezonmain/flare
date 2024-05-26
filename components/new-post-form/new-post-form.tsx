import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { nil } from "@rezonmain/utils-nil";
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
import { ImagePicker } from "@/components/image-picker/image-picker";

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
      const formData = new FormData();
      formData.append("body", values.body);
      formData.append("category", values.category);
      formData.append("lat", String(values.lat));
      formData.append("lng", String(values.lng));
      values.tags.forEach((tag) => formData.append("tags[]", tag));
      if (values.image) {
        formData.append("image", values.image);
      }

      const result = await mutateAsync(formData);
      if (!nil(result?.errors)) {
        toast.error("Something went wrong while creating the flare");
        return;
      }
      closeDrawer();
      toast.success("Flare created successfully");
    },
    [closeDrawer, mutateAsync]
  );

  const isButtonDisabled = !form.formState.isDirty || isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex gap-3 items-center">
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
        <div className="flex flex-col gap-3">
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormControl>
                <ImagePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </div>

        <LoadingButton loading={isPending} disabled={isButtonDisabled}>
          POST
        </LoadingButton>
      </form>
    </Form>
  );
};

export { NewPostForm };
