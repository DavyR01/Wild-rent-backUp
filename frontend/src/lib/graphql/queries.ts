import { gql } from "@apollo/client";

export type ProductType = {
   id: number;
   name: string;
   description_short: string;
   description_long: string;
   picture: string[];
   price_fixed: number;
   price_daily: number;
   discount?: number;
   quantity: number;
   created_at: string;
   updated_at: string;
   category: {
      id: number;
      name: string;
   };
};

export const GET_PRODUCTS = gql`
  query GetAllproducts {
    getAllproducts {
      id
      name
      description_short
      description_long
      picture
      price_fixed
      price_daily
      discount
      quantity
      created_at
      updated_at
      category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Query($productId: Float!) {
    getProductById(productId: $productId) {
      id
      name
      description_short
      description_long
      picture
      price_fixed
      price_daily
      discount
      quantity
      created_at
      updated_at
      category {
        id
        name
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query Query($categoryId: Float!) {
    getProductsByCategoryId(categoryId: $categoryId) {
      id
      name
      description_short
      description_long
      picture
      price_fixed
      price_daily
      discount
      quantity
      created_at
      updated_at
      category {
        id
        name
      }
    }
  }
`;

export const LOGIN = gql`
  query Query($inputUserLogin: InputUserLogin!) {
    loginUser(inputUserLogin: $inputUserLogin)
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      id
      email
      username
    }
  }
`;

export const GET_ALL_PRODUCTS_BY_KEYWORD = gql`
  query GetAllProductsByKeyword($keyword: String!) {
    getAllProductsByKeyword(keyword: $keyword) {
      id
      name
      description_short
      description_long
      picture
      price_fixed
      price_daily
      discount
      quantity
      created_at
      updated_at
      category {
        name
        id
      }
    }
  }
`;

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      isLoggedIn
      email
      role
    }
  }
`;


export const CHECK_USER_EXISTENCE = gql`
query Query($email: String!, $username: String!) {
   checkUserExistence(email: $email, username: $username)
 }
`


