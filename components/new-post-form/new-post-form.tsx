import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Geo } from "@/types/geo.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FlareCategorySelect } from "@/components/flare-category-select/flare-category-select";
import {
  FLARE_BODY_PLACEHOLDERS,
  FLARE_CATEGORY_LABELS,
  FLARE_CREATE_INITIAL_VALUES,
  FLARE_CREATE_SCHEMA,
} from "@/constants/flare.constants";
import { FlareTagsField } from "@/components/flare-tags-field/flare-tags-field";
import { insertFlare } from "@/db/queries/flares.queries";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "../ui/loading-button";
import { useDrawer, useSheet } from "@/state";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import type { FlareCategory } from "@/constants/flare.enums";

type NewPostFormProps = {
  location: Geo;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ location }) => {
  const { openSheet } = useSheet();
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

  const handleCategoryClick = useCallback(
    (value: FlareCategory, onChange: () => void) =>
      openSheet({
        component: <FlareCategorySelect value={value} onChange={onChange} />,
        name: "category-select",
      }),
    [openSheet]
  );

  const handleTagsClick = useCallback(
    (value: string[], onChange: () => void) =>
      openSheet({
        component: <FlareTagsField value={value} onChange={onChange} />,
        name: "category-select",
      }),
    [openSheet]
  );

  const handleSubmit = useCallback(
    async (values: z.infer<typeof FLARE_CREATE_SCHEMA>) => {
      await mutateAsync(values);
      // closeDrawer();
      toast("Flare created successfully");
    },
    [mutateAsync]
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
                <Badge
                  className="flex gap-4 items-center"
                  onClick={() =>
                    handleCategoryClick(field.value, field.onChange)
                  }
                >
                  <p>Category: {FLARE_CATEGORY_LABELS[field.value]}</p>
                  <ChevronDown size="24px" />
                </Badge>
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormControl>
                <Badge
                  className="flex gap-4 items-center"
                  onClick={() => handleTagsClick(field.value, field.onChange)}
                >
                  <p className="truncate max-w-20">
                    Tags: {field.value.map((tag) => `#${tag}`).join(" ")}
                  </p>
                  <ChevronDown size="24px" />
                </Badge>
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
