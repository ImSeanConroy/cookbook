import RecipeGrid from "@/components/ui/recipe-grid";
import Button from "@/components/ui/button";
import { config } from "@/config";
import type { RecipeSummary } from "@/types/recipe";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    setIsLoading(true);

    fetch(`${config.BASE_URL}/api/recipe?page=${currentPage}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((json) => {
        setRecipes(json.recipes);
        setTotalPages(json.totalPages || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      const isCurrent = i === currentPage;
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={isCurrent}
          className={`bg-zinc-800 ${
            isCurrent ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-500"
          }`}
        >
          {i}
        </Button>
      );
    }

    return pages;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="p-6 lg:p-8 bg-zinc-100 rounded-2xl h-[450px] flex flex-col justify-center">
        <p className="text-zinc-500">Let's Cook</p>
        <h1 className="text-4xl sm:text-5xl font-semibold pb-5">
          All your <span className="text-lime-500">recipes</span> in one place
        </h1>
        <input
          placeholder="Search..."
          className="bg-white rounded-xl text-md px-4 py-3 w-1/2"
        />
      </div>

      {/* Recipe Filters */}
      <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col md:flex-row gap-5 justify-between">
        <div className="flex flex-row gap-5">
          <Button variant="secondary">See Complete Recipe</Button>
          <Button variant="secondary">See Complete Recipe</Button>
          <Button variant="secondary">See Complete Recipe</Button>
        </div>
        <div className="flex flex-row gap-5">
          <Button variant="secondary">See Complete Recipe</Button>
          <Button variant="secondary">See Complete Recipe</Button>
        </div>
      </div>

      {/* Recipe Grid */}
      <RecipeGrid recipes={recipes} />

      {/* Pagination Controls */}
      <div className="p-5 bg-zinc-100 rounded-2xl flex flex-col md:flex-row gap-5 items-center md:justify-between">
        <div className="bg-zinc-900 rounded-xl hidden md:block">
          <p className="text-white text-sm p-3 px-5">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </Button>
          <div className="flex gap-2">{renderPageNumbers()}</div>
          <Button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
