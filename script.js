// script.js

document.addEventListener('DOMContentLoaded', function () {
    // **Code pour le menu latéral (sidebar)**
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');

    // Ouvrir le menu latéral
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
        document.body.classList.add('sidebar-open'); // Empêche le défilement du corps
    });

    // Fermer le menu latéral
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });

    // Empêcher la propagation du clic à l'intérieur du menu latéral
    sidebar.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('sidebar-open');
    });

    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });


    // **Code pour la réservation**
    const reservationLink = document.querySelector('.reservation-btn');
    const reservationSection = document.getElementById('reservation');
    const backToHomeBtn = document.getElementById('back-to-home');
    const sections = document.querySelectorAll('section:not(#reservation)');
    const nav = document.querySelector('header');

    // Clic sur le lien "Réservation"
    reservationLink.addEventListener('click', function (e) {
        e.preventDefault();
        // Masquer toutes les autres sections et le menu de navigation
        sections.forEach(section => section.style.display = 'none');
        nav.style.display = 'none';
        // Afficher la section Réservation
        reservationSection.style.display = 'block';
    });

    // Clic sur le bouton "Retour à l'accueil"
    backToHomeBtn.addEventListener('click', function () {
        // Réafficher toutes les sections et le menu de navigation
        sections.forEach(section => section.style.display = 'block');
        nav.style.display = 'block';
        // Masquer la section Réservation
        reservationSection.style.display = 'none';
    });

    // **Gestion des livres interactifs**
    const books = document.querySelectorAll('.book');

    books.forEach(function (book) {
        const cover = book.querySelector('.cover');
        const openButton = book.querySelector('.open-book');
        const pageControls = book.querySelector('.page-controls');
        const pages = book.querySelectorAll('.page');
        let currentPage = 0;

        // Sélection des boutons de navigation des pages
        const nextBtn = book.querySelector('.next-page');
        const prevBtn = book.querySelector('.prev-page');

        // Fonction pour mettre à jour l'état des pages
        function updatePages() {
            pages.forEach(function (page, index) {
                if (index < currentPage) {
                    page.classList.add('turned');
                } else {
                    page.classList.remove('turned');
                }
            });
        }

        // Ouvrir le livre
        openButton.addEventListener('click', function (e) {
            e.stopPropagation();
            book.classList.add('open');
            pageControls.style.display = 'flex';
            openButton.style.display = 'none';
        });

        // Fermer le livre en cliquant en dehors
        document.addEventListener('click', function (e) {
            if (!book.contains(e.target)) {
                book.classList.remove('open');
                pageControls.style.display = 'none';
                openButton.style.display = 'block';
                // Réinitialiser les pages
                currentPage = 0;
                updatePages();
            }
        });

        // Empêcher la propagation du clic à l'intérieur du livre
        book.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Événement pour le bouton suivant
        nextBtn.addEventListener('click', function () {
            if (currentPage < pages.length) {
                currentPage++;
                updatePages();
            }
        });

        // Événement pour le bouton précédent
        prevBtn.addEventListener('click', function () {
            if (currentPage > 0) {
                currentPage--;
                updatePages();
            }
        });
    });

    // Script pour faire défiler les annonces
    let slideIndex = 0;
    const slides = document.querySelectorAll('.annonce-slide');
    const totalSlides = slides.length;

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === slideIndex) {
                slide.classList.add('active');
            }
        });
        slideIndex = (slideIndex + 1) % totalSlides;
    }

    // Initialisation et affichage des slides toutes les 4 secondes
    showSlides();
    setInterval(showSlides, 4000);
});
