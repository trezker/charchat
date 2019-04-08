var loginViewModel = function() {
	var self = this;
	self.username = '';
	self.password = '';
	self.error = ko.observable(false);
	self.error_string = ko.observable("");
	self.sign_in = function() {
		var data = ko.toJS(this);
		data.action = "user/log_in";
		post(data).then(function(returnedData) {
		    if(returnedData.success == true) {
		    	console.log("yes");
		    }
			else {
				self.error(true);
				self.error_string("Could not log in.");
			}
		});
	};

	self.sign_up = function() {
		var data = ko.toJS(this);
		data.action = "user/sign_up";
		post(data).then(function(returnedData) {
			if(returnedData.success == true) {
				loginViewModel.sign_in();
			}
			else {
				self.error(true);
				self.error_string("Could not create account.");
			}
		});
	};
};

ko.applyBindings(new loginViewModel());