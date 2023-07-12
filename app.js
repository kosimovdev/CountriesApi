"use strict";

const countriesApi = "https://restcountries.com/v2";
let regions = [];
// <------ DATA FETCHING ----->

async function getCountries() {
  try {
    const response = await fetch(`${countriesApi}/all`);
    const result = await response.json();
    renderCountries(result);
    filterRegion(result);
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("done fetching countries");
  }
}

getCountries();
// <------ DATA FETCHING ----->

// <------ DATA RENDER ----->

function renderCountries(data) {
  let res = "";
  // console.log(data)

  if (data.length) {
    data.forEach((el) => {
      res += `
                 <div class="card w-[267px] h-[336px] dark:bg-[#2B3844] box-border hover:shadow-2xl">
                    <img class="w-full h-[160px] object-cover rounded-[5px]" src="${
                      el.flags.svg
                    }" alt="img">
                    <div class="card-body px-[24px] pb-[24px]">
                        <h1 class="text-[18px] mt-[24px] mb-[16px] font-extrabold leading-[26px]"><strong>${
                          el.name
                        }</strong></h1>
                        <p class="text-[14px] mb-[8px] font-semibold leading-[16px]"><strong>Population: </strong> ${
                          el.population
                        }</p>
                        <p class="text-[14px] mb-[8px] font-semibold leading-[16px]"><strong>Region: </strong> ${
                          el.region
                        }</p>
                        <p class="text-[14px] font-semibold leading-[16px]"><strong>Capital: </strong> ${
                          el?.capital ? el?.capital : " capital is not fount"
                        } </p>
                    </div>
                   </div>
      `;

      $(".wrapper").innerHTML = res;
    });
  }
}
// <------ DATA RENDER ----->

// <------ UNIQUE REGION FILTER ------>

function filterRegion(data) {
  if (data) {
    let res = data.map((item) => {
      return item.region;
    });

    regions = Array.from(new Set(res));
    renderOptions(regions);
  }
}
// <------ UNIQUE REGION FILTER ------>

// <----- RENDER OPTIONS ----->
function renderOptions(data) {
  if (data) {
    data?.sort().forEach((el) => {
      const option = createElement("option", "options", el);
      $("#region").append(option);
    });
  }
}
// <----- RENDER OPTIONS ----->

// <------ SEARCH BY NAME ------>

$("#search").addEventListener("keyup", (e) => {
  renderSearch(e.target.value);
});

async function renderSearch(text) {
  try {
    const response = await fetch(`${countriesApi}/name/${text}`);
    const result = await response.json();

    renderCountries(result);
  } catch (err) {
    alert(err.message);
  }
}

// <------ SEARCH BY NAME ------>
// <------ SORT BY REGION ------>

$("#region").addEventListener("change", (e) => {
  renderRegions(e.target.value);
});

async function renderRegions(text) {
  try {
    const response = await fetch(`${countriesApi}/region/${text}`);
    const result = await response.json();
    renderCountries(result);
    if (!text.length) {
      getCountries();
    }
  } catch (err) {
    alert(err.message);
  }
}

// <------ SORT BY REGION ------>
