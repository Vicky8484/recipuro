const listURL = "https://dummyjson.com/recipes?limit=100";
const listContainer = document.querySelector(".kategorierBox");

// Map meal types to Danish names and images
const mealTypeMap = {
  dinner: { da: "Dinner", img: "img-vid/kategori-img1.webp" },
  lunch: { da: "Lunch", img: "img-vid/kategori-img2.webp" },
  snack: { da: "Snacks", img: "img-vid/kategori-img3.webp" },
  dessert: { da: "Dessert", img: "img-vid/kategori-img4.webp" },
};

// Define which meal types to display
const allowedMealTypes = ["dinner", "lunch", "snack", "dessert"];

function getCategories() {
  showCategories(allowedMealTypes);
}

function showCategories(mealTypes) {
  console.log("showCategories", mealTypes);

  // Start med tom container
  listContainer.innerHTML = "";

  // mealTypes er et array af meal type strings
  mealTypes.forEach((mealType) => {
    const info = mealTypeMap[mealType] || { da: mealType, img: "img-vid/kategori-img1.webp" };

    listContainer.innerHTML += `<a href="opskrifter.html?mealType=${mealType}" class="kategori">
                            <img src="${info.img}" alt="${info.da}">
                            <h3>${info.da}</h3>
                        </a>`;
  });
}

getCategories();
