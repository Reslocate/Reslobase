import { gql } from '@apollo/client';

export const GET_FRUITS = gql`
  query GetFruits {
    fruits {
      id
      name
      color
      category
      price
      in_stock
      created_at
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      created_at
    }
  }
`;

export const ADD_FRUIT = gql`
  mutation AddFruit($name: String!, $color: String, $category: String, $price: numeric, $in_stock: Boolean) {
    insert_fruits_one(object: {
      name: $name,
      color: $color,
      category: $category,
      price: $price,
      in_stock: $in_stock
    }) {
      id
      name
      color
      category
      price
      in_stock
    }
  }
`;
