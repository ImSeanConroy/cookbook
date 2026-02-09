import { Outlet } from "react-router-dom";

import Header from "@/components/navigation/header";
import { RecipesProvider } from "@/context/recipe-context";

const BaseLayout = () => {
  return (
    <RecipesProvider>
      <div className="flex flex-col px-5 md:px-10 lg:px-16 py-5 md:pt-8 md:pb-16 gap-5 md:gap-6 max-w-[1600px] mx-auto">
        <Header />
        <Outlet />
      </div>
    </RecipesProvider>
  );
};

export default BaseLayout;
