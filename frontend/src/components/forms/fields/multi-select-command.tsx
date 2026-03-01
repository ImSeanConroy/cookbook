import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

type SelectOption = {
  label: string;
  value: string;
};

type MultiSelectCommandProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
};

const MultiSelectCommand = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: MultiSelectCommandProps) => {
  const selectedValues = new Set(value);
  const selectedLabels = options
    .filter((option) => selectedValues.has(option.value))
    .map((option) => option.label);

  const buttonLabel =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
        ? selectedLabels.join(", ")
        : `${selectedLabels.length} selected`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          <span className="truncate">{buttonLabel}</span>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-70 p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newValues = new Set(selectedValues);

                      if (isSelected) {
                        newValues.delete(option.value);
                      } else {
                        newValues.add(option.value);
                      }

                      onChange(Array.from(newValues));
                    }}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible",
                      )}
                    >
                      <Check className="text-primary-foreground size-3.5" />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {value.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onChange([])}
                    className="justify-center text-center cursor-pointer"
                  >
                    Clear all
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectCommand;
