import CustomDropdown from "@/components/ui/dropdown";

interface FilterProps {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}

const FilterGroup = ({ filters }: { filters: FilterProps[] }) => {
  return filters.map(({ label, name, options, defaultValue }) => {
    const dropdownOptions = options.map((opt) => ({
      label: opt,
      value: opt.toLowerCase().replace(/\s+/g, "-"),
    }));

    return (
      <div key={name} className="flex flex-col gap-1">
        <label htmlFor={name} className="text-sm font-medium">
          {label}:
        </label>
        <CustomDropdown
          options={dropdownOptions}
          onSelect={() => console.log("")}
          defaultValue={defaultValue}
        />
      </div>
    );
  });
};

export default FilterGroup;
