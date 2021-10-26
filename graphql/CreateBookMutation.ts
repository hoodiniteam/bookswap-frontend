import {fragmentBook} from "./fragmentBook";

export const CreateBookMutation = `
mutation($title: String!, $description: String!, $userDescription: String!, $image: String, $condition:BooksCondition!, $isbn_10: String, $isbn_13: String ){
  createBook(options:{title: $title, description: $description, userDescription: $userDescription, image: $image, condition: $condition, isbn_10: $isbn_10, isbn_13: $isbn_13 }){
    status
    ${fragmentBook}
  }
}
`;
