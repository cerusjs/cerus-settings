"use strict";

//module.exports = require("./lib/settings");

module.exports = function() {
	var self = {};

	var package = require("./package.json");
	self.name = package["name"];
	self.version = package["version"];

	var settings = require("./lib/settings")();
	self.settings = settings.settings;

	return self;
}