const listURL = "https://dummyjson.com/recipes?limit=100";
const listContainer = document.querySelector("#recipe-box");

const showAllBtn = document.querySelector("#resetBtn");
const filterPrepBtn = document.querySelector("#filterByPrep");
const filterCookBtn = document.querySelector("#filterByCook");
const filterByInBtn = document.querySelector("#filterByIngredients");
const filterByIn2Btn = document.querySelector("#filterByIngredients2");
const filterLessBtn = document.querySelector("#filterByLess");
const filterMoreBtn = document.querySelector("#filterByMore");
const filterByCalBtn = document.querySelector("#filterByCalories");
const filterByCal2Btn = document.querySelector("#filterByCalories2");

const dropBtn = document.querySelector("#dropBtn");
const dropdown = document.querySelector("#myDropdown");

let allRecipes = [];

function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function applyMealTypeFilter(recipes) {
  const mealType = getQueryParam("mealType");
  if (!mealType) {
    return recipes;
  }

  const mealTypeLower = mealType.toLowerCase();
  return recipes.filter((recipe) => Array.isArray(recipe.mealType) && recipe.mealType.some((mt) => mt.toLowerCase() === mealTypeLower));
}

function getRecipes() {
  fetch(listURL)
    .then((res) => res.json())
    .then((data) => {
      allRecipes = data.recipes;
      const filteredRecipes = applyMealTypeFilter(allRecipes);
      if (filteredRecipes.length === 0) {
        const selectedMealType = getQueryParam("mealType");
        listContainer.innerHTML = `<p>Ingen opskrifter fundet for kategori "${selectedMealType}".</p>`;
      } else {
        showRecipes(filteredRecipes);
      }
    })
    .catch((error) => {
      console.error("Fejl ved hentning af opskrifter:", error);
      listContainer.innerHTML = "<p>Der opstod en fejl ved hentning af opskrifter.</p>";
    });
}

function showRecipes(recipes) {
  listContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    listContainer.innerHTML += `
      <article class="recipe-card">
        <img src="${recipe.image}" alt="Billede af ${recipe.name}">
        <div class="cardInfo">
        <h2 class="card-title">${recipe.name}</h2>

        <div class="space">
<p>Tid</p>
          <p>${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
        </div>

        <div class="space">
<p>Serveringer</>
          <p>${recipe.servings}</p>
        </div>

   <div class="space">
<p>Ingredienser</p>
          <p>${recipe.ingredients.length}</p>
        </div>

        <div class="space">
          <p>Sværhedsgrad</p>
          <p>${recipe.difficulty}</p>
        </div>


        <a class="recipeBtn button" href="enkeltopskrift.html?recipeId=${recipe.id}">Se Opskrift</a>
        </div>
      </article>
    `;
  });
}

// Filterknapper
showAllBtn.addEventListener("click", () => {
  showRecipes(allRecipes);
});

filterPrepBtn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.prepTimeMinutes < 20);
  showRecipes(filtered);
});

filterCookBtn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.cookTimeMinutes < 20);
  showRecipes(filtered);
});

filterByInBtn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.ingredients.length < 10);
  showRecipes(filtered);
});

filterByIn2Btn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.ingredients.length > 10);
  showRecipes(filtered);
});

filterLessBtn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.servings <= 4);
  showRecipes(filtered);
});

filterMoreBtn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.servings >= 4);
  showRecipes(filtered);
});

filterByCalBtn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.caloriesPerServing <= 300);
  showRecipes(filtered);
});

filterByCal2Btn.addEventListener("click", () => {
  const filtered = allRecipes.filter((recipe) => recipe.caloriesPerServing > 300);
  showRecipes(filtered);
});

// Dropdown
dropBtn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

window.addEventListener("click", (event) => {
  if (!event.target.matches(".dropbtn")) {
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
});

getRecipes();
