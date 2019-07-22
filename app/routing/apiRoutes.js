//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.


// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");



module.exports = function(app) {

    app.get("/api/friends", function(req, res) {

        res.json(friends);
    });

	app.post("/api/friends", function(req, res) {
		// req.body hosts is equal to the JSON post sent from the user
		// This works because of our body parsing middleware
		var newFriend = req.body;
		console.log(newFriend);

		// Initialize a best friend score and an empty best friend
		var matchScore = 40;
		// When we first get the newFriend, we have no best friend to compare them to
		var matchIndex = 0;

		// once we have the new friend
		// we need to compare the friend to our existing list of friends
		for (var i = 0; i < friends.length; i++) {
			var friendScore = 0;
			// friend.scores is an array of integers
			// so loop through each score to compare to our newFriend's corresponding score
			for (var j = 0; j < friends[i].scores.length; j++) {
				var score = parseInt(friends[i].scores[j]);
				friendScore += Math.abs(score - parseInt(newFriend.scores[j]));
			}

			// The first time through, match and matchScore will be null
			// So the first friend we compare will always be the first match
			if (friendScore < matchScore) {
				matchIndex = i;
				matchScore = friendScore;
			}
		}

		console.log(friends[matchIndex]);
		// After all that is done, push our new friend into the list
		friends.push(newFriend);
		
		// Finally, return some info to the ajax request
		res.json(friends[matchIndex]);
	}); 
}