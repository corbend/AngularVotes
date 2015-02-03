angular.module('PollManagerApp').factory('FirebaseWrapper', function($firebase) {
	var factory = function() {
		var cache = {};

		this.setSession = function(name) {
			var dbName = "https://dazzling-heat-916.firebaseio.com/" + name;
			var db = cache[dbName];

			if (!db) {
				db = cache[dbName] = new Firebase("https://dazzling-heat-916.firebaseio.com/" + name);
			}

			this.db = db;
		}

		this.push = function(data) {
			$firebase(this.db).$asArray().$add(data);
		}

		this.boundAsArray = function() {
			return $firebase(this.db).$asArray();
		}

		this.boundAsObject = function() {
			return $firebase(this.db).$asObject();
		}

		this.get = function(objectId) {
			return $firebase(this.db).child(objectId).$asObject();
		}

		this.onChange = function(func) {
			this.db.on('value', function(snap) {
				func(snap);
			})
		}

		this.remove = function(dataId) {
			debugger;
			$firebase(this.db).$remove(dataId);
		}
	}

	return new factory();
})