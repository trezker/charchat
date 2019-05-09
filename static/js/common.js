var post_mocks = {/*
	"user/sign_in": function(data) {
		if(data.username.length > 0) {
			return new Promise(function(resolve, reject) {
				resolve({success: true});
			});
		}
		else {
			return new Promise(function(resolve, reject) {
				resolve({success: false});
			});
		}
	},*/

	"user/sign_out": function(data) {
		return new Promise(function(resolve, reject) {
			resolve({success: true});
		});
	},

	"conversation/create": function(data) {
		console.log(data);
		if(data.text == "fail") {
			return new Promise(function(resolve, reject) {
				resolve({success: false});
			});
		}
		return new Promise(function(resolve, reject) {
			resolve({success: true});
		});
	},

	"conversation/active": function(data) {
		return new Promise(function(resolve, reject) {
			resolve({
				success: true,
				conversations: [
					{
						title: "Sven",
						waiting_for_you: false,
						log: [
							{ text: "Hej" },
							{ text: "Hallå" }
						]
					},
					{
						title: "Bertil",
						waiting_for_you: true,
						log: [
							{ text: "Hola" },
							{ text: "Grande" },
						]
					}
				]
			});
		});
	}
};

function post(data) {
	if(typeof post_mocks[data.action] !== "undefined") {
		return post_mocks[data.action](data);
	}

	return fetch(
		"/api/" + data.action, 
		{
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(data),
		}
	).then(handleFetchResponse);
}

var handleFetchResponse = function (response) {
	return response.json().then(
		function (json) {
			if (response.ok) {
				return json;
			} else {
				return Promise.reject(response);
			}
		}
	).catch(function() {
		return Promise.reject(response);
	});
};

