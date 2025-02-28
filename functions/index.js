export const onRequestGet = [process];

/**
 * Main function to process the shipping request.
 *
 * @param {Object} context - The context object containing the request and other details.
 * @returns {Response} - The  response object containing the metaobjects or an error message.
 */
async function process(context) {
  const envData = await context.env;
  const requestOrigin = context.request.headers.get("Origin");
  //REQUEST_ORGIN=https://extensions.shopifycdn.com
  if (!(await checkOrigin(env.REQUEST_ORGIN, requestOrigin))) {
    return new Response("Authentication Error : Invalid Origin", {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const corsHeaders = {
    "Access-Control-Allow-Origin": requestOrigin,
    "Content-Type": "application/json",
  };

  try {
    const response = await getMetaobjects(envData);
    if (response && response.length > 0) {
      return new Response(JSON.stringify(response), {
        headers: corsHeaders,
        status: 200,
      });
    } else {
      return new Response("No metaobjects found", {
        headers: corsHeaders,
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error fetching metaobjects:", error);
    return new Response("Error fetching metaobjects", {
      headers: corsHeaders,
      status: 500,
    });
  }
}

/**
 * Function to check the origin of the request.
 * @param {string} shopifyStore
 * @param {string} origin
 * @returns {boolean}
 */
async function checkOrigin(shopifyStore, origin) {
  try {
    return shopifyStore === origin;
  } catch (error) {
    console.error("Error checking origin:", error);
    return false;
  }
}
