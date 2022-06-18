let btn = document.querySelector(".search-btn");
let inputText = document.getElementById("search-input");
let audio = document.getElementById("sound");
let result = document.getElementById("result");

btn.addEventListener("click",() => {

    
    let finalURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputText.value}`;
    fetch(finalURL).then((resp) => resp.json()).then((data) => {
        
        Myword = data[0]

        console.log(Myword) // veriye eriştik.
        console.log(Myword.word)  // kelime
        console.log(Myword.phonetics[0].audio) // ses
        console.log(Myword.meanings[0].partOfSpeech) // noun or adjective
        console.log(Myword.phonetics[1].text) // text
        console.log(Myword.meanings[0].definitions[0].definition) // description

        // for(let i=0; i < Myword.meanings.length ;i++) {
        //     console.log(Myword.meanings[i].definitions)
        // }
        result.innerHTML = `
        <div class="wordandicon">
                <h2 class="word">${Myword.word}</h2>
                <button onclick="playSound()" class="icon">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="wrapper">
                <div class="adjective">
                    <div class="pronouns">${Myword.meanings[0].partOfSpeech}</div>
                    <div class="tel">${Myword.phonetics[1].text || Myword.phonetic }</div>
                    </div>
                    <div class="whatsmean">${Myword.meanings[0].definitions[0].definition}</div>
            </div>
            <div class="example">${Myword.meanings[0].definitions[0].example || ""}</div>`

            
            
            
        }).catch(() => {
            result.innerHTML = `<h3>Couldn't Find The Word</h3>`
        })
    });
    function playSound() {
        audio.setAttribute("src", `${Myword.phonetics[0].audio}`)
        audio.play();
    }
