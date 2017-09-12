const {createApolloFetch} = require('apollo-fetch')
const uri = 'http://54.225.100.44:6989/graphql'
const data = {
  getnewAppsCount: async () => {
    const query = `query TestQuery($startDate: String!, $endDate: String!, $sortDir: Int, $statusCodes: [String]!) {
        newappsCount(filter: {startDate: $startDate, endDate: $endDate, statusCode: $statusCodes, sortDir: $sortDir, skip: 0, take: 10}) {
          count
          submittedDate
          applicationStatus
        }
      }
      `
    const variables = {
      startDate: '01-Jul-2017',
      endDate: '31-Aug-2017',
      sortDir: -1,
      statusCodes: [
        '200.01'
      ]
    }
    try {
      const options = {
        mode: 'no-cors'
      }
      const apolloFetch = createApolloFetch({ uri, options })
      apolloFetch.use(({request, options}, next) => {
        if (!options.headers) {
          options.headers = {}  // Create the headers object if needed.
        }
        options.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsZW5kZm91bmRyeSIsImlhdCI6IjIwMTctMDctMDhUMDk6NTI6NDMuMTIwODk2WiIsImV4cCI6IjIwMTctMDctMDhUMTA6NTI6NDMuMTIwNzA1WiIsInN1YiI6InN5c3RlbSIsInRlbmFudCI6ImNyZWRpdC1leGNoYW5nZSIsInNjb3BlIjpbInsqYW55fSIsImJhY2stb2ZmaWNlIl0sIklzVmFsaWQiOnRydWV9.7pg3ctuFBZA3DW5gbXYjSNNmQIEa7_BRMHV5kyCKws8'

        next()
      })
      let results = await apolloFetch({ query, variables })
        // console.log(data)
      return results
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = data
