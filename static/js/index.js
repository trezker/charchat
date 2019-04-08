var loginViewModel = function() {
	var self = this;
	self.username = '';
	self.password = '';
	self.error = ko.observable(false);
	self.error_string = ko.observable("");
	self.authenticated = ko.observable(false);

	self.sign_in = function() {
		var data = ko.toJS(this);
		data.action = "user/sign_in";
		post(data).then(function(returnedData) {
		    if(returnedData.success == true) {
		    	self.authenticated(true);
				self.error(false);
				self.initialize_userpage();
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

	self.sign_out = function() {
		var data = { action: "user/sign_out" }
		post(data).then(function(returnedData) {
			self.authenticated(false);
		});
	}

	self.initialize_userpage = function() {
		post({action: "conversation/waiting"}).then(function(returnedData) {
			if(returnedData.length > 0) {
				//show chat interface
			}
			else {
				//Show message "No conversations waiting"
			}
		});
	}
};

ko.applyBindings(new loginViewModel());