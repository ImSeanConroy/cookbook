const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center py-6">
      <p className="font-semibold text-3xl">Cookbook</p>
      <div className="bg-zinc-100 rounded-3xl w-[450px]">
        <p className="p-3 px-5">Search</p>
      </div>
    </div>
  );
};

export default Header;
