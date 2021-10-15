export const GetEditionsQuery =`
query($search: String, $offset: Float, $limit: Float,){
  getEditions(search: $search, offset: $offset, limit: $limit){
    count
    editions{
      title
      description
      id
      image{
        url
      }
      virtual
    }
  }
}
`