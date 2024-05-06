import { IconName } from "@/components/ui/icon";
import { FlareCategory } from "./flare.enums";

const FLARE_ID_LENGTH = 8;
const FLARE_BODY_MAX_LENGTH = 2048;
const FLARE_CATEGORY_LABELS = {
  [FlareCategory.CHECK_IN]: "Check-in",
  [FlareCategory.DISCUSSION]: "Help",
  [FlareCategory.EVENT]: "News",
  [FlareCategory.INFORMATION]: "Question",
  [FlareCategory.SELL]: "Promotion",
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
  [FlareCategory.DISCUSSION]: "sparkles",
  [FlareCategory.EVENT]: "pen-line",
  [FlareCategory.INFORMATION]: "pen-line",
  [FlareCategory.SELL]: "user",
};
const FLARE_CATEGORY_DESCRIPTIONS = {
  [FlareCategory.CHECK_IN]: "Check-in to a location",
  [FlareCategory.DISCUSSION]: "Ask for help",
  [FlareCategory.EVENT]: "Share news",
  [FlareCategory.INFORMATION]: "Ask a question",
  [FlareCategory.SELL]: "Promote something",
};

export {
  FLARE_ID_LENGTH,
  FLARE_BODY_MAX_LENGTH,
  FLARE_CATEGORY_LABELS,
  FLARE_BODY_PLACEHOLDERS,
  FLARE_CATEGORY_ICONS,
  FLARE_CATEGORY_DESCRIPTIONS,
};
