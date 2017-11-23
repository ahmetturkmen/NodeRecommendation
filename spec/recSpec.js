const rec = require('../rec')
const users = require('../users')
// Tests manhattan function
describe('Manhattan Distance', function () {
    it('should calculate manhattan distance between given users', function () {
        let manhattanDistance = rec.manhattan(users['Hailey'], users['Veronica']); // Manhattan function is imported
        expect(manhattanDistance).toBe(2);

    });
});
// Tests euclidean function
describe('Euclidean Distance', function () {

    it('should calculate euclidean distance between given users', function () {
        let euclideanDistance = rec.euclidean(users['Hailey'], users['Veronica']);
        expect(euclideanDistance).toBe(1.4142135623730951);

    });
});
// Tests minkowski function
describe('Minkowski Distance', function () {
    it('should calculate minkowski distance between given users', function () {
        let minkowskiDistance = rec.minkowski(rec.getTracks('Hailey'), rec.getTracks('Jordyn'), 3);
        expect(minkowskiDistance).toBe(18.375);

    });
});
// Tests giveRecommendation function 
describe('Recommendation function is applied', function () {
    it('recommendation will be given to the user', function () {
        let recommendations = rec.giveRecommendation('Hailey');
        expect(recommendations).toEqual(['4  Phoenix', '3  Blues Traveler', '2.5  Slightly Stoopid']);

    });
});

// Tests getTracks function
describe('User\'s tracks ', function () {
    it('tracks', function () {
        let tracks = rec.getTracks('Hailey');
        expect(tracks).toEqual({
            'Broken Bells': 4,
            Deadmau5: 1,
            'Norah Jones': 4,
            'The Strokes': 4,
            'Vampire Weekend': 1
        });

    });
});
describe('computing nearest neighbors', function () {
    let counter = 0;
    it('neighbors', function () {
        let nearestNeighbors = [ 
        { distance: 2.3979157616563596, user: 'Angelica' },
        { distance: 3.1622776601683795, user: 'Hailey' },
        { distance: 3.1622776601683795, user: 'Sam' },
        { distance: 3.3541019662496847, user: 'Veronica' },
        { distance: 6.123724356957945, user: 'Jordyn' },
        { distance: 6.284902544988268, user: 'Bill' },
        { distance: 6.442049363362563, user: 'Dan' } ];

        expect(rec.computeNearestNeighbor('Chan',users)).toEqual(nearestNeighbors);
    });
});