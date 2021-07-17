import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../components/HOC";

const GetMe = `
query{
  me{
    user{
      apartment
      city
      country
      email
      firstName
      gender
      id
      lastName
      phone
      points
      region
      street
      zipcode
    }
  }
}
`
const UpdateUserMutation = `
mutation($email: String!, $firstName: String!, $lastName:String!, $country: String!,
$region: String!, $city:String!, $street: String!, $apartment: String!,
$phone: String!){
  updateMe(options:{email:$email, firstName:$firstName, lastName:$lastName, country:$country
  region:$region, city:$city, street:$street, apartment:$apartment, phone: $phone}){
      status
      errors{
        message
      }
    user{
      apartment
      city
      country
      email
      firstName
      lastName
      phone
      region
      street
    }
  }
}
`

type UserData = {
  apartment?: string
  city: string
  country: string
  email: string
  firstName: string
  id: string
  lastName: string
  phone: string
  points: number
  region: string
  street: string
  zipcode: number
}
const UserPage = () => {
  const [result,] = useQuery({
    query: GetMe,
  });
  const [, updateUser] = useMutation(UpdateUserMutation)
  const [user, setUser] = useState<UserData | null>(null)
  useEffect(()=>{
    console.log('run');
    if(result.data){
      setUser(result.data.me.user);
    }
  }, [result])
  const router = useRouter();
  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Oh no... {result.error.message}</p>;
  const submitHandler =(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(user){
      const variables = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        region: user.region,
        country: user.country,
        city: user.city,
        street: user.street,
        apartment: user.apartment,
        phone: user.phone,
      }
      updateUser(variables).then(data=>{
        console.log(data)
        console.log()
      })
    }

  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    if(user){
      setUser({...user, [name]: value})
    }
  }
  if(!result.fetching && user !== null){
    return (
      <form className="px-5 py-8 flex flex-col w-80" onSubmit={submitHandler}>
        <div className='flex justify-between '>
          Email:
          <input className="border" name="email" defaultValue={user.email} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          First Name:
          <input className="border" name="firstName" defaultValue={user.firstName} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Last Name:
          <input className="border" name="lastName"  defaultValue={user.lastName} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Region:
          <input className="border" name="region"  defaultValue={user.region} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Country:
          <input className="border" name="country"  defaultValue={user.country} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          City:
          <input className="border" name="city"  defaultValue={user.city} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Street:
          <input className="border" name="street"  defaultValue={user.street} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Apartment:
          <input className="border" name="apartment"  defaultValue={user.apartment} onChange={onChangeHandler}/>
        </div>

        <div className="flex justify-between my-1">
          Phone:
          <input className="border" name="phone"  defaultValue={user.phone} onChange={onChangeHandler}/>
        </div>
        <button onClick={() => router.push('myBooks')}>My books</button>
        <button onClick={() => router.push('/home')}>To Homepage</button>
        <button type="submit">Change</button>
      </form>
    )
  }
  return null;
}
export default withAuth(UserPage)
