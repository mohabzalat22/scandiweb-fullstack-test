import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      description
      category

      prices {
        amount
        currency {
          label
          symbol
        }
      }

      attributes {
        id
        name
        items {
          id
          displayValue
          value
        }
        type
      }

      brand
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category

      prices {
        amount
        currency {
          label
          symbol
        }
      }

      attributes {
        id
        name
        items {
          id
          displayValue
          value
        }
        type
      }

      brand
    }
  }
`;

export const CREATE_NEW_ORDER = gql`
  mutation createOrder($order: Order) {
    createOrder(order: $order)
    }
`;
