import Button from "@/components/ui/button";
import RecipeGrid from "@/components/ui/recipe-grid";
import RecipeHeader from "@/components/ui/recipe-header";
import Searchbar from "@/components/ui/searchbar";
import { recipeFilters, sortOptions } from "@/constants/filters";
import FilterGroup from "@/components/ui/filter-group";
import PageNumbers from "@/components/ui/page-number";
import { useRecipesContext } from "@/components/recipe-context";

const HomePage = () => {
  const {
    recipes,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
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

      <div className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        <FilterGroup filters={recipeFilters} />
        <div className="hidden xl:block" />
        <FilterGroup filters={sortOptions} />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && recipes.length === 0 && <p>No recipes found.</p>}
      {!isLoading && !error && recipes.length > 0 && (
        <RecipeGrid recipes={recipes} />
      )}

      <div className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex flex-col md:flex-row gap-5 items-center md:justify-between">
        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl hidden md:block">
          <p className="text-white text-sm p-3 px-5">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
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
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
