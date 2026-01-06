
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

// ===================================================
// 👤 SIMPLE AUTH UI (LocalStorage currentUser)
// ===================================================
function getCurrentUser() {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function updateUserMenuUI() {
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdownName = document.getElementById('userDropdownName');
    const userLoginLink = document.getElementById('userLoginLink');
    const userLogoutButton = document.getElementById('userLogoutButton');
    const iconEl = userMenuButton ? userMenuButton.querySelector('i') : null;

    if (!userMenuButton || !userDropdownName || !userLoginLink || !userLogoutButton) return;

    const user = getCurrentUser();
    if (user) {
        userDropdownName.textContent = user.name || user.email || 'User';
        userLoginLink.style.display = 'none';
        userLogoutButton.style.display = 'block';
        if (iconEl) {
            iconEl.classList.remove('far');
            iconEl.classList.add('fas');
        }
        userMenuButton.title = user.name || 'Account';
    } else {
        userDropdownName.textContent = '';
        userLoginLink.style.display = 'block';
        userLogoutButton.style.display = 'none';
        if (iconEl) {
            iconEl.classList.remove('fas');
            iconEl.classList.add('far');
        }
        userMenuButton.title = 'Login / Sign up';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdown = document.getElementById('userDropdown');
    const userLogoutButton = document.getElementById('userLogoutButton');

    if (!userMenuButton || !userDropdown || !userLogoutButton) return;

    updateUserMenuUI();

    userMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        userDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
            userDropdown.classList.remove('open');
        }
    });

    userLogoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.replace('./form.html');
    });
});


// CART SYSTEM (LocalStorage) – STEP 1

// Select all Add to Cart buttons
const addCartButtons = document.querySelectorAll(".btn-cart");

// Get cart from localStorage or empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Create cart badge in navbar
const cartIcon = document.querySelector(".nav-icons .fa-shopping-cart");
let badge = document.createElement("span");
badge.classList.add("cart-badge");
cartIcon.parentElement.appendChild(badge);

// Function to update badge
function updateCartBadge() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}
updateCartBadge(); // initial badge update

// Add to cart button click event
addCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            e.preventDefault();
            localStorage.setItem('auth_redirect_message', 'Firstly create an account or login to add items to cart.');
            window.location.href = './form.html#signup';
            return;
        }

        const productCard = button.closest(".product-card");
        const name = productCard.querySelector("h3").textContent;
        const price = parseFloat(productCard.querySelector(".price").textContent.replace("$", ""));
        const image = productCard.querySelector("img").src;

        // Check if product already in cart
        let existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update badge
        updateCartBadge();

        // Show alert
        alert(`${name} added to cart!`);
    });
});
