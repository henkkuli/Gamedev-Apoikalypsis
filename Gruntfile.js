module.exports = function (grunt) {
    var path = require('path');
    // Map from files to dependent tasks
    var fileTasks = {};
    // Done function generator
    function addToWatch(task, files) {
        if (!(files instanceof Array))
            files = [files];
        files.forEach(function (file) {
            // Resolve file path to its full length
            file = path.resolve(file);
            // Create file entry in the list if not existing
            if (!fileTasks[file])
                fileTasks[file] = [];
            // Don't create doublicates
            if (fileTasks[file].indexOf(task) !== -1)
                return;
            // Add the task to the list
            fileTasks[file].push(task);
        });
    }
    function makeDoneFunction(task) {
        return function (done, output) {
            output = require('rjs-build-analysis').parse(output);
            output.bundles.forEach(function (bundle) {
                addToWatch(task, bundle.children);
            });
            // Update the watch list
            grunt.config('watch.all.files', Object.keys(fileTasks));
            // Signal that we are done here
            done();
        };
    }
    // Build different RequireJS tasks
    var requirejsOptions = {
        options: {
            baseUrl: 'build/ts',
            paths: {
            },
            optimize: grunt.option('minify') ? 'uglify2' : 'none'
        },
        // Main program
        main: {
            options: {
                name: 'app',
                out: 'build/app.js',
                done: makeDoneFunction('requirejs:main')
            }
        }
    };

    // Style sheets
    var lessOptions = {
        options: {
            compress: grunt.option('minify')
        },
        main: {
            files: {
                'build/styles.css': 'styles/main.less'
            }
        }
    };
    grunt.initConfig({
        requirejs: requirejsOptions,
        less: lessOptions,
        typescript: {
            main: {
                src: 'src/**/*.ts',
                dest: 'build/ts',
                options: {
                    module: 'amd',
                    target: 'es5',
                    basePath: 'src',
                    sourceMap: true
                }
            }
        },
        watch: {
            options: {
                spawn: false
            },
            typescript: {
                files: 'src/**/*.ts',
                tasks: ['typescript']
            },
            requirejs: {
                files: 'build/ts/**/*.js',
                tasks: ['requirejs']
            },
            less: {
                files: 'styles/**/*.less',
                tasks: ['less']
            }
        },
        clean: ['build/**/*']
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-typescript');
    grunt.registerTask('default', ['typescript', 'requirejs', 'less']);
    grunt.registerTask('develop', ['default', 'watch']);
};