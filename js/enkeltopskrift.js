console.log("henter");
const params = new URLSearchParams(window.location.search);
const id = params.get("recipeId");

console.log("id:", id);

// const id = 1528;
const recipeURL = "https://dummyjson.com/recipes/" + id;
const recipeContainer = document.querySelector("#details-box");

function getRecipes() {
  fetch(recipeURL).then((res) => res.json().then((recipe) => show(recipe)));
}

function show(recipe) {
  recipeContainer.innerHTML = `
  <section>
            <div class="opskriftSection">
                <div class="opskriftHeader">
                    <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="Billede af ${recipe.name}">
                   <div class="recipe-info">
                      <h2>${recipe.name}</h2>
                      <p>Prep time: ${recipe.prepTimeMinutes} min</p>
                      <p>Cooking time: ${recipe.cookTimeMinutes} min</p>
                      <p>Servings: ${recipe.servings}</p>
                      <p>Difficulty: ${recipe.difficulty}</p>
                      <p>Rating: ${recipe.rating}/5 stars - ${recipe.reviewCount} ratings</p>
                    </div>

                </div>
                <div class="infobox">
                    <button type="button" class="collapsible">▶ Ingredients</button>
                    <div class="content">
                        <ul><li>${recipe.ingredients.join("</li><li>")}</li></ul>
                    </div>

                    <button type="button" class="collapsible">▶ Instructions</button>
                    <div class="content">
                        <ul><li>${recipe.instructions.join("</li><li>")}</li></ul>
                    </div>

                    <button type="button" class="collapsible">▶ Information</button>
                    <div class="content">
                        <p>Cuisine: ${recipe.cuisine}</p>
                        <br>
                        <p>Calories per serving: ${recipe.caloriesPerServing}</p>
                        <br>
                        <p>Meal type: ${recipe.mealType.join(", ")}</p>
                        <br>
                        <p>Rating: ${recipe.rating} | Review count: ${recipe.reviewCount}</p>
                        <br>
                        <p>Tags: ${recipe.tags.join(", ")}</p>
                    </div>
                </div>
            </div>

            <div class="kommentarSection">
                <h2>3 Comments</h2>

                <div class="box">
                    <h4>Cecilia</h4>
                    <p>Tried this recipe yesterday, so delicious!</p>
                </div>

                <div class="box">
                      <h4>David</h4>
                    <p>It was great</p>
                </div>

                <div class="box">
                    <h4>Annie</h4>
                    <p>Really easy and delicious, defo making again. Next time I might add some chili flakes on top for an extra kick!</p>
                </div>

                <p class="skrivHer">Write a comment</p>

                <input class="box2" name="kommentar" type="text" placeholder="Write..." required>


                <button type="submit" class="yellowBtn button">Send</button>

            </div>

            <div class="ratingSection">

                <h2>Rate the recipe</h2>
                <div class="rating">

                    <input type="radio" id="star5" name="rating" value="5">
                    <label for="star5">★</label>

                    <input type="radio" id="star4" name="rating" value="4">
                    <label for="star4">★</label>

                    <input type="radio" id="star3" name="rating" value="3">
                    <label for="star3">★</label>

                    <input type="radio" id="star2" name="rating" value="2">
                    <label for="star2">★</label>

                    <input type="radio" id="star1" name="rating" value="1">
                    <label for="star1">★</label>

                </div>
                <button type="submit" class="greenBtn button">Send</button>

            </div>
        </section>`;
  const coll = document.querySelectorAll(".collapsible");

  coll.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
}

getRecipes();
