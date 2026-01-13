export const sortTypeDef = `
  enum SortType {
    ASC
    DESC
  }

  input SortInput {
    sortBy: String
    sortType: SortType
  }
`;
