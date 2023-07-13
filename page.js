"use strict";

const code = localStorage.getItem("code");
const countriesApi = "https://restcountries.com/v2";

window.addEventListener("DOMContentLoaded", () => {
  getCountry(code);
});

const goBack = () => {
  location.replace("./index.html");
};

const bors = [];

async function getCountry(isName) {
  let loader = true;
  if (loader === true) {
    $(
      "#result"
    ).innerHTML = `<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI1NGUzdXA2cmUxaWM1OG0zbjE2dzVvYjlxNHBiaHp2NWQwZjVqdSZlcD12MV9naWZzX3NlYXJjaCZjdD1z/L05HgB2h6qICDs5Sms/giphy.gif"/>`;
  }
  try {
    const response = await fetch(`${countriesApi}/alpha/${isName}`);
    const el = await response.json();
    render(el);
  } catch (err) {
    console.log("not found");
  } finally {
    return (loader = false);
  }
}

function render(el) {
  $("#result").innerHTML = `
                    <div class="card flex items-center">
                        <div class="card-left w-full">
                            <img class="w-[560px] h-[480px]" src="${
                              el?.flags.svg
                            }" alt="german">
                        </div>
                        <div class="card-right w-full ml-[120px]">
                            <h1 class="text-[32px] font-extrabold">${
                              el?.name
                            }</h1>
                            <div class="flex w-full justify-between mt-[30px]">
                                <ul>
                                    <li class="text-[16px] mb-3"><strong>Native Name:</strong> ${
                                      el?.nativeName
                                    }</li>
                                    <li class="text-[16px] mb-3"><strong>Population:</strong> ${
                                      el?.population
                                    }</li>
                                    <li class="text-[16px] mb-3"><strong>Region:</strong> ${
                                      el?.region
                                    }</li>
                                    <li class="text-[16px] mb-3"><strong>Sub Region</strong> ${
                                      el?.subregion
                                    }</li>
                                    <li class="text-[16px] mb-3"><strong>Capital:</strong> ${
                                      el?.capital
                                    }</li>
                                </ul>
                                <ul>
                                    <li class="text-[16px] mb-3"><strong>Top Level Domain:</strong> ${
                                      el?.topLevelDomain
                                    }</li>
                                    <li class="text-[16px] mb-3"><strong>Currencies: ${el?.currencies.map(
                                      (e) => {
                                        return e.symbol;
                                      }
                                    )}</strong></li>
                                    <li class="text-[16px] mb-3"><strong>Language:</strong> ${el?.languages.map(
                                      (e) => {
                                        return e.name;
                                      }
                                    )}</li>
                                </ul>
                            </div>
                             <div class="flex items-center mt-[70px]">
                            <h1 class="text-[16px] mr-[42px] font-semibold leading-[24px]">Border countries:</h1>
                            <div id="br" class="flex flex-wrap">
                                  ${el?.borders
                                    .map(
                                      (cou) =>
                                        `<p
                                        id="btn-br"
                                        data-codebr="${cou}"
                                        style="cursor: pointer; margin: 5px;padding: 10px; border: 1px solid gray; border-radius: 10px"
                                      >
                                        ${cou}
                                      </p>`
                                    )
                                    .join("")}
                            </div>
                         </div>
                        </div>
                    </div>
    `;
}

$("#result").addEventListener("click", (e) => {
  if (e.target.id.includes("btn-br")) {
    let code = e.target.getAttribute("data-codebr");
    localStorage.setItem("code", code);
    async function getCountry(isName) {
      let loader = true;
      if (loader === true) {
        $(
          "#result"
        ).innerHTML = `<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDI1NGUzdXA2cmUxaWM1OG0zbjE2dzVvYjlxNHBiaHp2NWQwZjVqdSZlcD12MV9naWZzX3NlYXJjaCZjdD1z/L05HgB2h6qICDs5Sms/giphy.gif"/>`;
      }
      try {
        const response = await fetch(`${countriesApi}/alpha/${isName}`);
        const el = await response.json();
        render(el);
      } catch (err) {
        console.log("not found");
      } finally {
        return (loader = false);
      }
    }

    getCountry();
    window.location.reload();
  }
});
