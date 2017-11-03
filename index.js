module.exports = function() {
	var self = {};

	var package = require("./package.json");
	self.name = package["name"];
	self.version = package["version"];

	var settings = require("./lib/settings")();

	self.settings = function() {
		return settings;
	}

	return self;
}