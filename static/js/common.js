var post_mocks = {
	"user/login": function() {
		return new Promise(function(resolve, reject) {
			resolve({success: true});
		});
	}
};

function post(data) {
	if(typeof post_mocks[data.action] !== "undefined") {
		console.log(post_mocks[data.action]);
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

