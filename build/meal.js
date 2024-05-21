"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let mealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let paramsMeal = new URLSearchParams(document.location.search);
let nameMeal = paramsMeal.get("id");
function fetchMeal(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        let body = yield response.json();
        return body;
    });
}
let filterEntries = (arr, filter) => {
    let values = Object.entries(arr).filter(([key, val]) => val != "" && val != null && val != " " && key.match(`str${filter}`));
    return Object.fromEntries(values);
};
let addListSection = (array, section, id) => {
    let list = document.createElement("ol");
    let div = document.createElement("div");
    let heading = document.createElement("h4");
    heading.innerText = id.toUpperCase();
    div.appendChild(heading);
    for (let val in array) {
        let itemList = document.createElement("li");
        itemList.innerText = array[val];
        list.appendChild(itemList);
        div === null || div === void 0 ? void 0 : div.appendChild(list);
        section.appendChild(div);
    }
};
let mealSection = document.getElementById("section");
let nameImgSection = document.getElementById("name");
let section = document.getElementById("details");
let img = document.getElementById("meal-img");
let inst_Section = document.getElementById("instructions");
function showMealRecipe() {
    return __awaiter(this, void 0, void 0, function* () {
        let mealReq = yield fetchMeal(mealUrl + nameMeal);
        let mealData = mealReq.meals;
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
    });
}
showMealRecipe();
