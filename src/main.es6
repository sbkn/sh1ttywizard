import Promise from "promise";
import AWS from "aws-sdk";

export default class Main {

	/**
	 * Get the complete configuration file for given service from given bucket.
	 *      In bucket there has to be a json file named the same as the service.
	 * @param {Object} args Arguments
	 * @param {string} args.serviceName Name of service to get config for
	 * @param {string} args.bucketName Name of bucket where the configs are
	 */
	static getConfig(args) {

		console.info(`Will get service config for ${args.serviceName} ..`);

		return new Promise((resolve, reject) => {

			const params = {
				Bucket: args.bucketName,
				Key: args.serviceName
			};

			const s3 = new AWS.S3();

			s3.getObject(params, (err, data) => {
				console.info(err, data);
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
}
