module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'sergio.siccha@gmail.com',
                password: '',
                branch: 'tutorial-5',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}
