# Shauter
Shouter is a project where you can meet new people near you. You can post messages in a certain radius and only people who are in the radius can see the message.

A hackathon project for https://codingaustria.at/

## Future ideas
- Filter messages through tags e.g. Sports, Arts, Shopping ...
- Show radius on the map
- See messages on the map
- Add reactions to messages
- Different types of location sharing: Approx or exact
- The choice to share location with user


Demo User Ids: 1, 2 3

Current expiration time: 30s

Radius:

<= 1 -> empty

<= 5 -> the next user

else -> all other users

Demo Url: https://sakkaku-web.github.io/hackathon/

# Development

Start frontend with `npm start`

Deploy the backend to aws using `npm run deploy:aws`

To start the backend locally with aws sam. If it's not installed locally run `./testing/start-sam.sh`
And start the rest api with sam using `sam local start-api`. Note a DynamoDB instance has to be deployed once.
