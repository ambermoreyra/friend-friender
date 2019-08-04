var friends = require("../data/friends");

module.exports = function (app) {

	app.get("/api/friends", function (req, res) {

		res.json(friends);
	});

	app.post("/api/friends", function (req, res) {
		// req.body hosts is equal to the JSON post sent from the user
		// This works because of our body parsing middleware
		var newFriend = req.body;

		// Initialize a match score and an matchIndex of 0
		var matchScore = 41;
		var matchIndex = 0;

		// once we have the new friend
		// we need to compare the friend to our existing list of friends
		for (var i = 0; i < friends.length; i++) {
			var friendScore = 0;

			// so loop through each score to compare to our newFriend's corresponding score
			for (var j = 0; j < friends[i].scores.length; j++) {
				var score = parseInt(friends[i].scores[j]);
				friendScore += Math.abs(score - parseInt(newFriend.scores[j]));
			}

			if (friendScore < matchScore) {
				matchIndex = i;
				matchScore = friendScore;
			}
		}
		// After all that is done, push our new friend into the list
		friends.push(newFriend);

		// Finally, return some info to the ajax request
		res.json(friends[matchIndex]);
	});
}