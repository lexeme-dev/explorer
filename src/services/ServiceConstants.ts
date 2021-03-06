// TODO: Change else of ternary after making a production server.
export const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'http://localhost:5000';

export const CASES_ROUTE = '/cases';
export const CASES_SEARCH_ROUTE = `${CASES_ROUTE}/search`;
export const CASES_SIMILAR_ROUTE = `${CASES_ROUTE}/similar`;
export const CASES_HTML_ROUTE = `${CASES_ROUTE}/<int:resource_id>/html`;
export const CASES_RECOMMENDATIONS_ROUTE = `${CASES_ROUTE}/recommendations`;

export const PDF_UPLOAD_ROUTE = '/pdf/upload';
