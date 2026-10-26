// This script runs in the head so the theme is chosen before CSS paints the page.
const themeStorageKey = "qaiPersonalWebsite.theme";
const systemTheme = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
let manualTheme = null;
let themeToggle = null;

// Storage can be unavailable, including when index.html is opened as a local file.
try {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
        manualTheme = savedTheme;
    }
} catch {
    // Continue with the system preference when a saved choice cannot be read.
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    // The button does not exist yet when this function first runs in the head.
    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", theme === "dark");
    }
}

function getSystemTheme() {
    return systemTheme && systemTheme.matches ? "dark" : "light";
}

applyTheme(manualTheme || getSystemTheme());

// Follow device changes only until the visitor makes an explicit choice.
if (systemTheme) {
    systemTheme.addEventListener("change", function () {
        if (manualTheme === null) {
            applyTheme(getSystemTheme());
        }
    });
}

// Wait for the HTML button before attaching its click handler and revealing it.
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
            // The manual choice still applies to this page when saving is blocked.
        }
    });

    themeToggle.hidden = false;
});

// Load decorative video only when motion is allowed; keep the poster as fallback.
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
        // If autoplay is blocked, retain the static poster without extra controls.
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
    // Source errors do not bubble to video; the last source means both failed.
    video.querySelector("source:last-child").addEventListener("error", showPosterFallback);

    if (reducedMotion) {
        reducedMotion.addEventListener("change", followMotionPreference);
    }
    followMotionPreference();
});
