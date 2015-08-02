module.exports = function(grunt){
	//Project config
	grunt.initConfig({
		//--- watch 
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true
				}
			},
			js:{
				files:['public/assets/js/**','schemas/**','models/**'],
				options:{
					livereload:true
				}
			}

		},
		//--- nodemon
		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**'],
					watchedExtensions:['js'],
					watchedFolder:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000

					},
					cwd:__dirname
				}


			}
		},
		//--- concurrent
		concurrent:{
			// miss uglify
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}

		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	//--- 避免语法等错误导致grunt停止工作
	// Default tasks
	grunt.option('force',true);
	grunt.registerTask('default',['concurrent']);

}