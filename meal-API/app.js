let searchMeal = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");

let result = document.getElementById("result");

searchBtn.addEventListener("click",() => {
  
        if(searchMeal.value.length == 0 ) {
            result.innerHTML = `<h1>The input field cannot be empty</h1>`
        } else {
            let Meal_name = searchMeal.value;
            console.log(Meal_name) 
            let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
            let finalUrl = URL + Meal_name;
            getMeals(finalUrl);
        }
})
function getMeals(finalUrl) {
    fetch(finalUrl).then((resp) => resp.json())
        .then( (data) => {
            // console.log(URL);
            console.log((Object.values(data)[0]));

            let meal_object = Object.values(data)[0];
            console.log(meal_object.length)
                let Mymeal = meal_object[0]
                console.log(Mymeal)
                console.log("Fotoğraf: "+Mymeal.strMealThumb)
                console.log("İsim: "+Mymeal.strMeal)
                console.log("ülke: "+Mymeal.strArea)
                console.log("Tarif: "+Mymeal.strInstructions)
                       
                let count = 1;
                let ingredients = [];

                //----------   Burda API nin içindeki yemek tarif ve ölçekleri API den tek tek çıkardık.
                for(let i in Mymeal) {          
                    let ingredient = "";
                    let measure = "";
                    if(i.startsWith("strIngredient") && Mymeal[i]) {
                        ingredient = Mymeal[i];
                        measure = Mymeal[`strMeasure`+ count];
                        count +=1;
                        ingredients.push(`${measure} ${ingredient}`)
                    }
                }
                console.log(ingredients)
                result.innerHTML = `
                <img src=${Mymeal.strMealThumb}>
                <div class="box">
                    <h4>${Mymeal.strMeal}</h4>
                    <p>${Mymeal.strArea}</p>
                </div>
                <div id="ingredient-con">
                
                    <ul id="listrecipe">

                    </ul>
                
                </div>
                <div id="recipe" class="close"> 
                    <button id="hide-recipe">X</button>
                    <pre id="instructions">${Mymeal.strInstructions}</pre>
                </div>
                <button id="aboutMeal">View</button>`;           
                let listingre = document.getElementById("listrecipe");

                ingredients.forEach(item => {
                    let recipeİtems = document.createElement("li");
                    recipeİtems.innerHTML = item;
                    console.log(recipeİtems.textContent)
                    listingre.appendChild(recipeİtems);  
                });
                document.getElementById("aboutMeal").addEventListener("click",() => {                   
                    document.getElementById("recipe").style.display = "block";    })
                document.getElementById("hide-recipe").addEventListener("click",() => {
                    document.getElementById("recipe").style.display = "none";     })
                       
            }).catch(() => {
                result.innerHTML = `<h1>Invalid input</h1>`
            })
        }

