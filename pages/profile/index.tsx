import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../../components/HOC";

const GetMe = `
query{
  me{
    user{
      apartment
      bDay
      city
      country
      email
      firstName
      gender
      id
      lastName
      phone
      region
      street
      zipcode
      waiting{
        title
      }
    }
  }
}
`
const UpdateUserMutation = `
mutation($email: String!, $firstName: String!, $lastName:String!, $country: String!,
$region: String!, $city:String!, $street: String!, $apartment: String!, $bDay:DateTime!,
$phone: String!){
  updateMe(options:{email:$email, firstName:$firstName, lastName:$lastName, country:$country
  region:$region, city:$city, street:$street, apartment:$apartment, bDay: $bDay, phone: $phone}){
      status
      errors{
        message
      }
    user{
      apartment
      bDay
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
type WaitingList = [{
  title: string
}]
type UserData = {
  apartment?: string
  bDay?: string
  city: string
  country: string
  email: string
  firstName: string
  id: string
  lastName: string
  phone: string
  points?: number
  region: string
  street: string
  zipcode: number
  waiting: WaitingList
}
const Index = () => {
  let key = 1
  const [result,] = useQuery({
    query: GetMe,
  });
  const [, updateUser] = useMutation(UpdateUserMutation)
  const [user, setUser] = useState<UserData | null>(null)
  useEffect(()=>{
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
        bDay: user.bDay,
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
          <input className="border" name="email" value={user.email} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          First Name:
          <input className="border" name="firstName" value={user.firstName} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Last Name:
          <input className="border" name="lastName"  value={user.lastName} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Region:
          <input className="border" name="region"  value={user.region} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Country:
          <input className="border" name="country"  value={user.country} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          City:
          <input className="border" name="city"  value={user.city} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Street:
          <input className="border" name="street"  value={user.street} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Apartment:
          <input className="border" name="apartment"  value={user.apartment} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          Birthday:
          <input type="text"  className="border" name="bDay"  value={user.bDay} onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-between my-1">
          WaitingList:
          <div className="flex flex-col">
            {user.waiting.map(book => {
              return <span key={key+=1}>{book.title}</span>
            })}
          </div>
        </div>
        <div className="flex justify-between my-1">
          Phone:
          <input className="border" name="phone"  value={user.phone} onChange={onChangeHandler}/>
        </div>
          <div className="flex justify-between my-1">
              My Books
              <button onClick={() => router.push('/profile/books')}>MyBooks</button>
          </div>
        <button onClick={() => router.push('/home')}>To Homepage</button>
        <button type="submit">Save</button>
      </form>
    )
  }
  return null;
}
export default withAuth(Index)
