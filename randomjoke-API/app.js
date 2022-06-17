let getBtn = document.querySelector(".search-btn");
let result = document.getElementById("result");
let answer = document.getElementById("answer");

getBtn.addEventListener("click",() => {
    let finalURL = `https://official-joke-api.herokuapp.com/random_joke`;
    fetch(finalURL).then((resp) => resp.json()).
    then((data) => {
        console.log("Soru: "+data.setup) // soru
        console.log("Cevap: "+data.punchline) // cevap
        result.innerHTML = `Joke: ${data.setup}`
        answer.innerHTML = `Punchline: ${data.punchline}`
    })


});