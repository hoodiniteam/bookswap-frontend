import React, {FormEvent} from "react";
import {useQuery} from "urql";
import {useRouter} from "next/router";

const GetMe = `
query{
  me{
    user{
      email
      firstName
      lastName
      region
      country
      city
      street
      apartment
      phone
    }
  }
}
`
// const UpdateUserMutation = `
// mutation($email: String!, $firstName: String!, $lastName:String!, $country: String!,
// $region: String!, $city:String!, $street: String!, $apartment: String!, $bDay:DateTime!,
// $phone: String!){
//   updateMe(options:{email:$email, firstName:$firstName, lastName:$lastName, country:$country
//   region:$region, city:$city, street:$street, apartment:$apartment, bDay: $bDay, phone: $phone}){
//       status
//       errors{
//         message
//       }
//     user{
//       email
//       id
//       firstName
//       lastName
//       city
//       street
//       region
//       country
//       apartment
//       phone
//       bDay
//     }
//   }
// }
// `
const User = () => {
  const [result,] = useQuery({
    query: GetMe,
  });

  const router = useRouter();
  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Oh no... {result.error.message}</p>;
  const submit =(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(e)
  }

  if(!result.fetching){
    return (
      <form className="px-5 py-8 flex flex-col w-80" onSubmit={submit}>
        <div className='flex justify-between '>
          Email:
          <input className="border" defaultValue={result.data.me.user.email} onChange={(event) => event.target.value}/>
        </div>
        <div className="flex justify-between my-1">
          First Name:
          <input className="border" defaultValue={result.data.me.user.firstName} onChange={(event) =>event.target.value}/>
        </div>
        <div className="flex justify-between my-1">
          Last Name:
          <input className="border" defaultValue={result.data.me.user.lastName} onChange={event =>  event.target.value}/>
        </div>
        <div className="flex justify-between my-1">
          Region:
          <input className="border" defaultValue={result.data.me.user.region} onChange={(event) =>  event.target.value}/>
        </div>
        <div className="flex justify-between my-1">
          Country:
          <input className="border" defaultValue={result.data.me.user.country} onChange={(event) =>  (event.target.value)}/>
        </div>
        <div className="flex justify-between my-1">
          City:
          <input className="border" defaultValue={result.data.me.user.city} onChange={(event) => (event.target.value)}/>
        </div>
        <div className="flex justify-between my-1">
          Street:
          <input className="border" defaultValue={result.data.me.user.street} onChange={(event) => (event.target.value)}/>
        </div>
        <div className="flex justify-between my-1">
          Apartment:
          <input className="border" defaultValue={result.data.me.user.apartment} onChange={(event) =>  (event.target.value)}/>
        </div>
        <div className="flex justify-between my-1">
          Birthday:
          <input className="border" defaultValue={result.data.me.user.bDay || ''} onChange={(event) => (event.target.value)}/>
        </div>
        <div className="flex justify-between my-1">
          Phone:
          <input className="border" defaultValue={result.data.me.user.phone} onChange={(event) =>  (event.target.value)}/>
        </div>
        <button onClick={() => router.push('/home')}>To Homepage</button>
        <button type="submit">Change</button>
      </form>
    )
  }
}
export default User