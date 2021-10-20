
export const CreateBookMutation = `
mutation($title: String!, $description: String!, $image: String, $condition:BooksCondition! ){
  createBook(options:{title: $title, description: $description, image: $image, condition: $condition }){
    status
    book{
      id
    }
  }
}
`;