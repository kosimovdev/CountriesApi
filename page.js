"use strict";

const fullNamecountry = localStorage.getItem("fullname");
const countriesApi = "https://restcountries.com/v2";

window.addEventListener("DOMContentLoaded", () => {
    getCountry(fullNamecountry);
});

const goBack = () => {
    location.replace("./index.html");
};

const bors = [];

async function getCountry(isName) {
    try {
        const response = await fetch(`${countriesApi}/name/${isName}?fullText=true`);
        const result = await response.json();
        const el = result[0];
        console.log(
            el.borders.map((e) => {
                return bors.push(e);
            })
        );

        console.log(result[0]);
        $("#result").innerHTML = `
                    <div class="card flex items-center">
                        <div class="card-left w-full">
                            <img class="w-[560px] h-[480px]" src="${el?.flags.svg}" alt="german">
                        </div>
                        <div class="card-right w-full ml-[120px]">
                            <h1 class="text-[32px] font-extrabold">${el?.name}</h1>
                            <div class="flex w-full justify-between mt-[30px]">
                                <ul>
                                    <li class="text-[16px] mb-3"><strong>Native Name:</strong> ${el?.nativeName}</li>
                                    <li class="text-[16px] mb-3"><strong>Population:</strong> ${el?.population}</li>
                                    <li class="text-[16px] mb-3"><strong>Region:</strong> ${el?.region}</li>
                                    <li class="text-[16px] mb-3"><strong>Sub Region</strong> ${el?.subregion}</li>
                                    <li class="text-[16px] mb-3"><strong>Capital:</strong> ${el?.capital}</li>
                                </ul>
                                <ul>
                                    <li class="text-[16px] mb-3"><strong>Top Level Domain:</strong> ${
                                        el?.topLevelDomain
                                    }</li>
                                    <li class="text-[16px] mb-3"><strong>Currencies: ${el?.currencies.map((e) => {
                                        return e.symbol;
                                    })}</strong></li>
                                    <li class="text-[16px] mb-3"><strong>Language:</strong> ${el?.languages.map((e) => {
                                        return e.name;
                                    })}</li>
                                </ul>
                            </div>
                             <div class="flex items-center mt-[70px]">
                            <h1 class="text-[16px] mr-[42px] font-semibold leading-[24px]">Border countries:</h1>
                            <div id="br" class="flex gap-[20px] ">
                           
                            </div>
                         </div>
                        </div>
                    </div>
    `;

        bors.forEach((item) => {
            const options = createElement("option", "p-2 shadow hover:bg-[#2B3844] hover:text-white", item);

            $("#br").append(options);
        });
    } catch (err) {
        console.log("not found");
    }
}
