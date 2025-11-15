const UtensilsList = ({ utensils }: { utensils: string[] }) => (
  <div className="gap-6 items-center bg-zinc-100 dark:bg-zinc-900 px-4 py-3 md:px-6 md:py-5 rounded-2xl">
    <h2 className="text-xl mb-3 font-semibold dark:text-white">Utensils</h2>
    <ul className="columns-1 md:columns-2 lg:columns-1 xl:columns-2 gap-4">
      {utensils.map((utensil, i) => (
        <li key={i} className="pb-1 text-zinc-700 dark:text-zinc-500">
          {utensil}
        </li>
      ))}
    </ul>
  </div>
);

export default UtensilsList;
