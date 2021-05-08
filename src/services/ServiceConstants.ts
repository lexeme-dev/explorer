// TODO: Change else of ternary after making a production server.
export const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'http://localhost:5000';

export const CASES_ROUTE = '/cases';
export const CASES_SEARCH_ROUTE = `${CASES_ROUTE}/search`;
export const CASES_SIMILAR_ROUTE = `${CASES_ROUTE}/similar`;
