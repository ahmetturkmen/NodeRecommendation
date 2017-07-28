const users = require('./users');

// Manhattan method 
function manhattan(user1, user2){
    let distance=0;
        for (let track in user1) 
            if (track in user2) 
             distance += Math.abs(user1[track]-user2[track])
    return distance;
}

// Euclidean added
function euclidean(user1,user2){
    let distance=0;
    for(let track in user1)
        if(track in user2)
            distance += ((user1[track]-user2[track])**2);           
    
    return Math.sqrt(distance)
}

// Computes nearest neighbor
 function computeNearestNeighbor(username, users){
  let distances =[],userDistanceCombination;  
  for (let user in users) 
        if (user != username) {
       distance =manhattan(users[user],users[username]);
        userDistanceCombination = { "distance":distance,"user":user  };
       distances.push(userDistanceCombination);
    }
    distances.sort(function(a,b){return a.distance-b.distance}) 
  return  distances;
 }
 function getTracks(user){ let tracks = users[user];  return tracks;}

 function giveRecommendation(user) {
    let neighborRating= getTracks(computeNearestNeighbor(user,users)[0].user)
    let userRating = getTracks(user)
    let recommendation = [];
    for ( let key in neighborRating) 
        if (neighborRating.hasOwnProperty(key) && !userRating.hasOwnProperty(key) ) 
           recommendation.push(neighborRating[key]+ '  '+key);
    
    return recommendation;
}
// console.log(computeNearestNeighbor('Chan',users))
console.log(giveRecommendation('Hailey'))

//console.log(manhattan(users['Hailey'],users['Veronica'])); // manhattan distance
//console.log(euclidean(users['Hailey'],users['Veronica'])); // Euclidean distance 
//console.log(computeNearestNeighbor('Chan',users));      // Nearest neighborhoods
//console.log(giveRecommendation('Chan',users));
