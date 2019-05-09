var passwordHash = require('password-hash');

module.exports = {
	initialize: function(dbpool) {
		var self = this;
		self.sign_up = new sign_up(dbpool);

		self.handler = async function(req, res) {
			var result = await self.sign_up.attempt(req.body.username, req.body.password);
			console.log(result);
			res.send(result);
		}
	}
}

function sign_up(dbpool) {
	var self = this;
	self.dbpool = dbpool;
	self.attempt = async function(username, password) {
		var result = {};
		let conn;
		try {
			conn = await self.dbpool.getConnection();
			const create = await conn.query("INSERT INTO user (name) value (?)", [username]);
			const user = await conn.query("SELECT id from user where name = ?", [username]);
			const res = await conn.query(
				"INSERT INTO credential (user_id, type, value) value (?, 'password', ?)", 
				[user[0].id, passwordHash.generate(password)]
			);
			result.success = true;
		} catch (err) {
			result.success = false;
		} finally {
			if (conn)
				conn.end();
			return result;
		}
	}
}
