const redis = require('redis');
const redisClient = redis.createClient();
var values =[];

redisClient.flushall();

redisClient.hmset('Angelica', { "Blues Traveler": 3.5, "Broken Bells": 2.0, "Norah Jones": 4.5, "Phoenix": 5.0, "Slightly Stoopid": 1.5, "The Strokes": 2.5, "Vampire Weekend": 2.0 });
redisClient.hmset('Bill', { "Blues Traveler": 2.0, "Broken Bells": 3.5, "Deadmau5": 4.0, "Phoenix": 2.0, "Slightly Stoopid": 3.5, "Vampire Weekend": 3.0 });
redisClient.hmset('Dan', { "Blues Traveler": 3.0, "Broken Bells": 4.0, "Deadmau5": 4.5, "Phoenix": 3.0, "Slightly Stoopid": 4.5, "The Strokes": 4.0, "Vampire Weekend": 2.0 });
redisClient.hmset('Hailey', { "Broken Bells": 4.0, "Deadmau5": 1.0, "Norah Jones": 4.0, "The Strokes": 4.0, "Vampire Weekend": 1.0 });
redisClient.hmset('Jordyn', { "Broken Bells": 4.5, "Deadmau5": 4.0, "Norah Jones": 5.0, "Phoenix": 5.0, "Slightly Stoopid": 4.5, "The Strokes": 4.0, "Vampire Weekend": 4.0 });
redisClient.hmset('Sam', { "Blues Traveler": 5.0, "Broken Bells": 2.0, "Norah Jones": 3.0, "Phoenix": 5.0, "Slightly Stoopid": 4.0, "The Strokes": 5.0 });
redisClient.hmset('Veronica', { "Blues Traveler": 3.0, "Norah Jones": 5.0, "Phoenix": 4.0, "Slightly Stoopid": 2.5, "The Strokes": 3.0 });


function getKeyPromise(){
let getKeys = new Promise(function(resolve, reject){ 
    redisClient.keys('*',(err,responde)=>{
        if(err)
            reject(err);
        else 
            resolve(responde);
    
    });
});
getKeys
.then((element)=>{
    element.forEach((elementsInElementArray) =>{
        values.push(elementsInElementArray)
    });
    console.log(values)
})
.catch((reason)=>{console.log(reason)})
}
getKeyPromise();
















// function getValues(user) {
//     redisClient.HGETALL(user, (err, value) => {
//         if (err)
//             throw err;
//         console.log(value);
//     });
// };




// getKeys();
// getValues()
//  console.log(hmKeys)
