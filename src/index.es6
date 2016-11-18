import Main from "./main.es6"

const getServiceConfig = (args) => {

	return Main.getConfig(args);
};

module.exports = {

	getServiceConfig: getServiceConfig
};
