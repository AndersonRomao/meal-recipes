//import { fetchMeals } from "./index";

let fetchCategoryUrl: string =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

let fetchCategoryData =
  "https://www.themealdb.com/api/json/v1/1/categories.php";

interface CategoryMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

let params = new URLSearchParams(document.location.search);
let nameCat = params.get("name") as string;

async function fetchCategoryMeals(url: string) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}

async function showCategory() {
  let titleCategory = document.getElementById("heading");

  let category = await fetchCategoryMeals(fetchCategoryUrl + nameCat);

  let data = await fetchCategoryMeals(fetchCategoryData);

  let categoryData = category.meals as CategoryMeal[];
  let headingSection = data.categories.find(
    (item: { strCategory: string }) => item.strCategory == nameCat
  );
  console.log(
    data.categories.find(
      (item: { strCategory: string }) => item.strCategory == nameCat
    )
  );
  let categoriesElementsList = document.getElementById("elements-category");

  let h1Category = document.createElement("h1");
  let imgCategory = document.createElement("img");
  let pCategory = document.createElement("p");

  h1Category.innerHTML = headingSection.strCategory;
  imgCategory.src = headingSection.strCategoryThumb;
  pCategory.innerText = headingSection.strCategoryDescription;

  titleCategory?.appendChild(h1Category);
  titleCategory?.appendChild(imgCategory);
  titleCategory?.appendChild(pCategory);

  categoryData.forEach((item) => {
    let cardCategory = document.createElement("div");
    let elemNameCategory = document.createElement("h3");
    let elemImgCategory = document.createElement("img");
    let linkMeal = document.createElement("a");
    linkMeal.href = `meal.html?id=${item.idMeal}`;
    elemNameCategory.innerText = item.strMeal;
    elemImgCategory.src = item.strMealThumb;
    linkMeal.appendChild(elemNameCategory);
    linkMeal.appendChild(elemImgCategory);

    cardCategory.appendChild(linkMeal);

    categoriesElementsList?.appendChild(cardCategory);
  });
}

showCategory();
