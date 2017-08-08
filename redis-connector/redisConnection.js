
const data = require('./import-data')
const redis = require('redis');
const redisClient = redis.createClient();

let userNames = [];
let getKeys = new Promise(function (resolve, reject) {
    redisClient.keys('*', (err, responde) => {
        if (err)
            reject(err);
        else
            resolve(responde);
    });
});
getKeys
    .then((arrayOfElements) => {
        arrayOfElements.forEach((elementsInElementArray) => {
            userNames.push(elementsInElementArray)
        });

    })
    .then(() => {
        console.log(userNames)
    })
    .then(() => {
        getTracks('Veronica');
    })
    .then(() => {
        getChildKeyValues('Veronica')
    })
    .catch((err) => { console.log(err) })



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

function getTracks(user) {
    let promiseOnKeys = new Promise(function (resolve, reject) {
        redisClient.hgetall(user, (err, response) => {
            if (err)
                reject('Failed');
            else
                resolve(response);
        });
    });
    promiseOnKeys
        .then((trackPoints) => {
            console.log(JSON.stringify(trackPoints))
        })
        .catch((err) => { console.log(err) })
}
