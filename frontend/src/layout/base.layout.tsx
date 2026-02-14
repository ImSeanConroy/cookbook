import { Outlet } from "react-router-dom";
import { RecipesProvider } from "@/context/recipe-context";
import Header from "@/components/navigation/header";

const BaseLayout = () => {
  return (
    <RecipesProvider>
      <div className="border bg-background m-4 rounded-xl overflow-x-clip">
        <div className="flex flex-col px-5 md:px-10 lg:px-10 py-5 md:pt-8 pb-10 gap-5 md:gap-6 max-w-[1600px] mx-auto">
          <Header />
          <Outlet />
        </div>
      </div>
    </RecipesProvider>
  );
};

export default BaseLayout;
