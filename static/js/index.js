var loginViewModel = function() {
	var self = this;
	self.username = '';
	self.password = '';
	self.error = ko.observable(false);
	self.error_string = ko.observable("");
	self.authenticated = ko.observable(false);
	self.search_results = ko.observableArray([
		{
			id: "doaiwdbn",
			text: "Talk about cars"
		},
		{
			id: "fwfogfin",
			text: "Talk about food"
		}
	]);

	self.pages = ko.observableArray([
		{ name: 'find', text: "Find" }, 
		{ name: 'new', text: "New" }, 
		{ name: 'chat', text: "Chat" }
	]);
	self.current_page = ko.observable(self.pages()[2]);

	self.show_page = function(e) {
		self.current_page(e);
	};

	self.sign_in = function() {
		var data = {
			action: "user/sign_in",
			username: self.username,
			password: self.password,
		}
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
		var data = {
			action: "user/sign_up",
			username: self.username,
			password: self.password,
		}
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
	};

	self.initialize_userpage = function() {
		post({action: "conversation/waiting"}).then(function(returnedData) {
			if(returnedData.length > 0) {
				//show chat interface
			}
			else {
				//Show message "No conversations waiting"
			}
		});
	};

	self.create_conversation = function() {

	};
};

ko.applyBindings(new loginViewModel());