//import "@babel/register";
//import 'babel-polyfill';
//
import { normalize } from 'path';
import gulp from 'gulp';

import watch from 'gulp-watch';
import less from 'gulp-less';
import replace from 'gulp-replace';
import gulpClean from 'gulp-clean';
import rename from 'gulp-rename';

import fs from 'fs';
import pump from 'pump';
import beautify from 'gulp-jsbeautifier';
import minify from 'gulp-terser';
//
let NODE_ENV = process.env.NODE_ENV;
NODE_ENV = NODE_ENV ? NODE_ENV.trim() : NODE_ENV;
console.log('current NODE_ENV is:', NODE_ENV);

// 工作目录
const WORKSPACE = normalize(__dirname);
const WORKSPACE_SRC = normalize(__dirname + '/src/');
const WORKSPACE_DIST = normalize(__dirname + '/dist/');

//别名占位替换
const alias = {
  //替换DEBUG标记
  '__DEBUG__': NODE_ENV === 'production' ? false : true,
};

//
const _reg_path_replace = /@\//gi;
const _reg_image_path_replace = /([\.\/]+)\/static\/images\/([^"']+\.(?:png|jpg|jpeg|gif))/gi;
//@占位符替换为相对路径
function replace_path() {
  //
  let _path = file.path;
  const file = this.file;
  //
  _path = _path.replace(WORKSPACE, '');
  //
  const _sp = _path.split(path.sep);
  const _a = [];
  _a.length = _sp.length - 2;
  //
  return _a.join('../');
}

//图片相对路径替换为绝对路径
function replace_image_path() {
  //
  let _path = file.path;
  const file = this.file;
  const args = arguments;
  const a0 = args[0];
  if (args.length >= 2) {
    //
    let a1 = args[1];
    //
    _path = normalize(_path.replace(WORKSPACE_SRC, '/'));
    //路径处理为一致
    _path = _path.replace(/\\/g, '/');
    //子包
    if (/^\/?pages\/?pkgs/.test(_path)) {
      //
      const res = /^(\/pages\/pkgs\/[^\/\\]+)\/(?:pages|includes|components)/.exec(_path);
      if (res && res.length >= 1) {
        //
        _path = res[1];
      }
    } else {
      //
      _path = '';
    }
    //
    return a0.replace(a1, _path);
  }
  //
  return a0;
}

//
function normalizeSrc(dir) {
  //
  return normalize(WORKSPACE_SRC + dir);
}
//
function normalizeSrcIgnore(dir) {
  //
  return '!' + normalizeSrc(dir);
}

function output(info) {
  //
  console.log(['---- ', info].join(''));
}
//
function dealFileTask(_src, _dest,cb) {
  //
  let tasks = [
    //
    gulp.src(_src),
    //占位处理
    replace(_reg_path_replace, replace_path),
    //图片相对路径替换为绝对路径
    replace(_reg_image_path_replace, replace_image_path),
    //DEBUG替换处理
    replace('__DEBUG__', alias.__DEBUG__),
    //
    gulp.dest(_dest)
  ];
  //
  pump(tasks,cb);
}
//
function dealOtherFileTask(_src, _dest,cb) {
  //
  const tasks = [
    gulp.src(_src),
    gulp.dest(_dest)
  ];
  //
  pump(tasks,cb);
}


function copyTask(cb) {
  //
  let _src = [
    normalizeSrc('/**/*.*'),
    normalizeSrcIgnore('/**/*.css'),
    normalizeSrcIgnore('/**/*.less'),
    normalizeSrcIgnore('/**/*.wxss'),
    normalizeSrcIgnore('/**/*-bak.*'),
    normalizeSrcIgnore('/pages/test/'),
    normalizeSrcIgnore('/pages/test/*.*')
  ];
  //
  //_src = _src.concat(normalizeBase64SrcIgnore());
  //console.log('copy src:',_src);
  //
  dealFileTask(_src, WORKSPACE_DIST,cb);
}

function dealCssTask(_src, _dest, cb) {
  //
  const tasks = [
    //
    gulp.src(_src),
    //占位处理
    replace(_reg_path_replace, replace_path),
    //less处理
    less(),
    //美化
    beautify({
      ".css": {
        "file_types": [
          ".css",
          ".vue",
          ".wxss",
          ".less"
        ]
      },
      "indent_char": "\t",
      "indent_size": 4,
    }),
    rename(function (file) {
      //重命名
      if (file.extname !== '.wxss') {
        //
        file.extname = ".wxss";
      }
      //
      return file;
    }),
    //
    gulp.dest(_dest)
  ];
  //
  pump(tasks, cb);
}
//
function wxssTask(cb) {
  //
  const _src = [
    normalizeSrc('/**/*.css'),
    normalizeSrc('/**/*.less'),
    normalizeSrc('/**/*.wxss'),
    normalizeSrcIgnore('/**/*-bak.*'),
    normalizeSrcIgnore('/pages/test/'),
    normalizeSrcIgnore('/pages/test/*.wxss')
  ];
  //
  dealCssTask(_src, WORKSPACE_DIST, cb)
}

//
function watchFn(path,cb) {
  //
  let _dist = path.replace(WORKSPACE_SRC, WORKSPACE_DIST).replace(/[^\/\\]+$/, '');
  //
  _dist = normalize(_dist);
  //
  if (/\.(?:css|less|wxss)$/.test(path)) {
    //
    dealCssTask(path, _dist,cb);
  } else if (/\.(?:png|jpeg|jpg|gif)$/i.test(path)) {
    //
    dealOtherFileTask(path, _dist,cb);
  }/*else if(isBase64Src(path)){
      //
      dealBase64FileTask(path,_dist);
  }*/else {
    //
    dealFileTask(path, _dist,cb);
  }
}


function watchTask(cb) {
  //
  const _src = [
    normalizeSrc('/**/*.css'),
    normalizeSrc('/**/*.less'),
    normalizeSrc('/**/*.wxss'),
    normalizeSrc('/**/*.js'),
    normalizeSrc('/**/*.wxml'),
    normalizeSrc('/**/*.json'),
    normalizeSrc('/**/*.(png|jpeg|jpg|gif)')
  ];
  //
  watch(_src, function (file) {
    const path = file.path;
    //删除文件
    if (!file.stat) {
      //
      return console.log(`File ${path} was deleted`);;
    }
    //
    console.log(`File ${path} was changed`);
    //
    watchFn(path,cb);
  })

  //
  return cb();
}
//
function uglifyTask(cb) {
  //
  const _src = [
    normalize(WORKSPACE_DIST + '/**/*.js')
  ]
  //
  pump([
    gulp.src(_src),
    minify({
      mangle: {
        reserved: ['__DEBUG__', 'wx', 'App', 'Page', 'Component', 'Behavior', 'getApp', 'getCurrentPages']
      },
      //ecma: 6,
      keep_fnames: true
    }),
    gulp.dest(WORKSPACE_DIST)
  ],
    cb
  )
}

export function clean(cb) {
  //
  if (!fs.existsSync(WORKSPACE_DIST)) {
    //
    console.log('dist is empty');
    //
    return cb && cb();
  }
  //
  const tasks = [
    //
    gulp.src(WORKSPACE_DIST),
    gulpClean()
  ];
  //
  pump(tasks, cb);
}

export const dev = gulp.series(copyTask, wxssTask, watchTask, function (cb) {
  //
  output('build develop success');
  //
  cb();
});

export const build = gulp.series(copyTask, wxssTask, uglifyTask, function (cb) {
  //
  output('build production success');
  //
  cb();
})

export default build;
