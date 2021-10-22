let project_folder = require('path').basename(__dirname);
let source_folder  = "#src";

let fs = require('fs');

let path = {
	build: {
		html:   project_folder + '/',
		css:    project_folder + '/css/',
		js:     project_folder + '/js/',
		img:    project_folder + '/img/',
		fonts:  project_folder + '/fonts/',
		json:   project_folder + '/json/',
	},
	src: {
		favicon: source_folder  + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
		html:    [source_folder + '/*.html', '!' + source_folder + '/_*.html',],
		css:     source_folder  + '/scss/*.scss',
		js: 	 [source_folder + '/js/script.js', source_folder + '/js/vendors.js'],
		img:     source_folder  + '/img/**/*.{jpg,png,gif,ico,webp}',
		svg: 	 source_folder  + '/img/**/*.svg',
		fonts:   source_folder  + '/fonts/*.*',
		json:    source_folder  + '/json/*.*',
	},
	watch: {
		html:   source_folder  + '/**/*.html',
		css:    source_folder  + '/scss/**/*.scss',
		js:     source_folder  + '/js/**/*.js',
		img:    source_folder  + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		svg:    source_folder  + '/img/**/*.svg',
		json:   source_folder  + '/json/*.*',
	},
	clean: './' + project_folder + '/'
}

const {src, dest, parallel, series, watch}  = require('gulp');

const browsersync   = require('browser-sync').create();
const fileinclude   = require('gulp-file-include');
const del 	    = require('del');
const scss          = require('gulp-sass')(require('sass'));
const autoprefixer  = require('gulp-autoprefixer');
const group_media   = require('gulp-group-css-media-queries');
const clean_css     = require('gulp-clean-css');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify-es').default;
const imagemin      = require('gulp-imagemin');
const newer  		  = require('gulp-newer');
const notify 		  = require("gulp-notify");
const plumber 		  = require("gulp-plumber");

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: false,
		online: true
	})
}

function json() {
	return src(path.src.json, {})
		.pipe(dest(path.build.json))
		.pipe(browsersync.stream())
}

function html() {
	return src(path.src.html, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css, {})
		//src(['css/*.css',  '!css/file.css']) Исключить определенный файл с обработки 
		.pipe(
		  scss.sync({
			outputStyle: 'expanded',
		  }).on('error', notify.onError())
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function svgCopy() {
	return src(path.src.svg)
		.pipe(dest(path.build.img))
}

function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico"
			})
		)
		.pipe(dest(path.build.html))
}

function images() {
	return src(path.src.img)
		.pipe(newer(path.build.img))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}

function fontsStyle(done) {
	let file_content = fs.readFileSync(source_folder + '/scss/blocks/fonts.scss');
	if (file_content == '') {
	  fs.writeFile(source_folder + '/scss/blocks/fonts.scss', '', cb);
	  return fs.readdir(path.build.fonts, function (err, items) {
		 if (items) {
			 let c_fontname;
			 for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				if (c_fontname != fontname) {
					fs.appendFile(source_folder + '/scss/blocks/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
				 }
				c_fontname = fontname;
			}
		}
		done();
	 })
	}
	done();
 }

function cb() { //функция нужна для корректной работы функции fontsStyle

}

function watchFiles(params) {
	watch([path.watch.html], html);
	watch([path.watch.css],  css);
	watch([path.watch.js],   js);
	watch([path.watch.svg],  svgCopy);
	watch([path.watch.img],  images);
	watch([path.watch.json], json);
}

function clean(params) {
	return del(path.clean);
}
	
exports.fontsStyle    = fontsStyle;
exports.watchFiles    = watchFiles;
exports.svgCopy       = svgCopy;
exports.fonts      	 = fonts;
exports.images        = images;
exports.js         	 = js;
exports.css        	 = css;
exports.html      	 = html;
exports.json      	 = json;
exports.favicon 		 = favicon;
exports.default   	 = series(clean, parallel(js, html, json, svgCopy, favicon, images, fonts), fontsStyle, css, parallel(browserSync, watchFiles));

function cssBuild() {
	return src(path.src.css)
		.pipe(
		  scss({
			outputStyle: 'expanded'
		}))
		.pipe(
		  group_media()
		)
		.pipe(
		  autoprefixer({ 
			overrideBrowserslist: ['last 10 versions'],
			cascade: true,
			grid: true
		}))
		.pipe(dest(path.build.css))
		.pipe(
		  clean_css()	
		)
		.pipe(
		  rename({
			extname: '.min.css'
		}))
		.pipe(dest(path.build.css))
}

function jsBuild() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
		  uglify()
		)
		.pipe(
		  rename({
		  	extname: '.min.js'
		  })
		)
		.pipe(dest(path.build.js))
}

function optimazedImgBuild() {
	return src(path.src.img)
		.pipe(
		  imagemin({
		  	progressive: true,
		  	svgoPlugins: [{removeViewBox: false}],
		  	interlace: true,
		  	optimizationLevel: 3 // 0 to 7
		  })
		)
		.pipe(dest(path.build.img))
}

exports.build = series(clean, parallel(jsBuild, html, json, favicon, svgCopy, fonts), fontsStyle, cssBuild, optimazedImgBuild);
