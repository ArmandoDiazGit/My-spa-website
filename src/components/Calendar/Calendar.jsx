import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronLeft, ChevronRight, ChevronDown, Circle } from "lucide-react";
import styles from "./Calendar.module.css";

function Calendar({ selected, onSelect }) {
  const defaultClassNames = getDefaultClassNames();
  const today = new Date();

  return (
    <DayPicker
      mode="single"
      selected={selected}
      className={styles.root}
      classNames={{
        root: `${defaultClassNames.root}`,
        months: styles.months,
        month: styles.month,
        month_grid: styles.monthGrid,
        caption_label: `${defaultClassNames.caption_label} ${styles.captionLabel}`,
        head_cell: styles.headCell,
        cell: styles.cellGridCell,
      }}
      disabled={{ before: today }}
      components={{
        DayButton: (props) => {
          const { day, modifiers, ...buttonProps } = props;
          return (
            <button
              {...buttonProps}
              className={`${styles.dayButton}${modifiers.selected ? ` ${styles.selected}` : ""} ${buttonProps.className || ""}`}
              onClick={() => onSelect?.(day.date)}
            />
          );
        },
        Chevron: ({ className, orientation, ...chevronProps }) => {
          switch (orientation) {
            case "left":
              return <ChevronLeft className={`${className} ${styles.chevron}`} {...chevronProps} />;
            case "right":
              return <ChevronRight className={`${className} ${styles.chevron}`} {...chevronProps} />;
            case "down":
              return <ChevronDown className={`${className} ${styles.chevron}`} {...chevronProps} />;
            case "up":
              return <ChevronDown className={`${className} ${styles.chevron}`} {...chevronProps} />;
            default:
              return <Circle className={`${className} ${styles.chevron}`} {...chevronProps} />;
          }
        },
      }}
    />
  );
}

export default Calendar;
