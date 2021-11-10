
export const RefreshMutation = `
    mutation($refreshToken: String!){
      refreshToken(refreshToken: $refreshToken) {
        token
        refreshToken
      }
    }
`;
