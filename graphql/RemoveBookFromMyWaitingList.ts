export const RemoveBookFromMyWaitingList = `
   mutation($id:String!){
    removeBookFromMyWaitingList(id: $id){
      edition {
        id
        title
        description
        image
        views
        books {
          id
          description
          holder {
            email
          }
          status
          condition
        }
      }
      errors{
        message
      }
    }
  }
`;
