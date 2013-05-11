module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'src/main',
				test: 'src/test'
			},
			bin: {
				coverage: 'bin/coverage'
			}
		},
		jasmine: {
			coverage: {
				src: '<%= meta.src.main %>/js/*.js',
				options: {
					specs: '<%= meta.src.test %>/js/*.js',
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: '<%= meta.bin.coverage %>/coverage.json',
						report: [
							{
								type: 'html',
								options: {
									dir: '<%= meta.bin.coverage %>/html'
								}
							},
							{
								type: 'text-summary'
							}
						],
						template: require('grunt-template-jasmine-requirejs'),
						templateOptions: {
							requireConfig: {
								baseUrl: '.grunt/grunt-contrib-jasmine/<%= meta.src.main %>/js/'
							}
						}
					}
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.registerTask('test:coverage', ['jasmine:coverage']);
};