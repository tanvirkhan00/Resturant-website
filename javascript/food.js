const navMenu =document.getElementById('nav-menu');
const toggleMenu =document.getElementById('nav-toggle');
const closeMenu =document.getElementById('nav-close');

toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show')
})

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show')
})