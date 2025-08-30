import Button from "@/components/ui/button";
import RecipeGrid from "@/components/ui/recipe-grid";
import RecipeHeader from "@/components/ui/recipe-header";
import Searchbar from "@/components/ui/searchbar";
import PageNumbers from "@/components/ui/page-number";
import { useRecipesContext } from "@/components/recipe-context";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { InfoMessage } from "@/components/ui/info-message";
import FilterSection from "@/components/ui/filter-section";

const HomePage = () => {
  const {
    recipes,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    totalResults,
  } = useRecipesContext();

  const handlePageClick = (page: number) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6">
      <RecipeHeader>
        <h1 className="text-4xl sm:text-5xl font-semibold pb-5 dark:text-white">
          All your <span className="text-lime-500">recipes</span> in one place
        </h1>
        <Searchbar />
      </RecipeHeader>

      <FilterSection />

      {isLoading && (
        <InfoMessage
          title="Loading Recipes, Please Wait..."
          message="Fetching the latest recipes for you."
        />
      )}

      {error && (
        <InfoMessage
          title="Oops! Something went wrong while fetching recipes."
          message={error || "Please try again later."}
        />
      )}

      {!isLoading && !error && recipes.length === 0 && (
        <InfoMessage
          title="No recipes found."
          message="Try adjusting your search or filters to discover new recipes."
        />
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <RecipeGrid recipes={recipes} />
      )}

      <div className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex flex-col md:flex-row gap-5 items-center md:justify-between">
        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl hidden md:block">
          <p className="text-white text-sm p-3 px-5">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
            <span className="font-semibold pl-8">{totalResults}</span> Results
          </p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoChevronBackOutline />
            Previous
          </Button>
          <PageNumbers
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageClick}
          />
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <IoChevronForwardOutline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
