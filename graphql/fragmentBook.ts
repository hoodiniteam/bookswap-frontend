export const fragmentBook = `
    book{
        id
        description
        title
        condition
        status
        swaps{
          status
        }
        creator{
          id  
          email
        }
        holder{
          id  
          email
        }
        edition {
          image
          title
          description
          isbn_10
          isbn_13
        }
    }
`
