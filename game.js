const RANDOM_QUOTE_API_URL ="http://api.quotable.io/random"
const displayQuote=document.getElementById("textDisplay");
const inputQuote=document.getElementById("textInput");
const timer=document.getElementById("timer");

inputQuote.addEventListener("input",() => {
	const arrayQuote =displayQuote.querySelectorAll("span")
	const arrayValue=inputQuote.value.split("")
	let correct=true;
	arrayQuote.forEach((charSpan,index) =>{
		const character=arrayValue[index]
		if(character== null){
			charSpan.classList.remove("correct");
			charSpan.classList.remove("incorrect");
			correct=false;
		}
		else if(character===charSpan.innerText){
			charSpan.classList.add("correct");
			charSpan.classList.remove("incorrect");

		}else{
			charSpan.classList.add("incorrect");
			charSpan.classList.remove("correct");
			correct=false;
		}
	})
	if(correct) renderNewQuote()
})
function getRandom(){
	return fetch(RANDOM_QUOTE_API_URL)
	 .then(response => response.json())
	 .then(data=>data.content)
}

async function renderNewQuote(){
	const quote = await getRandom()
	displayQuote.innerHTML=" ";
	quote.split("").forEach(character => {
		const charSpan=document.createElement("span");
		charSpan.innerText=character
		displayQuote.appendChild(charSpan)
	})
	inputQuote.value=null
	setTimer()
}
let start
function setTimer(){
	timer.innerText=0;
	start=new Date()
	setInterval(() => {
		timer.innerText=getTimerTime()

	},1000)
}
function getTimerTime(){
	return Math.floor((new Date() - start)/1000)
}
