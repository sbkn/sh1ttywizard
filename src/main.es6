import Promise from "promise";
import AWS from "aws-sdk";
import jsonschema from "jsonschema";

export default class Main {

	/**
	 * Get the complete configuration file for given service from given bucket.
	 *      In bucket there has to be a json file named the same as the service.
	 * @param {Object} args Arguments.
	 * @param {string} args.serviceName Name of service to get config for.
	 * @param {string} args.bucketName Name of bucket where the configs are.
	 * @returns {Promise}
	 */
	static getConfig(args) {

		console.info(`Will get service config for ${args.serviceName} ..`);

		return new Promise((resolve, reject) => {

			const s3 = new AWS.S3();

			const params = {
				Bucket: args.bucketName,
				Key: args.serviceName
			};

			/*s3.getObject(params, (err, data) => {
				console.info(err, data);
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			 });*/
			resolve("MOCK");
		});
	}

	/**
	 * Create a new configuration file.
	 *      This will validate the given definition against the given JSON schema and if valid,
	 *      upload to given S3 Bucket.
	 * @param {Object} args Arguments.
	 * @param {string} args.serviceName Name of service to get config for.
	 * @param {string} args.bucketName Name of bucket where the configs are.
	 * @param {Object} args.config Configuration definition to create.
	 * @param {Object} args.schema JSON schema to validate against.
	 * @returns {Promise}
	 */
	static createConfig(args) {

		console.info(`Will create service config for ${args.serviceName} ..`);

		return new Promise((resolve, reject) => {

			const configIsValid = Main._validateConfigFile(args.config, args.schema);

			if (!configIsValid) {
				reject("CONFIG_INVALID");
			} else {

				// Upload to bucket here.
				resolve(configIsValid);
			}
		});
	}

	/**
	 * Validate given configuration against given JSON schema.
	 * @param {Object} config Configuration to validate.
	 * @param {Object} schema Schema to validate against.
	 * @returns {boolean} Is it valid?
	 * @private
	 */
	static _validateConfigFile(config, schema) {

		const validate = jsonschema.validate;

		const validationResult = validate(config, schema);

		if (!validationResult.valid) {
			console.error("Validation of config against schema failed:\n", validationResult);
		}

		return validationResult.valid;
	}
}
