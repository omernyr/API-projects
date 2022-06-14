let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("search-inp");
let result = document.getElementById("result");
searchBtn.addEventListener("click",() => {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true
    `;      // Burda url yi ekledik. İSmi yazınca irek ülkenin url ye gidiyor.
    console.log(finalURL);
    fetch(finalURL).then((Response) => Response.json()) // Burda fetch ile ülkenin bililerini getirdik.
    .then((data) => {
        console.log(data) // ülke bilgileri object olarak geldi.
        console.log(data[0]) // Burda yapıyı açtık. İçine erişebiliriz.
        console.log(data[0].capital[0])
        console.log(data[0].flags.svg)
        console.log(data[0].name.common)
        console.log(data[0].continents[0]) // Burda istediğimiz verileri aldık. Şimdi ekrana bastırma zamanı.

        console.log(Object.keys(data[0].currencies)[0]); // Burası TRY nin olduğu yer.
        console.log(data[0].currencies[Object.keys(data[0].currencies)[0]].name) // burda try nin içine eriştik.
    
        console.log((data[0].languages))
        console.log(Object.values(data[0].languages).toString().split(",").join(", "));


        result.innerHTML = `
        
        <img src="${data[0].flags.svg}" alt="" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Currency:</h4>
                <span>${data[0].currencies[Object.keys(data[0].currencies)[0]].name}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
            <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span>
            </div>
        </div>
        `
    }).catch(() => {
        if(countryName.length == 0) {
            result.innerHTML = `<h3>The input field cannot be empty.</h3>`
        } else {
            result.innerHTML = `<h3>Please enter a valid country name.</h3>`
        }
    })
})


