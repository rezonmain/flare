import { z } from "zod";
import { IconName } from "@/components/ui/icon";
import { FlareCategory } from "./flare.enums";

const FLARE_ID_LENGTH = 8;
const FLARE_BODY_MAX_LENGTH = 2048;
const FLARE_CATEGORY_LABELS = {
  [FlareCategory.CHECK_IN]: "Check-in",
  [FlareCategory.DISCUSSION]: "Discussion",
  [FlareCategory.EVENT]: "Event",
  [FlareCategory.INFORMATION]: "Information",
  [FlareCategory.SELL]: "Sell",
};
const FLARE_BODY_PLACEHOLDERS = {
  [FlareCategory.CHECK_IN]: "Whats happening around you?",
  [FlareCategory.DISCUSSION]: "Ask people around you for help.",
  [FlareCategory.EVENT]: "What event are you hosting?",
  [FlareCategory.INFORMATION]: "Whats happening around you?",
  [FlareCategory.SELL]: "What are you selling?",
};
const FLARE_CATEGORY_ICONS: Record<FlareCategory, IconName> = {
  [FlareCategory.CHECK_IN]: "map-pin",
  [FlareCategory.DISCUSSION]: "message-circle-question",
  [FlareCategory.EVENT]: "flag",
  [FlareCategory.INFORMATION]: "message-circle-warning",
  [FlareCategory.SELL]: "money",
};
const FLARE_CATEGORY_DESCRIPTIONS = {
  [FlareCategory.CHECK_IN]: "Check-in to a location",
  [FlareCategory.DISCUSSION]: "Ask for help",
  [FlareCategory.EVENT]: "Share news about an event you're hosting",
  [FlareCategory.INFORMATION]: "Provide information about something near you",
  [FlareCategory.SELL]: "Promote or sell something",
};
const FLARE_CATEGORY_CLASSNAMES = {
  [FlareCategory.CHECK_IN]: "fill-red-500",
  [FlareCategory.DISCUSSION]: "fill-blue-500",
  [FlareCategory.EVENT]: "fill-yellow-500",
  [FlareCategory.INFORMATION]: "fill-purple-500",
  [FlareCategory.SELL]: "fill-green-500",
};

const FLARE_CREATE_SCHEMA = z.object({
  body: z.string().min(1).max(256),
  tags: z.array(z.string().min(1).max(64)),
  category: z.nativeEnum(FlareCategory),
  image: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
});

const FLARE_CREATE_INITIAL_VALUES = {
  body: "",
  tags: [],
  category: FlareCategory.CHECK_IN,
};

export {
  FLARE_ID_LENGTH,
  FLARE_BODY_MAX_LENGTH,
  FLARE_CATEGORY_LABELS,
  FLARE_BODY_PLACEHOLDERS,
  FLARE_CATEGORY_ICONS,
  FLARE_CATEGORY_DESCRIPTIONS,
  FLARE_CREATE_SCHEMA,
  FLARE_CREATE_INITIAL_VALUES,
  FLARE_CATEGORY_CLASSNAMES,
};
