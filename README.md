# URL Shortener

> API to create short urls using Node, Express and MongoDB

## How To Start

```bash
# Install dependencies
npm install

# Edit the config.env file with your MONGO_URI and BASE_URL
# Use production.json in production env

# Run
npm start
```

## Endpoint to create short url

### POST api/url/shorten

{ "longUrl": "your_url" }
