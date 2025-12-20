
        let slideIndex = 1;
        let slideTimer;

        function showSlides(n) {
            let slides = document.getElementsByClassName("slide");
            let dots = document.getElementsByClassName("dot");
            
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            
            slides[slideIndex - 1].classList.add("active");
            dots[slideIndex - 1].classList.add("active");
            
            clearTimeout(slideTimer);
            slideTimer = setTimeout(() => changeSlide(1), 5000);
        }

        function changeSlide(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        showSlides(slideIndex);

        // Scroll Animation
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
            const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-scale-in, .animate-slide-left, .animate-slide-right, .animate-bounce-in, .animate-stagger');
            animateElements.forEach(el => observer.observe(el));
        });
   