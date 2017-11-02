module.exports = function() {
	var self = {};
	var settings_ = {};
	
	var settings = {};

	var sets = {};

	settings_.settings = function() {
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
			var self_ = function() {
				return self;
			}
			var sub_key;

			for(var i = 0; i < keys.length; i++) {
				var key_ = keys[i];

				if(sub_key === undefined) {
					sub_key = key_;
				}
				else {
					sub_key += "." + key_;
				}

				if(i < (keys.length - 1)) {
					if(self_()[key] === undefined) {
						var x = {};

						self_ = self_()[key_] = function() {
							return x;
						}
					}
					else {
						self_ = self_()[key];
					}
				}
				else {
					var func_ = function(value) {
						if(value != null) {
							settings[key] = value;

							if(func != null) {
								func(default_);
							}
						}

						return settings[key];
					}

					self_()[key_] = func_;
				}
			}
		}

		return self;
	}

	return settings_;
}