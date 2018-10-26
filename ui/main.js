const hamburgerIcon = document.getElementById('hamburger');
const menu = document.getElementById('navigation');
const main = document.getElementById('dashboard');

let showMenu = false;

hamburgerIcon.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menu.classList.add('hide');
        main.style.marginLeft = "0px";
        main.style.maxWidth = "100vw";
        showMenu = true;
    } else {
        menu.classList.remove('hide');
        menu.classList.add('show');
        main.style.marginLeft = "250px";
        main.style.maxWidth = "calc(100vw - 250px)";
        showMenu = false;
    }
}