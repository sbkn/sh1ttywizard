module.exports = function (grunt) {

	const fs = require("fs");
	const nodeModules = {};

	fs.readdirSync("node_modules")
		.filter(function (x) {
			return [".bin"].indexOf(x) === -1;
		})
		.forEach(function (mod) {
			nodeModules[mod] = "commonjs " + mod;
		});

	grunt.initConfig({

		eslint: {
			options: {
				configFile: ".eslintrc"
			},
			target: [
				"Gruntfile.js",
				"**/*.es6"
			]
		},

		webpack: {

			options: {

				// webpack options
				entry: {
					"index": "./src/index.es6"
				},

				target: "node",

				output: {
					path: "./",
					filename: "[name].js",
					libraryTarget: "umd"
				},

				externals: nodeModules,

				stats: {
					colors: true,
					modules: false,
					reasons: false
				},

				progress: false,
				failOnError: true,
				watch: false,
				keepalive: false,

				module: {
					loaders: [
						{
							test: /\.es6?$/,
							exclude: /(node_modules|bower_components)/,
							loader: "babel",
							query: {
								cacheDirectory: true,
								sourceMaps: true
							}
						}
					]
				}
			},

			debug: {}

		},

		shell: {
			mocha: {
				command: "node node_modules/mocha/bin/_mocha test/**/*.es6" +
				" -t 6000"
			},
			cover: {
				command: "node node_modules/isparta/bin/isparta cover" +
				" node_modules/mocha/bin/_mocha --include src/**/*.es6" +
				" src/*.es6 -- test/**/*.es6 -t 6000"
			},
			publish_patch: {
				command: "npm version patch && npm publish"
			},
			publish_minor: {
				command: "npm version minor && npm publish"
			},
			publish_major: {
				command: "npm version major && npm publish"
			}
		},

		clean: {
			build: ["dist", "coverage", "doc"]
		},

		esdoc: {
			dist: {
				options: {
					source: "./src",
					destination: "./doc",
					coverage: true,
					test: {
						type: "mocha",
						source: "./test",
						includes: ["\\.(es6)$"],
						excludes: ["\\.config\\.(js|es6)$"]
					}
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-webpack");
	grunt.loadNpmTasks("grunt-esdoc");
	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-contrib-clean");

	grunt.registerTask("release", ["build", "coverage", "esdoc"]);
	grunt.registerTask("build", ["clean:build", "eslint", "webpack:debug", "test"]);
	grunt.registerTask("test", ["shell:mocha"]);
	grunt.registerTask("coverage", ["shell:cover"]);
};
