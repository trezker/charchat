var loginViewModel = function() {
	var self = this;
	self.username = '';
	self.password = '';
	self.error = ko.observable(false);
	self.error_string = ko.observable("");
	self.authenticated = ko.observable(false);
	
	self.pages = ko.observableArray([
		{ name: 'find', text: "Find" }, 
		{ name: 'new', text: "New" }, 
		{ name: 'chat', text: "Chat" }
	]);
	self.current_page = ko.observable(self.pages()[2]);

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

	self.new_conversation = {
		text: "dawd"
	};
	self.show_new_conversation_feedback = ko.observable(false);
	self.new_conversation_feedback = ko.observable("");

	self.conversations = ko.observableArray([]);
	self.current_conversation = ko.observable();
	self.conversation_log = ko.observableArray();

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
		post({action: "conversation/active"}).then(function(returnedData) {
			if(returnedData.success == true) {
				self.conversations(returnedData.conversations);
				console.log(self.conversations());
				//show chat interface
			}
			else {
				//Show error message
			}
		});
	};

	self.create_conversation = function() {
		var data = ko.toJS(self.new_conversation);
		data.action = "conversation/create";
		post(data).then(function(returnedData) {
			self.show_new_conversation_feedback(true);
			if(returnedData.success == true) {
				self.new_conversation_feedback("New conversation created."); 
			} else {
				self.new_conversation_feedback("Failed to create conversation."); 
			}
		});
	};

	self.show_conversation = function(e) {
		self.current_conversation(e);
		self.conversation_log(e.log);
		console.log(self.current_conversation());
	}
};

ko.applyBindings(new loginViewModel());