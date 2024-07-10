let charactersData = [];

const characterComponent = (name, height, mass, index, hairColor, eyeColor) => `
  <div class="character">
    <h2> character ${index + 1}: </h2>
    <p class="name"> ${name} </p>
    <p class="height"> ${height}cm </p>
    <p class="mass"> ${mass}kg </p>

    <button class="more">show more</button>
    <div class="more-data">
    <p class="hair-color"> Hair color: ${hairColor} </p>
    <p class="eye-color"> Eye color: ${eyeColor} </p>
    </div>
  </div>
`;
//JS primitívből elkészíti nekünk a HTML kódot a komponens, a karakter és a karakterek is, kap bemenő paramétert és körbeöleli HTML kóddal
const charactersComponent = (charactersData) => `
  <div class="characters">
    ${charactersData
    .map((characterData, index) => characterComponent(
      characterData.name, 
      characterData.height, 
      characterData.mass, 
      index,
      characterData.hair_color,
      characterData.eye_color
    ))
    .join(" ")
  }
  </div>
`;
// ez a kód csinálja a logikát, js objektumokat összehozza a map egy nagy stringgé, minden egyes elemén a tömbnek lefut a callback függvény és visszatér vele egy stringgel (a map alapvető visszatérése egy tömb) 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const makeDomFromData = (data, rootElement) => {
  charactersData.push(...data.results); //megkapott adat results értéket hozzáadjuk az elején deklarált tömbhöz
  let charactersHtml = charactersComponent(charactersData);
  const buttonHtml = `<button class="fetch">load more...</button>`;

  rootElement.insertAdjacentHTML("beforeend", charactersHtml); //belépési pontjába a weboldalnak adja hozzá a karaktert
  const moreButtonElements = document.querySelectorAll("button.more")
  moreButtonElements.forEach(moreButtonElement => moreButtonElement.addEventListener("click", () => {
    moreButtonElement.classList.toggle("clicked")
  
    moreButtonElement.innerText === "show more" ? moreButtonElement.innerText = "show less" : moreButtonElement.innerText = "show more"
  }));

  if (data.next) { //gomb hozzáadása a weoboldalhoz
    rootElement.insertAdjacentHTML("beforeend", buttonHtml);

    const buttonElement = document.querySelector("button.fetch");
    buttonElement.addEventListener("click", async () => { //gomb kap egy eseményfigyelőt, kap egy klikk eseményt és kap egy callback függvényt
      buttonElement.innerText = "loading next page...";
      buttonElement.disabled = true;

      const newData = await fetchData(data.next);
      rootElement.innerHTML = ""; //weboldal belépési pontjának a tartalma legyen egy üres string, amikor befejeződik a fetch, beilleszti az új tartalmat a régit pedig nem tölti be újra
      makeDomFromData(newData, rootElement);
    });
  }
}

const init = async () => {
  const data = await fetchData("https://swapi.dev/api/people/");
  console.log(data)
  const rootElement = document.querySelector("#root");
  makeDomFromData(data, rootElement);
}

init();


/*async function fetchData() {
    const fetchResult = await fetch("https://swapi.dev/api/people/");
    const data = await fetchResult.json();
    console.log(data);
    const characters = data.results;

    const rootElement = document.querySelector("#root");

    rootElement.insertAdjacentHTML("beforeend", charactersComponent(characters));
    rootElement.insertAdjacentHTML("beforeend", '<button class="fetch">load more...</button>');
  
    const fetchButtonElement = document.querySelector("button.fetch");
    fetchButtonElement.addEventListener("click", async () => {
    console.log("fetch next page");
    console.log(data.next);

    const newFetchResult = await fetch(data.next)
    console.log(newFetchResult);
    const newData = await newFetchResult.json();
    console.log(newData);
    const newCharacters = newData.results;
    console.log(newCharacters);

    rootElement.insertAdjacentHTML("beforeend", charactersComponent(newCharacters));

    fetchButtonElement.remove();
    rootElement.insertAdjacentHTML("beforeend", '<button class="fetch">load more...</button>');
    const newFetchButtonElement = document.querySelector("button.fetch");
    newFetchButtonElement.addEventListemer("click", () => {
      console.log("fetch third page");
      console.log(newData.next);
 })
})

} 

fetchData(); */