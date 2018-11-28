const hamburgerIcon = document.getElementById('hamburger');
const menu = document.getElementById('navigation');
let showMenu = true;

hamburgerIcon.addEventListener('click', function toggleMenu() {
    showMenu = !showMenu
    if (showMenu === true) {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

