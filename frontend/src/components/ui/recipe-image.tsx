const RecipeImage = ({ image }: { image: string }) => {
  return (
    <div
      className="px-10 py-10 bg-neutral-100 rounded-2xl h-[350px] flex flex-col justify-end bg-cover bg-center"
      style={{
        backgroundImage: `url('${image}')`,
      }}
    />
  );
};

export default RecipeImage;
