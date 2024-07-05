async function fetchData() {
    const fetchResult = await fetch("https://swapi.dev/api/people/");
    const data = await fetchResult.json();
    console.log(data);
    const characters = data.results; // characters = array[10]
    // console.log(characters);
  
    const rootElement = document.querySelector("#root");
    let charactersHtml = "";
  
    /* for (let i = 0; i < characters.length; i++) {
      console.log(characters[i]);
      charactersHtml += `
        <div class="character">
          <p class="name"> ${characters[i].name} </p>
          <p class="height"> ${characters[i].height}cm </p>
          <p class="mass"> ${characters[i].mass}kg </p>
        </div>
      `;
    } */
  
    characters.forEach(character => charactersHtml += `
        <div class="character">
          <p class="name"> ${character.name} </p>
          <p class="height"> ${character.height}cm </p>
          <p class="mass"> ${character.mass}kg </p>
        </div>
      `
    );
  
    rootElement.insertAdjacentHTML("beforeend", charactersHtml);
  

//mindenhol elérhető a data a fetchData függvényen belül
}

fetchData()

/* fetch("https://swapi.dev/api/people/")
.then(response => response.json())
.then(data => console.log(data)) // csak a második then callback függvényében érhető el a data

let counter = 1;
setInterval(() => {
    console.log(counter)
    counter++;
}, 500) */

