import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { FormFieldProps } from "@/components/Field/Field.types";
import { Matcher } from "react-day-picker";

const FormFieldItem = ({
  item,
  value,
  onChange,
  className,
}: {
  item: FormFieldProps;
  value?: string | Matcher | Matcher[] | number | Date;
  onChange: (value: never) => void;
  className?: string;
}) => {
  console.log(item);
  const renderUIComponent = (item: FormFieldProps) => {
    switch (item.type) {
      case "text":
      case "password":
        return (
          <FormControl>
            <Input
              type={item.type}
              {...item}
              onChange={onChange}
              value={value?.toString() || ""}
              placeholder={item.placeholder}
              className={className}
            />
          </FormControl>
        );
      case "select":
        return (
          <Select onValueChange={onChange} value={value?.toString()}>
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={item.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {item.options?.map((option: { value: string; label: string }) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        const checked = /true/.test(value?.toString() as string);
        return (
          <FormControl>
            <Checkbox onCheckedChange={onChange} checked={checked} />
          </FormControl>
        );
      default:
        return null;
    }
  };
  return (
    <FormItem
      className={cn(
        item.type === "checkbox" ? "flex gap-4 items-center p-0" : "relative",
        item.className,
      )}
    >
      {item.label && (
        <FormLabel
          className={cn(
            "text-xs font-semibold px-[6px] text-primary-gray",
            item.labelStyle,
          )}
        >
          {item.label}
        </FormLabel>
      )}
      {renderUIComponent(item)}
      <FormMessage />
    </FormItem>
  );
};

export default FormFieldItem;
