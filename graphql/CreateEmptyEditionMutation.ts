export const CreateEmptyEditionMutation = `
mutation($title: String!, $description: String!, $image: String ){
  createEmptyEdition(options:{title: $title, description: $description, image: $image }){
    status
    edition{
      id
    }
  }
}
`;
