"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./Button";

const controllerTypes = [
  {
    value: "buttons",
    label: "Buttons",
  },
  {
    value: "sliders",
    label: "Sliders",
  },
];

export function ControllerCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(controllerTypes[0].value);

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
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No controller type found.</CommandEmpty>
            <CommandGroup>
              {controllerTypes.map((controllerType) => (
                <CommandItem
                  key={controllerType.value}
                  value={controllerType.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
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
