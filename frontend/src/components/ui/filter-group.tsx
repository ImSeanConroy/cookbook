import CustomDropdown, { type DropdownOption } from "@/components/ui/dropdown";
import { useRecipesContext } from "../recipe-context";

interface FilterProps {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}

const FilterGroup = ({ filters }: { filters: FilterProps[] }) => {
  const { setLimit, setCurrentPage } = useRecipesContext();

  const handleSelect = (name: string, option: DropdownOption) => {
    if (name === "perPage") setLimit(Number(option.value));
    setCurrentPage(1)
  };

  return filters.map(({ label, name, options, defaultValue }) => {
    const dropdownOptions = options.map((opt) => ({
      label: opt,
      value: opt.toLowerCase().replace(/\s+/g, "-"),
    }));

    return (
      <div key={name} className="flex flex-col gap-1 dark:text-zinc-500">
        <label htmlFor={name} className="text-sm font-medium">
          {label}:
        </label>
        <CustomDropdown
          options={dropdownOptions}
          onSelect={(option) => handleSelect(name, option)}
          defaultValue={defaultValue}
        />
      </div>
    );
  });
};

export default FilterGroup;
