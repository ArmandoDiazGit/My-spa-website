import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronLeft, ChevronRight, ChevronDown, Circle } from "lucide-react";
import { useState } from "react";

function Calendar({ showDate }) {
  const [selected, setSelected] = useState(null);

  const defaultClassNames = getDefaultClassNames();
  const today = new Date();

  function handleDayClick() {
    setSelected(selected);
  }

  showDate(selected);

  return (
    <DayPicker
      mode="single"
      onSelect={handleDayClick}
      selected={selected}
      classNames={{
        selected: `text-white`,
        root: `${defaultClassNames.root} shadow-lg p-5`,
        day: `group  w-10 h-10 rounded-full ${defaultClassNames.day}`,
        caption_label: `text-base`,
      }}
      disabled={{ before: today }}
      components={{
        DayButton: (props) => {
          const { day, ...buttonProps } = props;
          return (
            <button
              {...buttonProps}
              className="bg-zinc-200 w-10 h-10 m-1 group-aria-selected:bg-[#8B9D83] rounded-full"
              onClick={() => setSelected(day.date)}
            />
          );
        },
        Chevron: ({ className, orientation, ...chevronProps }) => {
          switch (orientation) {
            case "left":
              return (
                <ChevronLeft
                  className={`${className} w-4 h-4 fill-[#8B9D83]`}
                  {...chevronProps}
                />
              );
            case "right":
              return (
                <ChevronRight
                  className={`${className} w-4 h-4 fill-[#8B9D83]`}
                  {...chevronProps}
                />
              );
            case "down":
              return (
                <ChevronDown
                  className={`${className} w-4 h-4 fill-[#8B9D83]`}
                  {...chevronProps}
                />
              );
            case "up":
              return (
                <ChevronDown
                  className={`${className} w-4 h-4 fill-[#8B9D83]`}
                  {...chevronProps}
                />
              );
            default:
              return (
                <Circle className={`${className} w-4 h-4 fill-[#8B9D83]`} />
              );
          }
        },
      }}
    />
  );
}

export default Calendar;
