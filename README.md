# cf-test

This project contains a Cloudflare function that fetches metaobjects from the Shopify API.

## Project Structure

## Files

- **functions/index.js**: Contains the main function to process the GET request.
- **model/getMetaobjects.js**: Contains the function to fetch metaobjects from the Shopify API.
- **model/query.js**: Contains the GraphQL query to fetch metaobjects by type from the Shopify API.

## Setup

1. Clone the repository.
2. Install the necessary dependencies.

## Environment Variables

The following environment variables need to be set:

- `SHOP_URL`: The URL of your Shopify store.
- `API_KEY`: The API key for accessing the Shopify API.

## Usage

To fetch metaobjects, send a GET request to the Cloudflare function endpoint. The function will return a JSON response containing the metaobjects.

### Example Request

```sh
curl -X GET "https://<your-cloudflare-function-url>"
```

### Example Response

[
{
"id": "123",
"name": "John Dooe",
"staffId": "456"
},
{
"id": "789",
"name": "Jane Smith",
"staffId": "012"
}
]
