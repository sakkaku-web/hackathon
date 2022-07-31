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
