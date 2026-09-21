# Forum of Tajik Freethinkers - website 

A multilingual website for a civil society organization "Forum of Tajik Freethinkers". Made for a real client.

Live demo: https://saidbek191.github.io/Sherzamonov/

![Home page]("https://github.com/user-attachments/assets/683d99a8-ab7c-427b-b803-4e1067f2df43" />)

## Features

- 10 pages: Home, Blog, articles, About, Contact
- Three languages: English, Russian, Tajik. The selected language persists across pages
- Articles are loaded from Markdown files in the selected language
- Responsive layout: desktop, laptop, tablet, mobile
- Semantic markup, pages pass validation on validator.w3.org
- Keyboard navigation with visible focus outline

## Tech stack

- HTML5
- SCSS, BEM methodology
- Vanilla JavaScript
- JSON for UI translations, Markdown for articles
- Git, Prettier

## How to run locally  

1. Clone the repository
2. Open the folder in VS Code
3. Run it with the Live Server extension. Double-clicking on `index.html` won't work: translations and articles are loaded with `fetch`, and browsers don't allow this for files opened directly
4. To edit styles, turn on Live SASS Compiler (Watch Sass)

## Known limitations
- The contact form doesn't work on GitHub Pages: it sends data through PHP, and GitHub Pages can't run PHP 
