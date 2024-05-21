document.addEventListener(
  "DOMContentLoaded",
  () => {
    const section = document.querySelectorAll(".categories");
    const navbarLink = document.querySelectorAll(".nav-item a");

    const makeActive = (link: any) => navbarLink[link].classList.add("active");

    const removeActive = (link: any) =>
      navbarLink[link].classList.remove("active");

    const removeAllActive = () =>
      [...Array(section.length).keys()].forEach((link) => removeActive(link));

    const sectionMargin = 200;
    let currentActive = 0;

    window.addEventListener("scroll", () => {
      const current =
        section.length -
        Array.from(section)
          .reverse()
          .findIndex(
            (section: any) =>
              window.scrollY >= section.offsetTop - sectionMargin
          ) -
        1;

      if (current !== currentActive) {
        removeAllActive();
        currentActive = current;
        makeActive(current);
      }
    });
  },
  false
);

const fetchUrl: string = "https://www.themealdb.com/api/json/v1/1/random.php";

interface RandomMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

async function fetchMeals(url: string) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}

async function showMeal() {
  let meal = await fetchMeals(fetchUrl);

  let mealInter = meal.meals as RandomMeal[];

  let banner = document.getElementById("banner") as HTMLElement;

  let mealData = document.createElement("div");

  mealInter.forEach((item) => {
    banner.style.backgroundImage = `url(${item.strMealThumb})`;
    banner.style.backgroundRepeat = "no-repeat";
    banner.style.backgroundPosition = "center";
    banner.style.backgroundSize = "cover";

    let name = document.createElement("h1");
    name.innerHTML = item.strMeal;
    mealData?.appendChild(name);

    let mealDetails = document.createElement("h2");
    mealDetails.innerHTML = `<p>${item.strCategory} / ${item.strArea}</p>`;
    mealData?.appendChild(mealDetails);

    let mealPageLink = document.createElement("button");
    mealPageLink.innerHTML = `<a href=meal.html?id=${item.idMeal}>View Recipe</a>`;
    mealData?.appendChild(mealPageLink);
    banner?.appendChild(mealData);
  });
}

showMeal();

const prev = document.getElementById("prev-btn");
const next = document.getElementById("next-btn");
const itemList = document.getElementById("item-list") as HTMLDivElement;
const itemWidth = 150;
const padding = 10;

prev?.addEventListener("click", () => {
  itemList.scrollLeft -= itemWidth + padding;
});
next?.addEventListener("click", () => {
  itemList.scrollLeft += itemWidth + padding;
});

interface CategoryMeal {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

let fetchUrlCategories =
  "https://www.themealdb.com/api/json/v1/1/categories.php";
let fetchCategory = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

async function showCategories() {
  let data = await fetchMeals(fetchUrlCategories);

  let mealCategories = data.categories as CategoryMeal[];

  mealCategories.forEach((item) => {
    let categories = document.getElementById("categories-card");
    let itemDiv = document.createElement("div");
    let categoryImg = document.createElement("img");
    let categoryName = document.createElement("h2");
    let linkCategory = document.createElement("a");

    linkCategory.href = `category.html?name=${item.strCategory}`;
    categoryImg.src = item.strCategoryThumb;
    categoryName.innerText = item.strCategory;
    linkCategory.appendChild(categoryImg);
    linkCategory.appendChild(categoryName);

    itemDiv.classList.add("category-card");
    itemDiv.appendChild(linkCategory);
    //itemDiv.appendChild(categoryName);
    categories?.appendChild(itemDiv);
  });
}

showCategories();
