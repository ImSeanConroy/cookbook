const RecipeHeader = ({ title }: { title: string }) => (
  <div className="px-10 py-10 bg-zinc-100 rounded-3xl h-[350px] flex flex-col justify-end">
    <div>
      <p>Let's Cook</p>
      <h1 className="text-5xl font-semibold">{title}</h1>
    </div>
  </div>
);

export default RecipeHeader;
