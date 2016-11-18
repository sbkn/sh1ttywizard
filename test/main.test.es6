import Main from "../src/main.es6";

describe("doAwesomeStuff", () => {

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
