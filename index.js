import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parse(ingredient) {
  return `${ingredient.name} ${ingredient.weight.toFixed(1)}`;
}

function scaleRecipe(P, D, ingredients) {
  // Calculate the scaling factor
  const scalingFactor = D / P;

  // Initialize an array to store the scaled weights of ingredients
  const scaledWeights = [];
  // Find the main ingredient with 100% baker's percentage
  const mainIngredient = ingredients.find(ingredient => ingredient.percentage === 100.0);

  if (!mainIngredient) {
    throw new Error("No main ingredient with 100% baker's percentage found.");
  }

  // Calculate the scaled weight of the main ingredient
  const scaledMainIngredientWeight = mainIngredient.weight * scalingFactor;
  //scaledWeights.push({ name: mainIngredient.name, weight: scaledMainIngredientWeight });

  // Calculate the scaled weights of other ingredients
  for (const ingredient of ingredients) {
    if (ingredient.percentage !== 100.0) {
      const scaledWeight = scaledMainIngredientWeight * (ingredient.percentage / 100.0);
      scaledWeights.push({ name: ingredient.name, weight: scaledWeight });
    } else scaledWeights.push({ name: mainIngredient.name, weight: scaledMainIngredientWeight });
  }

  return scaledWeights;
}

let currentTestCase = 1;

rl.question('Enter the number of test cases (T): ', (T) => {
  const parsedT = parseInt(T);

  function processNextTestCase() {
    if (currentTestCase > parsedT) {
      rl.close();
      return;
    }

    rl.question(`Case ${currentTestCase}: Enter R, P, D (space-separated): `, (input) => {
      const [R, P, D] = input.split(' ').map(Number);
      const ingredients = [];

      function processNextIngredient() {
        if (ingredients.length >= R) {
          const scaledRecipe = scaleRecipe(P, D, ingredients);

          console.log(`Recipe #${currentTestCase}`);
          scaledRecipe.forEach(ingredient => {
            console.log(parse(ingredient));
          });
          console.log('-'.repeat(40));
          currentTestCase++;
          processNextTestCase();
        } else {
          rl.question(`Ingredient ${ingredients.length + 1}: Enter name, weight, percentage (space-separated): `, (ingredientInput) => {
            const [name, weight, percentage] = ingredientInput.split(' ');
            ingredients.push({ name, weight: parseFloat(weight), percentage: parseFloat(percentage) });
            processNextIngredient();
          });
        }
      }

      processNextIngredient();
    });
  }

  processNextTestCase();
});

export { scaleRecipe, parse }
