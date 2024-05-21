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
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelectorAll(".categories");
    const navbarLink = document.querySelectorAll(".nav-item a");
    const makeActive = (link) => navbarLink[link].classList.add("active");
    const removeActive = (link) => navbarLink[link].classList.remove("active");
    const removeAllActive = () => [...Array(section.length).keys()].forEach((link) => removeActive(link));
    const sectionMargin = 200;
    let currentActive = 0;
    window.addEventListener("scroll", () => {
        const current = section.length -
            Array.from(section)
                .reverse()
                .findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin) -
            1;
        if (current !== currentActive) {
            removeAllActive();
            currentActive = current;
            makeActive(current);
        }
    });
}, false);
const fetchUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
function fetchMeals(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        let body = yield response.json();
        return body;
    });
}
function showMeal() {
    return __awaiter(this, void 0, void 0, function* () {
        let meal = yield fetchMeals(fetchUrl);
        let mealInter = meal.meals;
        let banner = document.getElementById("banner");
        let mealData = document.createElement("div");
        mealInter.forEach((item) => {
            banner.style.backgroundImage = `url(${item.strMealThumb})`;
            banner.style.backgroundRepeat = "no-repeat";
            banner.style.backgroundPosition = "center";
            banner.style.backgroundSize = "cover";
            let name = document.createElement("h1");
            name.innerHTML = item.strMeal;
            mealData === null || mealData === void 0 ? void 0 : mealData.appendChild(name);
            let mealDetails = document.createElement("h2");
            mealDetails.innerHTML = `<p>${item.strCategory} / ${item.strArea}</p>`;
            mealData === null || mealData === void 0 ? void 0 : mealData.appendChild(mealDetails);
            let mealPageLink = document.createElement("button");
            mealPageLink.innerHTML = `<a href=meal.html?id=${item.idMeal}>View Recipe</a>`;
            mealData === null || mealData === void 0 ? void 0 : mealData.appendChild(mealPageLink);
            banner === null || banner === void 0 ? void 0 : banner.appendChild(mealData);
        });
    });
}
showMeal();
const prev = document.getElementById("prev-btn");
const next = document.getElementById("next-btn");
const itemList = document.getElementById("item-list");
const itemWidth = 150;
const padding = 10;
prev === null || prev === void 0 ? void 0 : prev.addEventListener("click", () => {
    itemList.scrollLeft -= itemWidth + padding;
});
next === null || next === void 0 ? void 0 : next.addEventListener("click", () => {
    itemList.scrollLeft += itemWidth + padding;
});
let fetchUrlCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
let fetchCategory = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
function showCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield fetchMeals(fetchUrlCategories);
        let mealCategories = data.categories;
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
            categories === null || categories === void 0 ? void 0 : categories.appendChild(itemDiv);
        });
    });
}
showCategories();
