let mealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

let paramsMeal = new URLSearchParams(document.location.search);
let nameMeal = paramsMeal.get("id") as string;

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
}

async function fetchMeal(url: string) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}

let filterEntries = (arr: [], filter: string): any => {
  let values = Object.entries(arr).filter(
    ([key, val]) =>
      val != "" && val != null && val != " " && key.match(`str${filter}`)
  );
  return Object.fromEntries(values);
};

let addListSection = (array: [], section: HTMLElement, id: string) => {
  let list = document.createElement("ol");
  let div = document.createElement("div") as HTMLElement;
  let heading = document.createElement("h4");

  heading.innerText = id.toUpperCase();
  div.appendChild(heading);
  for (let val in array) {
    let itemList = document.createElement("li");
    itemList.innerText = array[val];
    list.appendChild(itemList);
    div?.appendChild(list);

    section.appendChild(div);
  }
};

let mealSection = document.getElementById("section") as HTMLElement;
let nameImgSection = document.getElementById("name") as HTMLHeadingElement;
let section = document.getElementById("details") as HTMLElement;
let img = document.getElementById("meal-img") as HTMLImageElement;
let inst_Section = document.getElementById("instructions") as HTMLElement;

async function showMealRecipe() {
  let mealReq = await fetchMeal(mealUrl + nameMeal);
  let mealData = mealReq.meals as Meal[];
  let filterMeas = filterEntries(mealReq.meals[0], "Ingredient");
  let measures = filterEntries(mealReq.meals[0], "Measure");

  mealData.forEach((item) => {
    let mealName = document.createElement("h2");
    mealName.innerText = item.strMeal;
    nameImgSection.appendChild(mealName);
    let mealCategory = document.createElement("h3");
    mealCategory.innerText = item.strCategory;
    nameImgSection.appendChild(mealCategory);
    img.src = item.strMealThumb;
    let headingInst = document.createElement("h3");
    let instElement = document.createElement("p");

    headingInst.innerHTML = "<h4>INSTRUCTIONS</h4>";
    instElement.innerText = item.strInstructions;

    inst_Section.appendChild(headingInst);
    inst_Section.appendChild(instElement);
  });
  addListSection(filterMeas, section, "ingredients");

  addListSection(measures, section, "measures");
}

showMealRecipe();
