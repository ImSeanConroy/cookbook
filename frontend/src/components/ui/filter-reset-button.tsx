import { useRecipesContext } from "../recipe-context";
import { IoCloseCircleOutline } from "react-icons/io5";

const FilterResetButton = () => {
  const { query, limit, setQuery, setLimit } = useRecipesContext();

  const handleReset = () => {
    setQuery("");
    setLimit(12);
  };

  if (query == "" && limit == 12) return;

  return (
<div className="flex flex-col justify-end gap-1 dark:text-zinc-500">
  <button
    onClick={handleReset}
    className="inline-flex items-center justify-center w-fit rounded-lg cursor-pointer disabled:opacity-50 bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 text-white p-1.5"
  >
    <IoCloseCircleOutline className="text-white text-2xl m-1" />
  </button>
</div>

  );
};

export default FilterResetButton;
