import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Select.module.css";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({ children, className, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={`${styles.trigger} ${className || ""}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className={styles.chevron} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ children, className, position, ...props }) {
  return (
    <SelectPrimitive.Portal>
    <SelectPrimitive.Content
        className={`${styles.content} ${
          position === "popper" ? styles.contentPopper : ""
        } ${className || ""}`}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={styles.viewport}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ children, className, ...props }) {
  return (
    <SelectPrimitive.Item
      className={`${styles.item} ${className || ""}`}
      {...props}
    >
      <span className={styles.indicator}>
        <SelectPrimitive.ItemIndicator>
          <Check className={styles.checkIcon} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
