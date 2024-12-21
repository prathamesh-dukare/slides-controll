import * as React from "react";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "./ui/Command";

export const controllerTypes = [
  {
    value: "buttons",
    label: "Buttons",
  },
  {
    value: "sliders",
    label: "Sliders",
  },
];

export function ControllerCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? controllerTypes.find(
                (controllerType) => controllerType.value === value
              )?.label
            : "Select controller type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Find controller" />
          <CommandList>
            <CommandEmpty>No controller type found.</CommandEmpty>
            <CommandGroup>
              {controllerTypes.map((controllerType) => (
                <CommandItem
                  key={controllerType.value}
                  value={controllerType.value}
                  onSelect={(currentValue) => {
                    console.log("currentValue", currentValue);
                    console.log("value", value);
                    onChange(currentValue === value ? value : currentValue);
                    setOpen(false);
                  }}
                >
                  {controllerType.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === controllerType.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
