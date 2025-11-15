import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecipesContext } from "@/components/recipe-context";

const Searchbar = ({ redirect }: { redirect?: string }) => {
  const { query, setQuery } = useRecipesContext();
  const [inputValue, setInputValue] = useState(query);
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setQuery(trimmed);

    if (redirect) {
      navigate(redirect)
      setInputValue("")
    }
  };

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return (
    <div className="flex flex-row focus-within:ring-2 focus-within:ring-zinc-800 dark:focus-within:ring-zinc-700 rounded-lg">
      <input
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="bg-zinc-100 dark:bg-zinc-900 dark:text-white rounded-l-lg px-4 py-2 w-full focus:outline-none"
      />
      <div
        onClick={handleSearch}
        className="bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700 hover:bg-zinc-800 hover:text-white rounded-r-lg px-1 py-2 flex items-center justify-center cursor-pointer"
      >
        <IoIosSearch className="text-xl mx-1" />
      </div>
    </div>
  );
};

export default Searchbar;
