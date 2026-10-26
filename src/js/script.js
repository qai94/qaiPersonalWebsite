// Pre-choose theme based on system preference
const themeStorageKey = "qaiPersonalWebsite.theme";
const systemTheme = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
let manualTheme = null;
let themeToggle = null;

// Check for saved theme preference in browser storage
try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
        manualTheme = savedTheme;
    }
} catch {
    // Continue with the system preference when a saved choice cannot be read
}

// Apply the theme to the document and update the toggle button state
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", theme === "dark");
    }
}

function getSystemTheme() {
    return systemTheme && systemTheme.matches ? "dark" : "light";
}

applyTheme(manualTheme || getSystemTheme());

// Follow device changes only until the visitor makes a choice
if (systemTheme) {
    systemTheme.addEventListener("change", function () {
        if (manualTheme === null) {
            applyTheme(getSystemTheme());
        }
    });
}

// Wait for HTML button before attaching click handler 
document.addEventListener("DOMContentLoaded", function () {
    themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) {
        return;
    }

    applyTheme(manualTheme || getSystemTheme());

    themeToggle.addEventListener("click", function () {
        manualTheme = document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";
        applyTheme(manualTheme);

        try {
            window.localStorage.setItem(themeStorageKey, manualTheme);
        } catch {
            // The manual choice still applies to this page when saving is blocked
        }
    });

    themeToggle.hidden = false;
});

// Load decorative video when motion is allowed but keep poster as fallback
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("hero-video");
    const reducedMotion = typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (!video) {
        return;
    }

    function followMotionPreference() {
        if (reducedMotion && reducedMotion.matches) {
            video.pause();
            video.hidden = true;
            return;
        }

        const sources = video.querySelectorAll("source");
        if (!sources[0].getAttribute("src")) {
            sources.forEach(function (source) {
                source.src = source.dataset.src;
            });
            video.load();
        }
        video.hidden = video.readyState < 2;
        // If autoplay is blocked, retain static poster
        video.play().catch(function () {
            video.hidden = true;
        });
    }

    video.addEventListener("loadeddata", function () {
        video.hidden = Boolean(reducedMotion && reducedMotion.matches);
    });
    function showPosterFallback() {
        video.hidden = true;
    }

    video.addEventListener("error", showPosterFallback);
    video.querySelector("source:last-child").addEventListener("error", showPosterFallback);

    if (reducedMotion) {
        reducedMotion.addEventListener("change", followMotionPreference);
    }
    followMotionPreference();
});

// Enhance footer anchor without removing the no-JavaScript fallback
document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("back-to-top");
    const top = document.getElementById("top");
    const footer = document.querySelector(".page-footer");
    if (!backToTop || !top || !footer) {
        return;
    }

    function updateBackToTop() {
        backToTop.hidden = window.scrollY <= window.innerHeight &&
            document.activeElement !== backToTop;
        // Lift icon above the footer
        const clearance = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
        backToTop.style.setProperty("--footer-clearance", clearance + "px");
    }

    backToTop.classList.add("is-floating");
    backToTop.addEventListener("click", function () {
        top.focus({ preventScroll: true });
        // Native #top anchor performs the immediate scroll
    });
    backToTop.addEventListener("blur", updateBackToTop);
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);
    window.addEventListener("pageshow", updateBackToTop);
    updateBackToTop();
});
