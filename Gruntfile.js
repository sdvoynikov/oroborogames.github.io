module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        watch: {
            options: { livereload: false },
            debug: {
                files: [
                    "./**/*.js"
                ],
                tasks: ["run-debug"],
                options: {
                    spawn: false
                }
            }
        },

        express: {
            debug: {
                options: {
                    script: "server.js",
                    background: true,
                    port: 3000
                }
            }
        },

        env: {
            debug: {
                DEBUG: "1"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-env");

    grunt.registerTask("default", ["watch-debug"]);

    grunt.registerTask("run-debug", [
        "env:debug",
        "express:debug"
    ]);

    grunt.registerTask("watch-debug", [
        "run-debug",
        "watch:debug"
    ]);
};
