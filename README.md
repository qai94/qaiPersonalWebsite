# Qaiyum Personal Website

A personal résumé website for Qaiyum Hamid, developed for **CSC574 - Dynamic Web Application Development, Assignment 1: HTML Personal Website (Resume)**.

**Live website:** [Qaiyum Personal Website](https://qai94.github.io/qaiPersonalWebsite/)

## About the website

Built with HTML5, external CSS and introductory JavaScript. The résumé includes profile, experience, education, skills, projects, certifications and achievements, and contact information.

Features include responsive layouts, section navigation, a skip-to-content link, a profile portrait, visible keyboard focus and a dark-mode toggle. No framework, backend, installation or build step is required.

## Assignment requirements

The assignment requires a personal résumé website using HTML and CSS, with external styling, correctly displayed images and working relative paths. It must work when `index.html` is opened locally in a browser.

The assessment totals **100 marks: 90 core marks and 10 bonus marks**. Bonus marks are included within the total, rather than added beyond 100. JavaScript is optional for the core assignment.

| Assessment criterion | Marks |
| --- | ---: |
| HTML structure and semantics | 15 |
| Résumé content and completeness | 15 |
| CSS styling and layout | 15 |
| Creativity and visual design | 10 |
| Navigation and usability | 10 |
| Responsive design | 5 |
| Images and accessibility | 5 |
| Code quality and maintainability | 10 |
| File organisation and submission | 5 |
| **Core total** | **90** |
| GitHub Pages deployment | 5 |
| JavaScript enhancement | 5 |
| **Overall total** | **100** |

The rubric prioritises semantic HTML, complete and relevant résumé content, consistent styling, personal branding, working navigation, desktop/tablet/mobile layouts, accessible images and text, and readable code.

For the GitHub Pages bonus, the public URL must work and all assets must load correctly. For the JavaScript bonus, the interaction must be functional, relevant and improve usability; this project implements a dark-mode toggle. These are assessment requirements, not a claim of awarded marks.

## Repository structure

```text
.github/workflows/static.yml   GitHub Pages deployment workflow
.gitignore                    Local-only files and folders
README.md                     Project overview and instructions
src/
├── index.html                Résumé page
├── css/style.css             Styles and responsive layouts
├── images/profile.jpg        Profile portrait
└── js/script.js              Dark-mode toggle
```

Assignment documents (`docs/`), reference materials (`references/`) and personal skill notes (`skills/`) are kept locally and excluded from Git through the root `.gitignore`.

## Run locally

1. Clone the repository or open your existing local checkout.
2. Open `src/index.html` in a browser.
3. Keep the `css/`, `images/` and `js/` folders alongside `index.html` so relative asset paths continue to work.

Check section navigation, the portrait and the dark-mode toggle. Review the layout at desktop, tablet and mobile widths, including keyboard navigation and enlarged text.

## GitHub Pages deployment

The website was deployed on **25 October 2026**. GitHub Actions publishes the contents of `src/` on pushes to `main`, using `.github/workflows/static.yml`. The upload path is `./src`, so `index.html` becomes the published site's entry page.

After pushing website changes, check the [deployment workflow](https://github.com/qai94/qaiPersonalWebsite/actions), then verify the live page, CSS, portrait and JavaScript. Local saves and commits alone do not update the live site.

## Submission packaging

The assignment requires one ZIP named:

```text
<student_id>-<student_name>.zip
```

Place the website inside a folder with the same student ID and name. For this project, copy the **contents of `src/`** into that folder:

```text
<student_id>-<student_name>/
├── index.html
├── css/style.css
├── images/profile.jpg
└── js/script.js
```

Keep project documentation, reference materials, personal notes, Git metadata and local testing artifacts outside the submission. Extract the ZIP and open its `index.html` to confirm the website and relative assets still work. Confirm the official student ID and name before preparing the final archive.
