
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { tasks } from "@/components/table/tasks";

const HomePage = () => {
  return (
    <DataTable data={tasks} columns={columns} />
  );
};

export default HomePage;
