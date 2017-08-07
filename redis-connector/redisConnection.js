
const data = require('./import-data')
const redis = require('redis');
const redisClient = redis.createClient();
// Gets user name as a parent key 
function getKeyPromise() {
    let values = [];
    let getKeys = new Promise(function (resolve, reject) {
        redisClient.keys('*', (err, responde) => {
            if (err)
                reject(err);
            else
                resolve(responde);

        });
    });
    getKeys
        .then((element) => {
            element.forEach((elementsInElementArray) => {
                values.push(elementsInElementArray)
            });
            console.log(values)
        })
       





}

// Gets users' tracks like a child keys 

function getChildKeys(user) {
    let keyValues = [];
    let promiseOnKeys = new Promise(function (resolve, reject) {
        redisClient.hkeys(user, (err, response) => {
            if (err)
                reject('Failed');
            else
                resolve(response);
        });
    });

    promiseOnKeys
        .then((element) => {
            element.forEach(function (element) {
                keyValues.push(element);
            });
        })
        // .then(() => { console.log(keyValues) })
        .catch((err) => { console.log(err) })
}

// Gets childKey values which are rating points 
function getChildKeyValues(user) {
    let assignedChildKeyValues = [];
    let childKeyValues = new Promise(function (resolve, reject) {

        redisClient.HVALS(user, (err, responde) => {
            if (err)
                reject('Failed');
            resolve(responde);
        });

    });

    childKeyValues.then((arrayOfChildValues) => {
        arrayOfChildValues.forEach((element) => {
            assignedChildKeyValues.push(element);
        });

    })
        .then(() => {
            console.log(assignedChildKeyValues)
        })
        .catch((err) => { console.log(err) })
}
getKeyPromise();
// getChildKeys('Dan')
getChildKeyValues('Dan')




/* 

async function minkowski(userRating1, userRating2, lambda) {
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
async function computeNearestNeighbor(username, users) {
    let distances = [], userDistanceCombination;
    for (let user of Object.keys(users))
        if (user != username) {
            distance = manhattan(users[user], users[username]);
            userDistanceCombination = { "distance": distance, "user": user };
            distances.push(userDistanceCombination);
        }
    distances.sort(function (a, b) { return a.distance - b.distance })
    return distances;
}
async function getTracks(user) { let tracks = users[user]; return tracks; }

async function giveRecommendation(user) {
    let neighborRating = getTracks(computeNearestNeighbor(user, users)[0].user)
    let userRating = getTracks(user), recommendation = [];
    for (let key of Object.keys(neighborRating))
        if (neighborRating.hasOwnProperty(key) && !userRating.hasOwnProperty(key))
            recommendation.push(neighborRating[key] + '  ' + key);
    return recommendation.sort().reverse();
}
function manhattan(user1, user2) {
    let distance = 0;
    for (let track of Object.keys(user1))
        if (track in user2)
            distance += Math.abs(user1[track] - user2[track]);
}
function euclidean(user1, user2) {
    let distance = 0;
    for (let track of Object.keys(user1))
        if (track in user2)
            distance += ((user1[track] - user2[track]) ** 2);
}

 */


