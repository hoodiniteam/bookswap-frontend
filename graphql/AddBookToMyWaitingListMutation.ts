export const AddBookToMyWaitingListMutation = `
  mutation($id:String!){
    addBookToMyWaitingList(id: $id){
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
