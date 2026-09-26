# Gulp Starter

Gulp 4 build setup for static sites. It assembles HTML from partials, compiles SCSS, bundles JavaScript with webpack, converts images and fonts for the web and serves the result with live reload. Built in December 2021.

## Features

- Pages: every `.html` file at the top of `src/` becomes a page in `build/`. `@@include` pulls in partials such as `src/html/header.html`, and the `@img/` alias in HTML and SCSS resolves to the images folder.
- Styles: Dart Sass compiles `src/scss/style.scss` into `build/css/style.css` and `style.min.css`. The production build groups media queries, adds vendor prefixes (grid included), adds `.webp` and `.no-webp` variants of background image rules and minifies `style.min.css`.
- Scripts: webpack bundles `src/js/app.js` and its ES modules into `build/js/app.min.js`, in development or production mode. The sample module `isWebp()` adds a `webp` or `no-webp` class to the `html` element for those background rules.
- Images: the production build writes a WebP copy of every JPG and PNG, wraps every non-SVG image tag in a `picture` element with a WebP source, and compresses the originals with imagemin. SVG files are copied as they are.
- Fonts: the fonts step converts `.otf` files in `src/fonts/` to `.ttf`, then `.ttf` files to `.woff` and `.woff2` in `build/fonts/` (see Notes for a bug in its last step).
- Cache busting: the production build appends a `?_v=` query with the build date and time to CSS and JS links and records the value in `gulp/version.json`.
- Development server: Browsersync serves `build/` on port 3000, and the watcher rebuilds and updates the browser after changes to HTML, SCSS, JavaScript and images. Errors in these tasks and in the font tasks show a desktop notification (gulp-notify), and gulp-plumber keeps the watcher running.
- SVG sprite: a separate task stacks the icons from `src/svgIcons/` into `build/img/icons/icons.svg` and writes an example HTML page.

## Tech stack

- **Styling:** Sass (Dart Sass 1 through gulp-sass 5), gulp-autoprefixer 8, gulp-group-css-media-queries 1, gulp-clean-css 4, gulp-webpcss 1
- **Tooling:** Gulp 4 with an ES module gulpfile, webpack 5 through webpack-stream 7, Browsersync 2, gulp-file-include 2, gulp-webp 4 with gulp-webp-html-nosvg 1, gulp-imagemin 8, gulp-fonter and gulp-ttf2woff2 4, gulp-svg-sprite 1, gulp-version-number

## Getting started

You need Node.js 16 or 18 and npm.

```bash
git clone https://github.com/androfficial/html-gulp-starter.git
cd html-gulp-starter
npm install
npm run dev
```

Browsersync opens the site from `build/` at `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Deletes `build/`, runs the build tasks in development mode, then serves `build/` with Browsersync and watches `src/` (the default `gulp` task) |
| `npm run build` | Deletes `build/` and runs the build tasks in production mode (`gulp build --build`) |
| `npm run svgSprite` | Builds the SVG sprite from `src/svgIcons/` into `build/img/icons/` |

## Project structure

```text
gulpfile.js        task graph: dev (default), build and svgSprite
gulp/config/       path.js (source, build and watch globs), plugins.js (shared plugins), ftp.js (empty)
gulp/tasks/        one file per task: reset, copy, html, scss, js, images, fonts, server, svgSprite
gulp/version.json  cache busting value written by the production build
src/index.html     sample page; every top-level .html file in src/ becomes a page
src/html/          partials for @@include
src/scss/          style.scss, the stylesheet entry (empty in the starter)
src/js/            app.js, the script entry, and modules/functions.js with isWebp()
src/img/           images (one sample JPG)
src/fonts/         .otf and .ttf fonts to convert (create when needed)
src/svgIcons/      icons for the SVG sprite (create when needed)
src/files/         files copied as they are to build/files/ (create when needed)
```

## Notes

- The last fonts step, `fontsStyle`, is broken: it passes the list of font files where the path to `src/scss/fonts.scss` belongs, so it never writes that file, and `npm run dev` and `npm run build` fail as soon as `src/fonts/` holds `.otf` or `.ttf` files.
- `svgSprite` is not part of `dev` or `build`, and both start by deleting `build/`, so run it after them.
- In development mode `style.min.css` and `app.min.js` keep their names but are not minified, so the HTML links the same files in both modes.
- The repository has no lockfile, so `npm install` resolves the newest versions that the ranges in `package.json` allow.
