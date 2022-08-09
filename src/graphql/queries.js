import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:4000/graphql";

export async function fetchCurrencies() {
  const query = gql`
    query {
      currencies {
        label
        symbol
      }
    }
  `;

  const { currencies } = await request(GRAPHQL_URL, query);
  return currencies;
}

export async function fetchCategories() {
  const query = gql`
    query {
      categories {
        name
      }
    }
  `;

  const { categories } = await request(GRAPHQL_URL, query);
  return categories;
}

export async function fetchProducts(categoryInput) {
  const query = gql`
    query productsQuery($categoryInput: String!) {
      category(input: { title: $categoryInput }) {
        name
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    }
  `;

  const variables = { categoryInput };
  const { category } = await request(GRAPHQL_URL, query, variables);
  return category.products;
}
