var post_mocks = {
	"user/log_in": function(data) {
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
	);
};

