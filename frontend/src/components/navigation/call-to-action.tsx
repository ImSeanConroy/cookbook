const CallToAction = () => {
  return (
    <div
      className="mt-6 p-6 rounded-2xl flex flex-col bg-cover bg-center justify-center"
      style={{
        backgroundImage: "url('/img/cta.png')",
      }}
    >
      <div className="bg-white dark:bg-zinc-900 bg-opacity-90 p-6 rounded-xl w-full sm:w-1/2 xl:w-2/5">
        <h2 className="text-3xl md:text-4xl mb-2 font-semibold dark:text-white">
          Share your <span className="text-lime-500">Favourite</span> Recipes
        </h2>
        <p className="text-md md:text-lg text-zinc-500 py-2 pb-5">
          Have a delicious recipe that everyone should try? Submit it today and
          inspire the foodie community with your culinary creations!
        </p>
        <a
          href="mailto:cookbook@imseanconroy.co.uk?subject=Cookbook%20-%20Recipe%20Submission"
          className="px-6 py-3 rounded-xl cursor-pointer text-md bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 text-white inline-block"
        >
          Submit Recipe
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
