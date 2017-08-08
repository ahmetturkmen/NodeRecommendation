
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

    })
    .catch((err) => { console.log(err) })


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

getTracks('Hailey')
