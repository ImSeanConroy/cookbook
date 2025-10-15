import CustomDropdown, { type DropdownOption } from "@/components/ui/dropdown";
import { useRecipesContext } from "@/components/recipe-context";
import type { FilterProps } from "@/types/filter";

const FilterGroup = ({ filters }: { filters: FilterProps[] }) => {
  const { filters: currentFilters, setFilters, setCurrentPage } = useRecipesContext();

  const handleSelect = (name: string, option: DropdownOption) => {
    const value = name === "limit" ? Number(option.value) : option.value;
    setFilters({ ...currentFilters, [name]: value });
    setCurrentPage(1);
  };

  return filters.map(({ label, name, options, defaultValue }) => (
    <div key={name} className="flex flex-col gap-1 dark:text-zinc-500">
      <label htmlFor={name} className="text-sm font-medium">
        {label}:
      </label>
      <CustomDropdown
        options={options}
        onSelect={(option) => handleSelect(name, option)}
        defaultValue={defaultValue}
        value={currentFilters[name]}
      />
    </div>
  ));
};

export default FilterGroup;
