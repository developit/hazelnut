module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			main : {
				options: {
					//banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n',
					report : 'gzip'
				},
				files: {
					'<%= pkg.name %>.min.js': [
						'<%= pkg.name %>.js'
					]
				}
			}
		},
		jshint : {
			options : {
				browser : true
			},
			main : [
				'<%= pkg.name %>.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [
		'jshint:main',
		'uglify:main'
	]);

};
