// JavaScript code for speed type game web app.

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('textDisplay')
const quoteInputElement = document.getElementById('textInput')
const timerElement = document.getElementById('timer')
const outputerror = document.getElementById('error-output')
const outputaccuracy = document.getElementById('accuracy-output')
const button = document.getElementById('start')

window.onkeydown = function (event) {   // This is the function to prevent use of backSapce.
    if (event.which == 8) { 
        event.preventDefault(); 
        alert("BackSpace is 'NOT ALLOWED'");
    } 
};

button.addEventListener('click', function () {
    document.getElementById('instruction').style.display = 'none'
    reset()
    renderNewQuote()
})

var totalError = 0
var count = 0

var countDisplay = 0
var countInput = 0
var error = 0
var accuracy = 0

quoteInputElement.addEventListener('input', (e) => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    error = 0

    if (e.inputType == "deleteContentBackward") {
        console.log(e)
        countInput--
    }else {
        countInput++
    }

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('incorrect')
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            error++
        }
    })

    outputerror.innerHTML = totalError + error
    accuracy = (countInput - (totalError + error))
    accuracy = ((accuracy / countInput) * 100)
    outputaccuracy.innerHTML = Math.round(accuracy)

    if (countDisplay == countInput){
        renderNewQuote()
        totalError += error
    }
})

let startTime
let mytime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    mytime = setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

async function renderNewQuote() {
    count++
    if (count > 3) {
        finishGame()
    }else if(count == 1){
        const quote = await getRandomQuote()
        quoteDisplayElement.innerHTML = ''
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
            countDisplay++
        })
        quoteInputElement.value = null
        startTimer()
    }else {
        const quote = await getRandomQuote()
        quoteDisplayElement.innerHTML = ''
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
            countDisplay++
        })
        quoteInputElement.value = null
    }
}

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

function finishGame() {
    quoteDisplayElement.innerHTML = "Click start button to Restart Speed type game"
    quoteInputElement.value = ""

    clearInterval(mytime)
    button.style.display = 'block'
    document.getElementById('instruction').style.display = 'block'
}

function reset() {
    countDisplay = 0
    countInput = 0
    error = 0
    accuracy = 0
    totalError = 0
    count = 0

    quoteDisplayElement.value = ""
    quoteInputElement.value = ""
    outputerror.innerHTML = 0
    outputaccuracy.innerHTML = 0
    button.style.display = 'none'
}
