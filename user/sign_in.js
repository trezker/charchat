module.exports = {
	initialize: function(dbpool) {
		var self = this;
		self.sign_in = new sign_in(dbpool);

		self.handler = async function(req, res) {
			var result = await self.sign_in.attempt(req.body.username, req.body.password);
			console.log(result);
			res.send(result);
		}
	}
}

function sign_in(dbpool) {
	var self = this;
	self.dbpool = dbpool;
	self.attempt = async function(username, password) {
		var result = {};
		let conn;
		try {
			conn = await self.dbpool.getConnection();
			const res = await conn.query("SELECT name from user where name = ?", [username]);
			if(res.length == 1) {
				result.success = true;
			}
			else {
				result.success = false;
			}
		} catch (err) {
			result.success = false;
		} finally {
			if (conn)
				conn.end();
			return result;
		}
	}
}
