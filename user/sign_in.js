var passwordHash = require('password-hash');

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
			const user = await conn.query("SELECT id from user where name = ?", [username]);
			const credential = await conn.query("select value from credential where user_id = ? and type = 'password'", [user[0].id]);
			if(passwordHash.verify(password, credential[0].value)) {
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
