import {assert} from "chai";
import Main from "../src/main.es6";

describe("#Main", () => {

	describe("getConfig", () => {

		it("does awesome stuff", done => {

			const args = {
				serviceName: "testService",
				bucketName: "testBucket"
			};

			Main.getConfig(args)
				.then(config => {
					console.log(config);
					done();
				})
				.catch(err => {
					done(new Error(err));
				});
		});
	});

	describe("createConfig", () => {

		it("does awesome stuff", () => {

			const config = {
				enabled: true
			};

			const schema = {
				title: "Config for Awesome Service",
				description: "The config",
				type: "object",
				properties: {
					enabled: {
						description: "The unique identifier for a product",
						type: "boolean"
					}
				},
				required: ["enabled"]
			};

			const args = {
				serviceName: "testService",
				bucketName: "testBucket",
				config,
				schema
			};

			Main.createConfig(args)
				.then(result => {
					console.log(result);
					done();
				})
				.catch(err => {
					done(new Error(err));
				});
		});
	});

	describe("_validateConfigFile", () => {

		it("does validate correctly (true)", () => {

			const config = {
				enabled: true
			};

			const schema = {
				title: "Config for Awesome Service",
				description: "The config",
				type: "object",
				properties: {
					enabled: {
						description: "The unique identifier for a product",
						type: "boolean"
					}
				},
				required: ["enabled"]
			};

			const result = Main._validateConfigFile(config, schema);
			assert.equal(result, true, "should return true");
		});

		it("does validate correctly (false)", () => {

			const config = {
				enabled: true
			};

			const schema = {
				title: "Config for Awesome Service",
				description: "The config",
				type: "object",
				properties: {
					enabled: {
						description: "The unique identifier for a product",
						type: "boolean"
					}
				},
				required: ["enabled", "name"]
			};

			const result = Main._validateConfigFile(config, schema);
			assert.equal(result, false, "should return false");
		});
	});
});
