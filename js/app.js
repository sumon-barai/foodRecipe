// select dom dom element
const foodList = document.getElementById("food-list");
const spinner = document.getElementById("spinner");
const searchBtn = document.getElementById("searchBtn");
const searchField = document.getElementById("searchField");
const modalContent = document.getElementById("modal-content");
const scrollToTop = document.getElementById("scrollToTop");

// event listener
window.addEventListener("load", initialLoad);
window.addEventListener("scroll", scrolling);
searchBtn.addEventListener("click", searchFood);
scrollToTop.addEventListener("click", scrollingToTop);

// functionality

async function initialLoad() {
  spinner.classList.remove("hidden");
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const foods = await getData(apiUrl);
  showFood(foods);
}

function showFood(foods) {
  let foodItems = "";
  // create food item html
  foods.forEach((food) => {
    const foodItemHtml = `
                <div class="food-item">
                <div class="card card-compact bg-base-100 shadow-xl">
                  <figure>
                    <img
                      class="w-full h-60 object-cover"
                      src=${food.strMealThumb}
                    />
                  </figure>
                  <div class="card-body">
                    <h2 class="card-title">${food.strMeal}</h2>
                    <p>
                    ${food.strInstructions.slice(0, 180)}
                    </p>
                    <div class="card-actions justify-end">
                      <label
                        onClick="modal(${food.idMeal})"
                        for="my-modal-6"
                        class="btn btn-warning text-white"
                        >View Details</label
                      >
                    </div>
                  </div>
                </div>
              </div>
    `;
    foodItems = foodItems + foodItemHtml;
  });

  spinner.classList.add("hidden");
  foodList.innerHTML = foodItems;
}

async function getData(apiUrl) {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data.meals;
  } catch (error) {
    return error;
  }
}

async function searchFood() {
  spinner.classList.remove("hidden");
  foodList.innerHTML = "";
  const searchKeyword = searchField.value;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`;
  const foods = await getData(apiUrl);

  if (foods?.length > 0) {
    showFood(foods);
  } else {
    spinner.classList.add("hidden");
    foodList.innerHTML = `<h2 class="text-3xl">No Food Found</h2>`;
  }
}

async function modal(id) {
  modalContent.innerHTML = "";
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const food = await getData(apiUrl);
  const html = `
          <div class="card card-compact bg-base-100 shadow-xl">
          <figure>
            <img
              class="w-full h-96 object-cover"
              src=${food[0].strMealThumb}
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${food[0].strMeal}</h2>
            <p>
            ${food[0].strInstructions}
            </p>
          </div>
        </div>
`;
  modalContent.innerHTML = html;
}

function scrollingToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrolling() {
  const px = window.pageYOffset;
  if (px > 200) {
    scrollToTop.style.opacity = 1;
    scrollToTop.style.visibility = "visible";
  } else {
    scrollToTop.style.opacity = 0;
    scrollToTop.style.visibility = "hidden";
  }
}
