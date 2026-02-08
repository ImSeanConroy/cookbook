import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { useRecipesContext } from "@/components/recipe-context";

const HomePage = () => {
  const { recipes } = useRecipesContext()

  return (
    <DataTable data={recipes} columns={columns} />
  );
};

export default HomePage;
