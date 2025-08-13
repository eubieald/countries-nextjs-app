export const COUNTRIES_LIST_QUERY = `
  query {
    countries {
      code
      name
      capital
      emoji
      languages {
        name
      }
      currency
    }
  }
`;
