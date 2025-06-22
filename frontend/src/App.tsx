import { BsArrowLeft } from "react-icons/bs";

const App = () => {
const recipe = {
  name: "lorem ipsum dolor",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  ingredients: [
    "300g lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    "30g consectetur adipiscing elit",
    "30ml sticky vegan sauce (lorem page 169)",
    "100g sed do eiusmod tempor",
    "a pinch of incididunt ut labore",
    "310ml dolore magna aliqua",
    "2 teaspoons lorem shichimi powder",
  ],
  image:
    "https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg?_gl=1*dk80l6*_ga*MTgxMDA3NDYxNS4xNzUwNjAyMDUw*_ga_8JE65Q40S6*czE3NTA2MDIwNDkkbzEkZzEkdDE3NTA2MDIzMjkkajQyJGwwJGgw",
  steps: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec velit eu nulla hendrerit vehicula. lorem ipsum dolor sit amet",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
  ],
};


  return (
    <div>
      <div className="absolute bottom-12 left-10 border p-2.5 rounded-sm cursor-pointer hover:bg-zinc-800 hover:text-zinc-50">
        <BsArrowLeft className="text-2xl" />
      </div>
      <div className="grid min-h-svh lg:grid-cols-5">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex flex-1 items-center justify-center p-6 pb-8 md:p-10 md:pb-12">
            <div className="w-full h-full max-w-x flex flex-col justify-between">
              <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold flex-1">{recipe.name}</h1>
                <h2 className="w-[325px] leading-6 underline underline-offset-6 decoration-dotted">
                  {recipe.description}
                </h2>
              </div>
              <div className="grid lg:grid-cols-6 gap-6">
                <div className="col-span-2">
                  <div className="text-sm font-light flex flex-col gap-2">
                    {recipe.ingredients.map((ingredient) => (
                      <p>{ingredient}</p>
                    ))}
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="text-sm font-light flex flex-col gap-4">
                    {recipe.steps.map((step) => (
                      <p>{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-muted bg-amber-600 relative hidden lg:block">
          <img
            src={recipe.image}
            alt={recipe.name + "Image"}
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
