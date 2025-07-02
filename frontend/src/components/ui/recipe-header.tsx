const RecipeHeader = ({ title }: { title: string }) => {
  const words = title.trim().split(" ");
  const highlightIndex = words.length >= 2 ? words.length - 2 : -1;

  return (
    <header className="p-8 md:p-10 bg-zinc-100 rounded-3xl h-[450px] flex flex-col justify-end">
      <div>
        <p className="text-zinc-500">Let’s Cook</p>
        <h1 className="text-4xl sm:text-5xl font-semibold">
          {words.map((word, index) => (
            <span
              key={index}
              className={index === highlightIndex ? "text-lime-500" : ""}
            >
              {word + " "}
            </span>
          ))}
        </h1>
      </div>
    </header>
  );
};

export default RecipeHeader;
