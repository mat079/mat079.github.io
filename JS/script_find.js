//INITIALIZATION AND FCTS GAME
const btnPlayAgain = document.querySelector('.textAgain');
const loadingScreen = document.querySelector('.loading-area');
const textResponse = document.getElementById('response');
const textGoodResponse = "This is the fake ! You win ! ";
const textBadResponse = "This is the real picture ! You lose ! ";

var imageSrcReal = '';
var imageSrcFake = '';
var idImgReal = '';
var idImgFake = '';
var idDivImgFake = '';
var idDivImgReal = '';
var imgReal = '';
var imgFake = '';
var divImgFake = '';
var divImgReal = '';


function getRandomInt(max){
	return Math.floor(Math.random() * max);
}

function fetchRealImage(_imageElt,_url) {
	fetch(_url)
	.then(res => res.text())
	.then(rep => {
		//Remove additional text and extract only JSON:
		const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
		imageSrcReal = jsonData["table"]["rows"][0]["c"][0]["v"];
		_imageElt.src=imageSrcReal;
	})
}

function fetchFakeImage(_imageElt,_url){
	//fetch needed to refresh image of the site
	fetch(_url,{mode:'no-cors'})
	.then(res => {
		_imageElt.src=_url;
	})
}


function exitLoadingScreen(){
	loadingScreen.style.display = "none";
}
function enterLoadingScreen(){
	loadingScreen.style.display = "block";
}


function loadMainFct(){
	enterLoadingScreen();

	//real image
	const sheetId = '1FKiLMAQoYpx_Oqw-OOYnIED5DESY2a3ynRuSZHkaVHE';
	const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
	const sheetName = 'LinksImage';
	var randomPics = getRandomInt(21);
	var query = encodeURIComponent(`Select C where A=${randomPics}`)
	var urlReal = `${base}&sheet=${sheetName}&tq=${query}`
	
	//fakeImage
	urlFake = 'https://www.thispersondoesnotexist.com/image';
	
	//set RandomPosition of images
	var randomPositionFake = getRandomInt(2);
	var randomPositionReal = 0;
	if (randomPositionFake === 0){
		var randomPositionReal = 1;
	}
	idImgFake = "img"+randomPositionFake.toString();
	idImgReal = "img"+randomPositionReal.toString();
	idDivImgReal = "divImage"+randomPositionReal.toString();
	idDivImgFake = "divImage"+randomPositionFake.toString();

	//select img element
	imgReal = document.getElementById(idImgReal);
	imgFake = document.getElementById(idImgFake);
	divImgFake = document.getElementById(idDivImgFake);
	divImgReal = document.getElementById(idDivImgReal);
	imgFake.classList.add("fake");
	//set src on both image
	fetchRealImage(imgReal,urlReal);
	fetchFakeImage(imgFake,urlFake);

	//wait that images are loaded
	setTimeout(exitLoadingScreen,600);
}

function clickOnImage(_imgReal,_imgFake,_divImgFake,_divImgReal){
	_imgFake.style.opacity = "0.7";
	_imgReal.style.opacity = "0.7";
	imgFake.classList.remove("fake");
	_divImgFake.style.backgroundColor = 'green';
	_divImgReal.style.backgroundColor = 'red';

}


/*----------
--RUNNING---
-----------*/
loadMainFct();

imgReal.addEventListener('click',  function(e){
	var target = e.target;
	if(target.classList.contains("fake")){
		textResponse.innerHTML=textGoodResponse;
	}
	else if (textResponse.innerHTML.length == 0){
		textResponse.innerHTML= textBadResponse;
	}
	clickOnImage(imgReal,imgFake,divImgFake,divImgReal);
})

imgFake.addEventListener('click', function(e){
	var target = e.target;
	if(target.classList.contains("fake")){
		textResponse.innerHTML=textGoodResponse;
	}
	else if (textResponse.innerHTML.length == 0){
		textResponse.innerHTML= textBadResponse;
	}
	clickOnImage(imgReal,imgFake,divImgFake,divImgReal);

})

btnPlayAgain.addEventListener('click', () =>{
	//reset properties
	imgReal.style.opacity = "1";
	imgFake.style.opacity = "1";
	imgReal.style.opacity = "1";
	imgFake.style.opacity = "1";
	divImgFake.style.backgroundColor = 'none';
	divImgReal.style.backgroundColor = 'none';
	textResponse.innerHTML="";
	loadMainFct();

})

//HAMBURGER MENU TOGGLE
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
let menuOpen = false;

menuBtn.addEventListener('click', () =>{
    if(!menuOpen){
        menuBtn.classList.add('open');
        navMenu.style.display = "flex";
        menuOpen = true;

    } else{
        menuBtn.classList.remove('open');

        navMenu.style.display = "none";
        menuOpen = false;
    }
})