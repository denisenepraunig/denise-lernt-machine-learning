var users = [
  { "id": 0, "name": "Denise" },
  { "id": 1, "name": "Michelle" },
  { "id": 2, "name": "Martina" },
  { "id": 3, "name": "Andrea" }
];

var friendships = [
  [0, 1], [0, 2],
  [1, 2], [1,3],
  [2, 3]
];

// add a friends property to each user
users.forEach( user => user.friends = [] );

// add the friends to the user and vice-versa
friendships.forEach( friendship => {

  const user = friendship[0];
  const friend = friendship[1];

  // append the friend to the user
  users[user].friends.push(users[friend]);

  // also append the user to the friend
  users[friend].friends.push(users[user]);
});

// how many friends has each user?
function howManyFriends(user) {
  return user.friends.length;
}

// how many connections are in the network?
// sum all the friends of every user
var totalConnections = users.reduce( (acc, user) => {
  return acc + howManyFriends(user);
}, 0);

var numberOfUsers = users.length;
var averageConnections = totalConnections / numberOfUsers;

// create a array containing [user.id, number of friends]
var numberOfFriendsById = users.map( user => {
  return [ user.id, howManyFriends(user) ];
});

// sort the numberOfFriendsById array
// from the most friends to the least friends
var sortedNumberOfFriendsById = numberOfFriendsById.sort( (a, b) => {

  // sort it descending
  // 0 is the user id, 1 is the number of friends
  return b[1] - a[1];
});

// two users are not the same if they don't have the same id
function notTheSameUser(user, otherUser) {
  return user.id != otherUser.id;
}

// two users are not friends if all of the user's friends
// are not the same user as the other user
function notFriends(user, otherUser) {
  return user.friends.every( friend => {
    return notTheSameUser(friend, otherUser);
  });
}

// flatten an array with multiple arrays inside
// [[0, 1], [2], [3, 4]] => [0, 1, 2, 3, 4]
function flatten(arr) {
  return arr.reduce( (acc, val) => acc.concat(
    Array.isArray(val) ? flatten(val) : val
  ),[]);
}

// get the mutual friends of a friend
// foaf is short for friend of a friend
function friendsOfFriends(user) {

  // iterate over the user's friends
  var result = user.friends.map( friend => {
    // iterate over the friends of a friend
    return friend.friends.filter( foaf => {
        // only valid if the user is not the user itself
        // and the user is not already friends
        return notTheSameUser(user, foaf)
               && notFriends(user, foaf);
    })
    // we interested in the friend ID and the friend of a friend ID
    .map( foaf => {
      return { "friendId": friend.id, "foafId": foaf.id }
    })
  });

  // flatten the result, because we have map twice
  // this means we get arrays inside an array
  // which we want to avoid
  return flatten(result);
}

var foaf_user_0 = friendsOfFriends(users[0]);
// [ { "friendId: 1, "foafId": 3 }, { "friendId: 2, "foafId": 3 } ]
