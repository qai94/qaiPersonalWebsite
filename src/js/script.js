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

// Initialise the project preview separately so it never depends on the theme button.
document.addEventListener("DOMContentLoaded", function () {
    const previewButton = document.getElementById("project-preview-button");
    const previewDialog = document.getElementById("project-preview");
    const closeButton = document.getElementById("project-preview-close");

    if (!previewButton || !previewDialog || !closeButton ||
        typeof previewDialog.showModal !== "function") {
        return;
    }

    previewButton.addEventListener("click", function () {
        previewDialog.showModal();
        closeButton.focus();
    });

    closeButton.addEventListener("click", function () {
        previewDialog.close();
    });

    // Native Escape dismissal also fires close, restoring focus to the opener.
    previewDialog.addEventListener("close", function () {
        previewButton.focus();
    });

    previewButton.hidden = false;
});
