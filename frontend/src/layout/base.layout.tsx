import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center py-6 px-16">
        <p className="font-semibold text-3xl">Cookbook</p>
        <div className="bg-zinc-100 rounded-3xl w-[450px]">
          <p className="p-3 px-5">Search</p>
        </div>
      </div>
      <Outlet />
      <div className="flex flex-col gap-10 py-10 pb-14 px-16">
      <div className="px-10 py-10 bg-zinc-900 rounded-3xl h-[100px] flex flex-col justify-center">
        <p className="text-white">Footer Placeholder</p>
      </div>
      </div>
    </>
  );
};

export default BaseLayout;
