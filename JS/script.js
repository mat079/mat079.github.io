//HAMBURGER MENU TOGGLE
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', () =>{
    if(!menuOpen){
        menuBtn.classList.add('open');
        menuOpen = true;
    } else{
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
})

//DARK MODE TOGGLE
const darkModeBtn = document.getElementById('switch');
let darkMode = false;

darkModeBtn.addEventListener('click', () =>{
    if(!darkMode){
        darkModeTransition();
        document.documentElement.setAttribute('data-theme','dark')
        darkMode = true;
    } else{
        darkModeTransition();
        document.documentElement.setAttribute('data-theme','light')
        darkMode = false;
    }
})


let darkModeTransition = () =>{
    document.documentElement.classList.add('transition');
    window.setTimeout(() =>{
        document.documentElement.classList.remove('transition')
    },1000)
}
