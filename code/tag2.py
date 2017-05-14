# Python 2.7

from __future__ import division
from collections import Counter

users = [
    {"id": 0, "name": "Denise"},
    {"id": 1, "name": "Michelle"},
    {"id": 2, "name": "Martina"},
    {"id": 3, "name": "Andrea"},
    {"id": 4, "name": "Christina"},
    {"id": 5, "name": "Christian"},
    {"id": 6, "name": "Tino"},
    {"id": 7, "name": "Stefan"},
    {"id": 8, "name": "Thorsten"},
    {"id": 9, "name": "Hansi"},
    {"id": 10, "name": "Marita"}
]

friendships = [(0, 1), (0, 2), (1, 2), (1, 3), (2, 3), (3, 4),
               (4, 5), (5, 6), (5, 7), (6, 8), (7, 8), (8, 9)]

# create a friends list for each user
for user in users:
    user["friends"] = []

# add the friends to each user
for i, j in friendships:
    # add i as a friend of j
    users[i]["friends"].append(users[j])

    # add j as a friend of i
    users[j]["friends"].append(users[i])

def not_the_same(user, other_user):
    # two users are not the same if they don't have the same ids
    return user["id"] != other_user["id"]

def not_friends(user, other_user):
    # other_user is not a friend if he's not in user["friends"]
    # that is, if he's not_the_same as all the people in user["friends]"
    return all(not_the_same(friend, other_user)
            for friend in user["friends"])

print "not friends 0 and 1: ", not_friends(users[0], users[1]) # False
print "not friends 0 and 2: ", not_friends(users[0], users[2]) # False
print "not friends 0 and 3: ", not_friends(users[0], users[3]) # True

def friends_of_friend_ids(user):
    return [(friend["id"], foaf["id"])
           for friend in user["friends"]    # for each of my friends
           for foaf in friend["friends"]    # friend of friends
           if not_the_same(user, foaf)      # who aren't me
           and not_friends(user, foaf)]     # and aren't my friends

def friends_of_friend_ids_counter(user):
    return Counter(foaf["id"]
           for friend in user["friends"]    # for each of my friends
           for foaf in friend["friends"]    # friend of friends
           if not_the_same(user, foaf)      # who aren't me
           and not_friends(user, foaf))     # and aren't my friends

foaf_user_0 = friends_of_friend_ids(users[0])       # [(1, 3), (2, 3)]
foaf_user_0_counter = friends_of_friend_ids_counter(users[0]) # Counter({3: 2}) -> two mutual friends with 3

print "friends of friend for user 0: ", foaf_user_0
# [(1, 3), (2, 3)]

print "friends of friend for user 0 counter: ", foaf_user_0_counter
# Counter({3: 2})
