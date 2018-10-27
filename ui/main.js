const hamburgerIcon = document.getElementById('hamburger');
const menu = document.getElementById('navigation');
<<<<<<< HEAD
const main = document.getElementById('dashboard');

let showMenu = false;
=======
let showMenu = true;
>>>>>>> 25441e81e1a8ad3aba502345725e7e794feb699f

hamburgerIcon.addEventListener('click', toggleMenu);

function toggleMenu() {
<<<<<<< HEAD
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
=======
    showMenu = !showMenu
    if (showMenu === true) {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
>>>>>>> 25441e81e1a8ad3aba502345725e7e794feb699f
    }
}