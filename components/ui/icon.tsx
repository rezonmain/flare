import {
  DollarSign,
  FlagIcon,
  MapPinIcon,
  MessageCircleQuestion,
  MessageCircleWarning,
  PenLineIcon,
  SparklesIcon,
  User,
} from "lucide-react";
import React, { createElement } from "react";

const icons = {
  "map-pin": MapPinIcon,
  sparkles: SparklesIcon,
  user: User,
  "pen-line": PenLineIcon,
  money: DollarSign,
  "message-circle-warning": MessageCircleWarning,
  "message-circle-question": MessageCircleQuestion,
  flag: FlagIcon,
} as const;

type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
} & React.ComponentProps<typeof User>;

const Icon = ({ name, ...props }: IconProps) =>
  createElement(icons[name], props);

export { Icon, type IconName };
