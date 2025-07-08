import { IoIosSearch } from "react-icons/io";

const Searchbar = () => {
  return (
    <div className="flex flex-row ">
      <input
        placeholder="Search..."
        className="bg-zinc-100 dark:bg-zinc-900 dark:text-white rounded-l-lg text-md px-4 py-3 w-full focus:outline-none"
      />
      <div className="bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700 hover:bg-zinc-200 rounded-r-xl p-3 flex items-center justify-center cursor-pointer">
        <IoIosSearch className="text-2xl mx-1" />
      </div>
    </div>
  );
};

export default Searchbar;
