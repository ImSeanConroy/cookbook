import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { useRecipes } from "@/context/recipe-context";

const HomePage = () => {
  const { recipes } = useRecipes();

  return (
    <DataTable data={recipes} columns={columns} />
  );
};

export default HomePage;
