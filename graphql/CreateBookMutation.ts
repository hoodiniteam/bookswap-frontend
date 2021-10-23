import {fragmentBook} from "./fragmentBook";

export const CreateBookMutation = `
mutation($title: String!, $description: String!, $userDescription: String!, $image: String, $condition:BooksCondition! ){
  createBook(options:{title: $title, description: $description, userDescription: $userDescription, image: $image, condition: $condition }){
    status
    ${fragmentBook}
  }
}
`;
