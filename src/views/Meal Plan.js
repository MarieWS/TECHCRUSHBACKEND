const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener( 'click', () => {
        navLinks.forEach( link => link.classList.remove('active'));
        link.classList.add('active');
    });
});