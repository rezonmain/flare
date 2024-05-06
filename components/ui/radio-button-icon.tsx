import { RadioGroupItemProps } from "@radix-ui/react-radio-group";
import React from "react";
import { Icon, IconName } from "./icon";
import { RadioGroupItem } from "./radio-group";
import { Label } from "./label";

type RadioButtonIconProps = {
  label: string;
  icon: IconName;
  description: string;
} & RadioGroupItemProps;

const RadioButtonIcon: React.FC<RadioButtonIconProps> = (props) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <RadioGroupItem
        value={props.value}
        id={props.id}
        checked={props.checked}
        onClick={props.onClick}
      />
      <Icon name={props.icon} />
      <Label htmlFor={props.id} className="flex flex-col gap-1 w-full">
        <p>{props.label}</p>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </Label>
    </div>
  );
};

export { RadioButtonIcon };
