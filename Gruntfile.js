module.exports = function (grunt) {
    // Build different RequireJS tasks
    var requirejsOptions = {
        options: {
            baseUrl: 'build/ts',
            paths: {
                jquery: '../../lib/jquery'
            },
            optimize: grunt.option('minify') ? 'uglify2' : 'none'
        },
        // Main program
        main: {
            options: {
                name: 'app',
                out: 'build/app.js'
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
                    sourceMap: true,
                    references: ['lib/**/*.d.ts']
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