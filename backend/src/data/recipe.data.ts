import { RecipeInput } from "../common/interface/recipe.interface";

export const recipes: RecipeInput[] = [
  {
    title: "Classic Spaghetti Bolognese",
    description:
      "Traditional Italian pasta with a savory, slow-simmered meat and tomato sauce.",
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: "intermediate",
    cuisine: "Italian",
    image_url: "https://example.com/spaghetti.jpg",
    ingredients: [
      { name: "Spaghetti", quantity: "200g" },
      { name: "Ground Beef", quantity: "300g" },
      { name: "Tomato Sauce", quantity: "1 cup" },
      { name: "Onion", quantity: "1, finely chopped" },
      { name: "Garlic", quantity: "2 cloves, minced" },
    ],
    steps: [
      "Cook the spaghetti according to package instructions; drain and set aside.",
      "Sauté the onion and garlic in a pan until soft and fragrant.",
      "Add the ground beef and cook until browned.",
      "Pour in the tomato sauce, stir well, and simmer for 15 minutes.",
      "Serve the sauce over the cooked spaghetti.",
    ],
  },
  {
    title: "Fluffy Buttermilk Pancakes",
    description:
      "Light, airy pancakes that are perfect for a comforting breakfast or brunch.",
    prep_time: 10,
    cook_time: 15,
    servings: 2,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/pancakes.jpg",
    ingredients: [
      { name: "Flour", quantity: "1 cup" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Egg", quantity: "1" },
      { name: "Baking Powder", quantity: "1 tbsp" },
      { name: "Salt", quantity: "1/2 tsp" },
    ],
    steps: [
      "In a bowl, whisk together the flour, baking powder, and salt.",
      "Add milk and the egg; whisk until smooth.",
      "Heat a lightly oiled skillet over medium heat.",
      "Pour in batter; flip when bubbles form on the surface.",
      "Cook until golden brown. Serve warm with syrup or fruit.",
    ],
  },
  {
    title: "Authentic Indian Chicken Curry",
    description:
      "Tender chicken simmered in a richly spiced onion and tomato curry base.",
    prep_time: 20,
    cook_time: 40,
    servings: 4,
    difficulty: "advanced",
    cuisine: "Indian",
    image_url: "https://example.com/chickencurry.jpg",
    ingredients: [
      { name: "Chicken", quantity: "500g, cut into pieces" },
      { name: "Onion", quantity: "2, thinly sliced" },
      { name: "Tomato", quantity: "2, chopped" },
      { name: "Garlic", quantity: "4 cloves, minced" },
      { name: "Curry Powder", quantity: "2 tbsp" },
    ],
    steps: [
      "Heat oil in a pan and sauté onions, garlic, and tomatoes until soft.",
      "Stir in curry powder and cook for 2 minutes to release flavors.",
      "Add chicken and sear until browned on all sides.",
      "Add water, cover, and simmer for 25–30 minutes or until fully cooked.",
      "Serve hot with rice or naan bread.",
    ],
  },
  {
    title: "Vegetarian Maki Sushi Rolls",
    description:
      "Simple and fresh sushi rolls filled with seasoned rice, avocado, and cucumber.",
    prep_time: 25,
    cook_time: 15,
    servings: 2,
    difficulty: "advanced",
    cuisine: "Japanese",
    image_url: "https://example.com/sushi.jpg",
    ingredients: [
      { name: "Sushi Rice", quantity: "1 cup" },
      { name: "Nori Sheets", quantity: "2" },
      { name: "Cucumber", quantity: "1, julienned" },
      { name: "Avocado", quantity: "1, sliced" },
      { name: "Rice Vinegar", quantity: "2 tbsp" },
    ],
    steps: [
      "Cook the rice and season with rice vinegar.",
      "Place a sheet of nori on a bamboo mat and spread rice evenly.",
      "Add cucumber and avocado along the center.",
      "Roll tightly using the mat and slice into bite-sized pieces.",
      "Serve with soy sauce, wasabi, and pickled ginger.",
    ],
  },
  {
    title: "Seasoned Beef Tacos",
    description:
      "Crispy taco shells filled with spiced ground beef, lettuce, and shredded cheese.",
    prep_time: 10,
    cook_time: 20,
    servings: 4,
    difficulty: "beginner",
    cuisine: "Mexican",
    image_url: "https://example.com/tacos.jpg",
    ingredients: [
      { name: "Taco Shells", quantity: "8" },
      { name: "Ground Beef", quantity: "300g" },
      { name: "Taco Seasoning", quantity: "2 tbsp" },
      { name: "Lettuce", quantity: "1 cup, shredded" },
      { name: "Cheddar Cheese", quantity: "1/2 cup, grated" },
    ],
    steps: [
      "Cook the ground beef in a skillet until browned.",
      "Stir in taco seasoning and a splash of water; simmer for 5 minutes.",
      "Warm taco shells in the oven or microwave.",
      "Fill each shell with beef, lettuce, and cheese.",
      "Serve with salsa, sour cream, or guacamole.",
    ],
  },
  {
    title: "Crisp Caesar Salad",
    description:
      "Classic Caesar salad with crunchy croutons and creamy dressing.",
    prep_time: 15,
    cook_time: 0,
    servings: 2,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/caesar.jpg",
    ingredients: [
      { name: "Romaine Lettuce", quantity: "1 head, chopped" },
      { name: "Croutons", quantity: "1 cup" },
      { name: "Parmesan Cheese", quantity: "1/4 cup, grated" },
      { name: "Caesar Dressing", quantity: "1/4 cup" },
    ],
    steps: [
      "Wash and chop the romaine lettuce.",
      "Toss with Caesar dressing and croutons.",
      "Top with freshly grated Parmesan and serve chilled.",
    ],
  },
  {
    title: "Crispy Grilled Cheese Sandwich",
    description: "Buttery, golden sandwich filled with melted cheddar cheese.",
    prep_time: 5,
    cook_time: 10,
    servings: 1,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/grilledcheese.jpg",
    ingredients: [
      { name: "Bread Slices", quantity: "2" },
      { name: "Cheddar Cheese", quantity: "2 slices" },
      { name: "Butter", quantity: "1 tbsp" },
    ],
    steps: [
      "Butter one side of each slice of bread.",
      "Place cheese between the unbuttered sides of the bread.",
      "Cook in a skillet over medium heat until both sides are golden and cheese is melted.",
    ],
  },
  {
    title: "Thai Shrimp Pad Thai",
    description:
      "A vibrant stir-fried noodle dish with shrimp, egg, and bean sprouts in a tangy sauce.",
    prep_time: 20,
    cook_time: 15,
    servings: 3,
    difficulty: "intermediate",
    cuisine: "Thai",
    image_url: "https://example.com/padthai.jpg",
    ingredients: [
      { name: "Rice Noodles", quantity: "200g" },
      { name: "Shrimp", quantity: "150g, peeled and deveined" },
      { name: "Egg", quantity: "1" },
      { name: "Bean Sprouts", quantity: "1 cup" },
      { name: "Pad Thai Sauce", quantity: "1/3 cup" },
    ],
    steps: [
      "Soak rice noodles in warm water until softened; drain.",
      "Stir-fry shrimp until pink; push to the side and scramble the egg.",
      "Add noodles and Pad Thai sauce; stir-fry until well combined.",
      "Toss in bean sprouts and cook for 1–2 more minutes.",
      "Serve hot with lime wedges and peanuts if desired.",
    ],
  },
  {
    title: "Spiced Shakshuka",
    description:
      "Poached eggs in a rich tomato, pepper, and onion sauce seasoned with cumin.",
    prep_time: 10,
    cook_time: 20,
    servings: 2,
    difficulty: "intermediate",
    cuisine: "Middle Eastern",
    image_url: "https://example.com/shakshuka.jpg",
    ingredients: [
      { name: "Eggs", quantity: "4" },
      { name: "Tomatoes", quantity: "3, chopped" },
      { name: "Onion", quantity: "1, diced" },
      { name: "Bell Pepper", quantity: "1, diced" },
      { name: "Ground Cumin", quantity: "1 tsp" },
    ],
    steps: [
      "Sauté onion and bell pepper until soft.",
      "Add chopped tomatoes and cumin; simmer for 10 minutes.",
      "Create small wells in the sauce and crack in the eggs.",
      "Cover and cook until egg whites are just set.",
      "Serve with crusty bread.",
    ],
  },
  {
    title: "Quick Vegetable Stir-Fry",
    description:
      "A fast, flavorful mix of stir-fried vegetables with garlic and soy sauce.",
    prep_time: 10,
    cook_time: 10,
    servings: 2,
    difficulty: "beginner",
    cuisine: "Chinese",
    image_url: "https://example.com/stirfry.jpg",
    ingredients: [
      { name: "Broccoli", quantity: "1 cup, chopped" },
      { name: "Carrot", quantity: "1, sliced" },
      { name: "Bell Pepper", quantity: "1, sliced" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "2 cloves, minced" },
    ],
    steps: [
      "Heat oil in a wok and sauté garlic until fragrant.",
      "Add broccoli, carrots, and bell pepper; stir-fry for 5–7 minutes.",
      "Drizzle in soy sauce and cook until vegetables are crisp-tender.",
    ],
  },
  {
    title: "Fresh Greek Salad",
    description:
      "A refreshing salad of crisp vegetables, briny olives, and creamy feta.",
    prep_time: 10,
    cook_time: 0,
    servings: 2,
    difficulty: "beginner",
    cuisine: "Greek",
    image_url: "https://example.com/greeksalad.jpg",
    ingredients: [
      { name: "Cucumber", quantity: "1, sliced" },
      { name: "Tomatoes", quantity: "2, chopped" },
      { name: "Red Onion", quantity: "1/2, thinly sliced" },
      { name: "Feta Cheese", quantity: "1/4 cup, crumbled" },
      { name: "Olives", quantity: "1/4 cup" },
    ],
    steps: [
      "Combine cucumber, tomato, and red onion in a bowl.",
      "Add olives and crumbled feta on top.",
      "Drizzle with olive oil and red wine vinegar before serving.",
    ],
  },
  {
    title: "Creamy Indian Butter Chicken",
    description:
      "Marinated chicken cooked in a rich tomato-based sauce with butter and cream.",
    prep_time: 20,
    cook_time: 30,
    servings: 4,
    difficulty: "advanced",
    cuisine: "Indian",
    image_url: "https://example.com/butterchicken.jpg",
    ingredients: [
      { name: "Chicken", quantity: "500g, boneless" },
      { name: "Tomato Puree", quantity: "1 cup" },
      { name: "Cream", quantity: "1/2 cup" },
      { name: "Butter", quantity: "2 tbsp" },
      { name: "Garam Masala", quantity: "1 tsp" },
    ],
    steps: [
      "Sauté chicken in butter until browned.",
      "Add tomato puree and garam masala; simmer for 10 minutes.",
      "Stir in cream and continue cooking until the sauce thickens.",
      "Serve with basmati rice or naan.",
    ],
  },
  {
    title: "Lemon Herb Grilled Chicken",
    description:
      "Juicy chicken breasts marinated in a zesty lemon herb blend, then grilled to perfection.",
    prep_time: 20,
    cook_time: 15,
    servings: 4,
    difficulty: "intermediate",
    cuisine: "American",
    image_url: "https://example.com/lemonchicken.jpg",
    ingredients: [
      { name: "Chicken Breast", quantity: "4" },
      { name: "Lemon Juice", quantity: "1/4 cup" },
      { name: "Olive Oil", quantity: "2 tbsp" },
      { name: "Garlic", quantity: "3 cloves, minced" },
      { name: "Dried Oregano", quantity: "1 tsp" },
    ],
    steps: [
      "In a bowl, mix lemon juice, olive oil, garlic, and oregano.",
      "Marinate chicken for at least 30 minutes.",
      "Preheat grill and cook chicken 6–7 minutes per side until done.",
      "Rest briefly before serving.",
    ],
  },
  {
    title: "Mushroom Risotto",
    description:
      "Creamy arborio rice slowly cooked with broth and loaded with savory mushrooms.",
    prep_time: 10,
    cook_time: 30,
    servings: 3,
    difficulty: "advanced",
    cuisine: "Italian",
    image_url: "https://example.com/risotto.jpg",
    ingredients: [
      { name: "Arborio Rice", quantity: "1 cup" },
      { name: "Mushrooms", quantity: "200g, sliced" },
      { name: "Onion", quantity: "1, finely chopped" },
      { name: "Vegetable Broth", quantity: "4 cups" },
      { name: "Parmesan", quantity: "1/4 cup, grated" },
    ],
    steps: [
      "Sauté onion and mushrooms until soft.",
      "Add rice and stir for 2 minutes.",
      "Gradually add warm broth, stirring frequently.",
      "Once creamy and rice is tender, stir in Parmesan.",
    ],
  },
  {
    title: "Avocado Toast with Poached Egg",
    description:
      "Crunchy toast topped with creamy avocado and a perfectly poached egg.",
    prep_time: 10,
    cook_time: 5,
    servings: 1,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/avocadotoast.jpg",
    ingredients: [
      { name: "Bread Slice", quantity: "1" },
      { name: "Avocado", quantity: "1/2, mashed" },
      { name: "Egg", quantity: "1" },
      { name: "Salt", quantity: "To taste" },
      { name: "Pepper", quantity: "To taste" },
    ],
    steps: [
      "Toast the bread slice.",
      "Spread mashed avocado over the toast.",
      "Poach the egg in simmering water for 3 minutes.",
      "Place egg on top and season with salt and pepper.",
    ],
  },
  {
    title: "Sweet Potato Fries",
    description: "Crispy baked sweet potato fries with a hint of spice.",
    prep_time: 10,
    cook_time: 25,
    servings: 2,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/sweetpotatofries.jpg",
    ingredients: [
      { name: "Sweet Potato", quantity: "2, cut into fries" },
      { name: "Olive Oil", quantity: "1 tbsp" },
      { name: "Paprika", quantity: "1 tsp" },
      { name: "Salt", quantity: "To taste" },
    ],
    steps: [
      "Preheat oven to 425°F (220°C).",
      "Toss fries with oil, paprika, and salt.",
      "Spread on a baking sheet and bake for 20–25 minutes, flipping halfway.",
    ],
  },
  {
    title: "Egg Fried Rice",
    description:
      "Quick and tasty stir-fried rice with scrambled egg and vegetables.",
    prep_time: 10,
    cook_time: 15,
    servings: 2,
    difficulty: "beginner",
    cuisine: "Chinese",
    image_url: "https://example.com/eggfriedrice.jpg",
    ingredients: [
      { name: "Cooked Rice", quantity: "2 cups" },
      { name: "Eggs", quantity: "2" },
      { name: "Peas and Carrots", quantity: "1 cup, mixed" },
      { name: "Soy Sauce", quantity: "2 tbsp" },
      { name: "Green Onion", quantity: "2 stalks, chopped" },
    ],
    steps: [
      "Scramble eggs in a wok and set aside.",
      "Sauté vegetables for 2–3 minutes.",
      "Add rice, soy sauce, and eggs back in; stir well.",
      "Garnish with green onions.",
    ],
  },
  {
    title: "French Onion Soup",
    description:
      "Rich beef broth with caramelized onions topped with melted cheese and bread.",
    prep_time: 15,
    cook_time: 45,
    servings: 4,
    difficulty: "advanced",
    cuisine: "French",
    image_url: "https://example.com/onionsoup.jpg",
    ingredients: [
      { name: "Onions", quantity: "4, sliced" },
      { name: "Beef Broth", quantity: "4 cups" },
      { name: "Butter", quantity: "2 tbsp" },
      { name: "Baguette", quantity: "4 slices" },
      { name: "Gruyère Cheese", quantity: "1 cup, shredded" },
    ],
    steps: [
      "Caramelize onions in butter over low heat.",
      "Add broth and simmer for 30 minutes.",
      "Ladle soup into bowls, top with baguette and cheese.",
      "Broil until cheese is melted and bubbly.",
    ],
  },
  {
    title: "Beef Stroganoff",
    description:
      "Tender beef strips in a creamy mushroom sauce served over noodles.",
    prep_time: 20,
    cook_time: 30,
    servings: 4,
    difficulty: "intermediate",
    cuisine: "Russian",
    image_url: "https://example.com/stroganoff.jpg",
    ingredients: [
      { name: "Beef Sirloin", quantity: "400g, sliced" },
      { name: "Mushrooms", quantity: "1 cup, sliced" },
      { name: "Onion", quantity: "1, diced" },
      { name: "Sour Cream", quantity: "1/2 cup" },
      { name: "Egg Noodles", quantity: "4 cups, cooked" },
    ],
    steps: [
      "Sauté beef until browned and remove.",
      "Cook onion and mushrooms until soft.",
      "Return beef and stir in sour cream; simmer briefly.",
      "Serve over egg noodles.",
    ],
  },
  {
    title: "Caprese Salad",
    description:
      "Fresh tomatoes, mozzarella, and basil with a drizzle of balsamic glaze.",
    prep_time: 10,
    cook_time: 0,
    servings: 2,
    difficulty: "beginner",
    cuisine: "Italian",
    image_url: "https://example.com/caprese.jpg",
    ingredients: [
      { name: "Tomatoes", quantity: "2, sliced" },
      { name: "Mozzarella", quantity: "200g, sliced" },
      { name: "Fresh Basil", quantity: "1/4 cup" },
      { name: "Olive Oil", quantity: "1 tbsp" },
      { name: "Balsamic Glaze", quantity: "1 tbsp" },
    ],
    steps: [
      "Arrange tomato and mozzarella slices on a plate.",
      "Top with fresh basil leaves.",
      "Drizzle with olive oil and balsamic glaze before serving.",
    ],
  },
  {
    title: "Creamy Spinach Artichoke Dip",
    description:
      "Warm, cheesy dip packed with spinach and artichokes, perfect for sharing.",
    prep_time: 10,
    cook_time: 20,
    servings: 6,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/spinachdip.jpg",
    ingredients: [
      { name: "Cream Cheese", quantity: "1 cup" },
      { name: "Spinach", quantity: "1 cup, cooked and chopped" },
      { name: "Artichoke Hearts", quantity: "1 cup, chopped" },
      { name: "Parmesan", quantity: "1/4 cup, grated" },
      { name: "Garlic", quantity: "1 clove, minced" },
    ],
    steps: [
      "Mix all ingredients in a bowl.",
      "Transfer to a baking dish and bake at 375°F (190°C) for 20 minutes.",
      "Serve warm with chips or bread.",
    ],
  },
  {
    title: "Banana Oatmeal Cookies",
    description:
      "Soft, chewy cookies made with ripe bananas and oats—naturally sweet and healthy.",
    prep_time: 10,
    cook_time: 15,
    servings: 12,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/bananacookies.jpg",
    ingredients: [
      { name: "Ripe Bananas", quantity: "2, mashed" },
      { name: "Rolled Oats", quantity: "1.5 cups" },
      { name: "Cinnamon", quantity: "1/2 tsp" },
      { name: "Chocolate Chips", quantity: "1/4 cup" },
      { name: "Salt", quantity: "A pinch" },
    ],
    steps: [
      "Preheat oven to 350°F (175°C).",
      "Mix all ingredients together in a bowl.",
      "Scoop onto a baking sheet and flatten slightly.",
      "Bake for 12–15 minutes until set.",
    ],
  },
  {
    title: "Tuna Salad Sandwich",
    description:
      "Quick sandwich with a creamy tuna filling, perfect for lunch.",
    prep_time: 10,
    cook_time: 0,
    servings: 2,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/tunasalad.jpg",
    ingredients: [
      { name: "Canned Tuna", quantity: "1 can" },
      { name: "Mayonnaise", quantity: "2 tbsp" },
      { name: "Celery", quantity: "1 stalk, diced" },
      { name: "Bread Slices", quantity: "4" },
      { name: "Lettuce", quantity: "2 leaves" },
    ],
    steps: [
      "Drain tuna and mix with mayo and celery.",
      "Spread mixture onto two slices of bread.",
      "Top with lettuce and second slice of bread.",
    ],
  },
  {
    title: "Chocolate Mug Cake",
    description:
      "Single-serve chocolate cake made in the microwave in just minutes.",
    prep_time: 5,
    cook_time: 2,
    servings: 1,
    difficulty: "beginner",
    cuisine: "American",
    image_url: "https://example.com/mugcake.jpg",
    ingredients: [
      { name: "Flour", quantity: "1/4 cup" },
      { name: "Sugar", quantity: "2 tbsp" },
      { name: "Cocoa Powder", quantity: "2 tbsp" },
      { name: "Milk", quantity: "1/4 cup" },
      { name: "Vegetable Oil", quantity: "2 tbsp" },
    ],
    steps: [
      "Mix all ingredients in a microwave-safe mug.",
      "Microwave for 1.5 to 2 minutes.",
      "Let cool slightly before eating.",
    ],
  },
];
