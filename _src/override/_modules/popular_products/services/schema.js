import {gql} from '@apollo/client';

export const GET_BEST_SELLER_PRODUCTS = gql`
  query getBestSellerProducts{
    categoryList(filters:{name:{match:"Best seller"}}){
      name
      products{
        items{
          url_key
          name
          image{
            url
          }
          price_range{
            maximum_price{
              regular_price{
                currency
                value
              }
              final_price{
                currency
                value
              }
            }
          }
        }
      }
    }
  }
`;
