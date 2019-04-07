var loginViewModel = function() {
	var self = this;
	self.username = '';
	self.password = '';
	self.failed_sign_up = ko.observable(false);
	self.sign_in = function() {
		var data = ko.toJS(this);
		data.action = "user/login";
		post(data).then(function(returnedData) {
			console.log(returnedData);
		    if(returnedData.success == true) {
		    	console.log("yes");
	    		window.location.href = window.location.href;
		    }
		});
	};

	self.sign_up = function() {
		var data = ko.toJS(this);
		data.action = "user/sign_up";
		post(data).then(function(returnedData) {
			console.log(returnedData);
			if(returnedData.success == true) {
				loginViewModel.sign_in();
			}
			else
			{
				self.failed_sign_up(true);
			}
		});
	};
};

ko.applyBindings(new loginViewModel());