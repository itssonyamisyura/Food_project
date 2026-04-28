function animations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    const targetSections = document.querySelectorAll('.preview, .offer, .calculating, .menu, .promotion, .footer');
    
    targetSections.forEach(section => {
        section.classList.add('fade-in-hidden');
        observer.observe(section);
    });
}

export default animations;
