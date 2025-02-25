import { getMetaobjectsQuery } from "./query.js";

/**
 * Fetches metaobjects from the Shopify API.
 *
 * @param {Object} env - The environment variables containing SHOP_URL and API_KEY.
 * @returns {Array} - An array of metaobjects with id and name.
 */
export async function getMetaobjects(env) {
  let response = [];
  let hasNextPage = true;
  let endCursor = null;

  try {
    while (hasNextPage) {
      let result = null;

      //  Fetch metaobjects from Shopify API using GraphQL query
      try {
        result = await fetch(`${env.SHOP_URL}/admin/api/graphql.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": env.API_KEY,
          },
          body: JSON.stringify({
            query: getMetaobjectsQuery,
            variables: {
              first: 50, // Fetch 50 records at a time
              after: endCursor,
              type: "sales-agents",
            },
          }),
        }).then((res) => res.json());
      } catch (error) {
        console.error("Error executing GraphQL query:", error);
        break;
      }

      // Process the result to extract metaobjects
      if (
        result &&
        result.data &&
        result.data.metaobjects &&
        result.data.metaobjects.edges
      ) {
        response = response.concat(
          result.data.metaobjects.edges.map((edge) => {
            const idField = edge.node.fields.find(
              (field) => field.key === "salesagent_id"
            );
            const nameField = edge.node.fields.find(
              (field) => field.key === "salesagent_name"
            );
            const stafField = edge.node.fields.find(
              (field) => field.key === "staffid"
            );
            return {
              id: idField ? idField.value : null,
              name: nameField ? nameField.value.trim() : null,
              staffId: stafField ? stafField.value : null,
            };
          })
        );

        hasNextPage = result.data.metaobjects.pageInfo.hasNextPage;
        endCursor = result.data.metaobjects.pageInfo.endCursor;
      } else {
        hasNextPage = false;
      }
    }
  } catch (error) {
    console.error("Error fetching metaobjects:", error);
  }

  return response;
}
