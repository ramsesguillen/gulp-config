// eslint-disable-line
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const concat = require('gulp-concat');


const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}


function javascript() {
    return src( paths.js )
            .pipe( concat('bundle.js') )
            .pipe( dest('./build/js') );
}


function imagenes() {
    return src( paths.imagenes )
            .pipe( imagemin() )
            .pipe( dest('./build/img') )
            .pipe( notify({ message: 'Imagen Minificada'}))
}


function css( done ) {
    return src( paths.scss )
            .pipe( sass() )
            .pipe( dest('./build/css') )
}

function minificarcss( done ) {
    return src( paths.scss )
            .pipe( sass({
                outputStyle: 'compressed'
            }))
            .pipe( dest('./build/css') )
}


function watchArchivos() {
    watch( paths.scss, minificarcss ); //: * = La carpeta actual - ** = Todos los archivos con esa extensión
    watch( paths.js, javascript );
}

exports.css = css;
exports.javascript = javascript;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, watchArchivos );