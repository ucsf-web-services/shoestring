// TODO 
// - Saucelabs Automated testing on build
"use strict";
var gulp        = require("gulp"),
    $           = require("gulp-load-plugins")(),
    del         = require("del"),
    // BrowserSync isn"t a gulp package, and needs to be loaded manually
    browserSync = require("browser-sync"),
    merge       = require("merge-stream"),
    reload      = browserSync.reload,
    pkg         = require('./package.json'),
  Server      = require('karma').Server,
    bs;

// UTILITIES //
// Checks for erros with jekyll and url errors
gulp.task("doctor", $.shell.task("jekyll doctor"));


// Deletes the directory that is used to serve the site during development
gulp.task("clean:dev", del.bind(null, ["serve"]));
// Deletes the directory that the optimized site is output to
gulp.task("clean:prod", del.bind(null, ["_gh_pages"]));
// Runs the build command for Jekyll to compile the site locally // This will build the site with the production settings
gulp.task("jekyll:dev", $.shell.task("jekyll build"));
gulp.task("jekyll-rebuild", ["jekyll:dev"], function () {
  reload;
});

gulp.task("jekyll:prod", $.shell.task("jekyll build --config _config.build.yml")); // took _config.yml, out 
  
// Compiles the SASS files and moves them into the "dist and server" directory
gulp.task("styles:dev", function () {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src("scss/shoestring.scss")
    .pipe($.sass())
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer("last 1 version", { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest("docs/dist/css/"))
    .pipe(gulp.dest("_serve/dist/css"))
    .pipe(gulp.dest("dist/css/"))
    // Outputs the size of the CSS file
    .pipe($.size({title: "styles"}))
    // Injects the CSS changes to your browser since Jekyll doesn't rebuild the CSS
    .pipe(reload({stream: true}));
});

gulp.task("styles:prod", function () {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src("scss/shoestring.scss")
    .pipe($.sass())
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer("last 1 version", { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest("docs/dist/css/"))
    .pipe(gulp.dest("_gh_pages/dist/css"))
    .pipe(gulp.dest("dist/css/"))
    // Outputs the size of the CSS file
    .pipe($.size({title: "styles"}))
    // Injects the CSS changes to your browser since Jekyll doesn't rebuild the CSS
    .pipe(reload({stream: true}));
});
  
// Optimizes the images that exists
gulp.task("images", function () {
  return gulp.src("docs/assets/img/**")
    .pipe($.changed("site/assets/images"))
    .pipe($.imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true
    }))
    .pipe(gulp.dest("site/_gh_pages/assets/img"))
    .pipe($.size({title: "images"}));
});
  
// Copy over fonts to the "site" directory
gulp.task("fonts", function () {
  return gulp.src("docs/assets/fonts/**")
    .pipe(gulp.dest("site/assets/fonts"))
    .pipe($.size({ title: "fonts" }));
});
  
// Copy xml and txt files to the "site" directory
gulp.task("copy", function () {
  return gulp.src(["_gh_pages/*.txt", "_gh_pages/*.xml"])
    .pipe(gulp.dest("site"))
    .pipe($.size({ title: "xml & txt" }))
});

// Optimizes all the CSS, HTML and concats the JS etc
gulp.task("html", ["styles:prod"], function () {
  var assets = $.useref.assets({searchPath: "_gh_pages"});
  return gulp.src("docs/**/*.html")
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if("*.js", $.uglify({preserveComments: "some"})))
    // Minify CSS
    .pipe($.if("*.css", $.minifyCss()))
    // Start cache busting the files
    .pipe($.revAll({ ignore: [".eot", ".svg", ".ttf", ".woff"] }))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Minify HTML
    .pipe($.if("*.html", $.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Send the output to the correct folder
    .pipe(gulp.dest("_gh_pages"))
    .pipe($.size({title: "optimizations"}));
});
  
  
// Deploys to Github Pages for live site !!WARNING do not run this task!!
// Not that you can without ssh access to master repo anyway. Don't change either way.
var options = { 
  remoteUrl: 'git@github.com:ucsf-web-services/shoestring.git',
  branch: 'gh-pages'};

gulp.task('deploy', function() {
  return gulp.src("./_gh_pages/**/*")
    .pipe($.ghPages(options));
});
  
// Run JS Lint against your JS
gulp.task("jslint", function () {
  gulp.src("./dist/js/*.js")
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint(".jshintrc"))
    .pipe($.jshint.reporter());
});
    
// Browsersync serving server from _serve
gulp.task("serve:dev", ["styles:dev", "jekyll:dev"], function () {
  bs = browserSync({
    notify: true,
    // tunnel: "",
    server: {
      baseDir: "_serve"
    }
  });
});

// Serve the site after optimizations to see that everything looks fine
gulp.task("serve:prod", function () {
  bs = browserSync({
    notify: false,
    // tunnel: true,
    server: {
      baseDir: "_gh_pages"
    }
  });
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});

gulp.task('remote-test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done);
});

// Watch for changes 
gulp.task("watch", function () {
  gulp.watch(["docs/**/*.md", "docs/*.html", "docs/**/*.html", "docs/**/*.xml", "docs/**/*.txt", "docs/**/*.js", "docs/**/*.css"], ["jekyll-rebuild"]);
  gulp.watch(["dist/css/*.css"], reload);
  gulp.watch(["docs/assets/css/*.css"], reload);
  gulp.watch(["js/*.js"], reload);
  gulp.watch(["scss/*.scss"], ["styles:dev"]);
});
    
// Default task, run when just writing "gulp" in the terminal
gulp.task("default", ["serve:dev", "watch"]);
// Checks your CSS, JS and Jekyll for errors
gulp.task("check", ["jslint", "doctor"], function () {});
// Builds the _gh_pages for production, but doesn't serve it to you. 
gulp.task("build", ["jekyll:prod", "styles:prod"], function () {});

// Builds your site with the "build" command and then runs all the optimizations on
// it and outputs it to "./_gh_pages"
// !WARNING do not publish. Pull requests for default docs build only

gulp.task("publish", ["build", "deploy"], function () {
  gulp.start("html", "copy", "images", "fonts");
});