"use strict";
//import { fetchMeals } from "./index";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let fetchCategoryUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
let fetchCategoryData = "https://www.themealdb.com/api/json/v1/1/categories.php";
let params = new URLSearchParams(document.location.search);
let nameCat = params.get("name");
function fetchCategoryMeals(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        let body = yield response.json();
        return body;
    });
}
function showCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        let titleCategory = document.getElementById("heading");
        let category = yield fetchCategoryMeals(fetchCategoryUrl + nameCat);
        let data = yield fetchCategoryMeals(fetchCategoryData);
        let categoryData = category.meals;
        let headingSection = data.categories.find((item) => item.strCategory == nameCat);
        console.log(data.categories.find((item) => item.strCategory == nameCat));
        let categoriesElementsList = document.getElementById("elements-category");
        let h1Category = document.createElement("h1");
        let imgCategory = document.createElement("img");
        let pCategory = document.createElement("p");
        h1Category.innerHTML = headingSection.strCategory;
        imgCategory.src = headingSection.strCategoryThumb;
        pCategory.innerText = headingSection.strCategoryDescription;
        titleCategory === null || titleCategory === void 0 ? void 0 : titleCategory.appendChild(h1Category);
        titleCategory === null || titleCategory === void 0 ? void 0 : titleCategory.appendChild(imgCategory);
        titleCategory === null || titleCategory === void 0 ? void 0 : titleCategory.appendChild(pCategory);
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
            categoriesElementsList === null || categoriesElementsList === void 0 ? void 0 : categoriesElementsList.appendChild(cardCategory);
        });
    });
}
showCategory();
