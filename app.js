"use strict";

const CountriesApi = "https://restcountries.com/v2";

function getCountries() {
  fetch(`${CountriesApi}/all`)
    .then((res) => res.json())
    .then((result) => renderCountries(result))
    .catch((err) => console.log("error", err))
    .finally(() => console.info("countries successfuly load"));
}

getCountries();

function renderCountries(data) {
  let res = "";
  // console.log(data)

  if (data.length) {
    data.forEach((el) => {
      res += `
                 <div class="card w-[calc(25%-37.5px)]">
                    <img class="w-full h-[160px] object-cover rounded-[5px]" src="${el.flags.svg}" alt="img">
                    <div class="card-body px-[24px] pb-[24px]">
                        <h1 class="text-[18px] mt-[24px] mb-[16px] font-extrabold leading-[26px]">${el.name}</h1>
                        <p class="text-[14px] mb-[8px] font-semibold leading-[16px]">Population: ${el.population}</p>
                        <p class="text-[14px] mb-[8px] font-semibold leading-[16px]">Region: ${el.region}</p>
                        <p class="text-[14px] font-semibold leading-[16px]">Capital: <strong>${el.capital}</strong> </p>
                    </div>
                   </div>
      `;

      $(".wrapper").innerHTML = res;
    });
  }
}

let category = [];

CountriesApi.forEach((val) => {
  category.push(val.alpha3Code);
});

let regions = [...new Set(category)];
regions.forEach((v) => {
  let option = createElement("option");
  option.value = v;
  option.textContent = v;
  $("#region").append(opt);
});
