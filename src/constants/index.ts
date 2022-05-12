export const rickandmortyBaseUrl = "https://rickandmortyapi.com/api/";

export const rtkqueryBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4444/rtkquery/product/'
    : "https://alexaltrex-common-api.herokuapp.com/rtkquery/product/"