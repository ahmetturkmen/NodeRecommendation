const users = require('./users');

// Manhattan method 
function manhattan(user1, user2) {
    let distance = 0;
    for (let track of Object.keys(user1))
        if (track in user2)
            distance += Math.abs(user1[track] - user2[track])
    return distance;
}

// Euclidean method
function euclidean(user1, user2) {
    let distance = 0;
    for (let track of Object.keys(user1))
        if (track in user2)
            distance += ((user1[track] - user2[track]) ** 2);

    return Math.sqrt(distance)
}

// Implementing Minkwoski Distance
function minkowski(userRating1, userRating2, lambda) {
    let distance = 0, commonRatingStatu = false;
    for (let track of Object.keys(userRating1)) {
        if (userRating2.hasOwnProperty(track)) {
            distance += Math.abs(((userRating1[track] - userRating2[track]) ** lambda));
        }
    }
    commonRatingStatu = true;
    if (commonRatingStatu)
        return (distance ** 1 / lambda);
    return 0;
}

// Computes nearest neighbor
function computeNearestNeighbor(username, users) {
    let distances = [],distance, userDistanceCombination;
    for (let user of Object.keys(users))
        if (user !== username) {
            distance=euclidean(users[user],users[username]);
            // distance = manhattan(users[user], users[username]);
            userDistanceCombination = { "distance": distance, "user": user };
            distances.push(userDistanceCombination);
        }
    distances.sort(function (a, b) { return a.distance - b.distance });
    return distances;
}
// Getting the tracks of the specified user
function getTracks(user) { let tracks = users[user]; return tracks; }

// Giving a recommendation for a specific user
function giveRecommendation(user) {
    let neighborRating = getTracks(computeNearestNeighbor(user, users)[0].user)
    let userRating = getTracks(user), recommendation = [];
    for (let key of Object.keys(neighborRating))
        if (neighborRating.hasOwnProperty(key) && !userRating.hasOwnProperty(key))
            recommendation.push(neighborRating[key] + '  ' + key);
    return recommendation.sort().reverse();
}
module.exports = {
    euclidean,
    manhattan,
    minkowski,
    giveRecommendation,
    computeNearestNeighbor,
    getTracks
}
