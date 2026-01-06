

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    // Check if mobile view
    function isMobile() {
        return window.innerWidth <= 768;
    }

    if (registerBtn && loginBtn && container) {
        registerBtn.addEventListener("click", () => {
            if (isMobile()) {
                // Mobile: Show signup form below login
                container.classList.add("active");
            } else {
                // Desktop: Original sliding behavior
                container.classList.add("active");
            }
        });

        loginBtn.addEventListener("click", () => {
            if (isMobile()) {
                // Mobile: Show only login form
                container.classList.remove("active");
            } else {
                // Desktop: Original sliding behavior
                container.classList.remove("active");
            }
        });
    }

    // Handle URL hash for mobile/desktop
    if (window.location.hash === "#signup") {
        if (isMobile()) {
            container.classList.add("active");
        } else {
            container.classList.add("active");
        }
    }

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("signup-name").value.trim();
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value;

            clearMessages();

            if (name.length < 2) return showError("Name must be at least 2 characters", this);
            if (!isValidEmail(email)) return showError("Invalid email", this);
            if (password.length < 6) return showError("Password must be at least 6 characters", this);

            const users = JSON.parse(localStorage.getItem("users") || "[]");

            if (users.find(u => u.email === email)) {
                return showError("User already exists", this);
            }

            users.push({ id: Date.now(), name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify({ name, email }));

            showSuccess("Registration successful!", this);

            setTimeout(() => window.location.href = "home.html", 1500);
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value;

            clearMessages();

            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) return showError("Invalid email or password", this);

            localStorage.setItem("currentUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            showSuccess("Login successful!", this);

            setTimeout(() => window.location.href = "home.html", 1500);
        });
    }

    // ---------- HELPERS ----------
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(msg, form) {
        showMessage(msg, "#fee", "#c53030", form);
    }

    function showSuccess(msg, form) {
        showMessage(msg, "#f0fff4", "#22543d", form);
    }

    function showMessage(msg, bg, color, form) {
        clearMessages();
        const div = document.createElement("div");
        div.textContent = msg;
        div.style.cssText = `
            background:${bg};
            color:${color};
            padding:10px;
            margin-bottom:10px;
            border-radius:5px;
            font-size:14px;
            width:100%;
            text-align:center;
        `;
        form.prepend(div);
    }

    function clearMessages() {
        document.querySelectorAll("form > div").forEach(d => d.remove());
    }
});
