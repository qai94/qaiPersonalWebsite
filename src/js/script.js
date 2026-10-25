// Find the HTML button by its ID and store its reference in a constant.
const themeToggle = document.getElementById("theme-toggle");

// Show the button only when JavaScript is available to make it work.
themeToggle.hidden = false;

// Run this function each time the user clicks the button.
themeToggle.addEventListener("click", function () {
    // Toggle the body class: add it if absent, remove it if present.
    // The result is true when the class is present, or false when removed.
    const darkModeEnabled = document.body.classList.toggle("dark-mode");

    // Update aria-pressed so screen readers can announce whether dark mode is on.
    themeToggle.setAttribute("aria-pressed", darkModeEnabled);
});
