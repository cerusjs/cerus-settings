module.exports = function() {
	var self = {};

	var package = require("../package.json");
	var settings = {};

	self.name = package["name"];
	self.version = package["version"];

	self.setting = function(key, default_, func) {
		if(typeof key !== "string") {
			throw new TypeError("argument key must be a string");
		}

		if(typeof func !== "function") {
			func = function() {}
		}

		settings[key] = default_;

		func(default_);

		var keys = key.split(".");
		var self_ = self;

		for(var i = 0; i < keys.length; i++) {
			var key_ = keys[i];

			if(i < (keys.length - 1)) {
				if(self_[key_] == null) {
					var self__ = {};

					if(self_ instanceof Function) {
						self_()[key_] = function() {
							return self__;
						}
					}
					else {
						self_[key_] = function() {
							return self__;
						}
					}
					
					self_ = self__;
				}
				else {
					self_ = self_[key_]();
				}
			}
			else {
				var func_ = function(value) {
					if(value != null) {
						settings[key] = value;

						func(default_);
					}

					return settings[key];
				}

				if(self_ instanceof Function) {
					self_()[key_] = func_;
				}
				else {
					self_[key_] = func_;
				}
			}
		}
	}

	return self;
}