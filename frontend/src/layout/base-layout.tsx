import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return <div className="bg-background flex min-h-svh w-full items-center justify-center p-3 sm:p-4 md:p-6">
    <Outlet />
  </div>;
};

export default BaseLayout;
