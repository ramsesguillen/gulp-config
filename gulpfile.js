// eslint-disable-line
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');


const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'
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
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, imagenes, watchArchivos );