import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { useRecipes } from "@/context/recipe-context";
import RecipeModel from "@/components/other/recipe-modal";

const HomePage = () => {
  const { recipes } = useRecipes();

  return (
    <>
      <RecipeModel />
      <DataTable data={recipes} columns={columns} />
    </>
  );
};

export default HomePage;
