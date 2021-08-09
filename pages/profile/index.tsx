import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../../components/HOC";
import LogOut from "../../helpers/LogOut";
import SidebarForProfile from "../../components/sidebar-for-profile";
import Layout from "../../components/layout";
import Upload from "../../components/upload-widget";

const GetMe = `
query{
  me{
    user{
      apartment
      bDay
      city
      country
      gender
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
        id
      }
    }
  }
}
`
const UpdateUserMutation = `
mutation($email: String!, $firstName: String!, $lastName:String!, $country: String!,
$region: String!, $city:String!, $street: String!, $apartment: String!, $bDay:DateTime!,
$phone: String!, $gender: Gender, $zipcode: Float){
  updateMe(options:{email:$email, firstName:$firstName, lastName:$lastName, country:$country
  region:$region, city:$city, street:$street, apartment:$apartment, bDay: $bDay, phone: $phone, gender: $gender, zipcode: $zipcode}){
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
      zipcode
      gender
    }
  }
}
`
type WaitingList = [{
  title: string
  id: string
}]

// eslint-disable-next-line no-unused-vars
enum Gender {
    // eslint-disable-next-line no-unused-vars
    FEMALE,
    // eslint-disable-next-line no-unused-vars
    MALE,
    // eslint-disable-next-line no-unused-vars
    OTHER
}

type UserData = {
  apartment?: string
  bDay?: string
  city: string
  country: string
  gender: Gender
  email: string
  firstName: string
  id: string
  lastName: string
  phone: string
  region: string
  street: string
  waiting: WaitingList
  zipcode: number
}

const Index = () => {
  let key = 1
  const [result,] = useQuery({
    query: GetMe,
  });
  const [, updateUser] = useMutation(UpdateUserMutation)
  const [user, setUser] = useState<UserData | null>(null)
  const router = useRouter();
  useEffect(()=>{
      if(result.data){
        if(result.error?.message.includes('Access denied!')){
            LogOut()
        }else{
            setUser(result.data.me.user);
        }
    }
  }, [result])
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
        gender: user.gender,
        zipcode: +user.zipcode
      }
      updateUser(variables).then(data=>{
        console.log( data )
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
        <form action="#" method="POST" onSubmit={submitHandler}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                  </label>
                    <input
                        onChange={onChangeHandler}
                        value={user.firstName}
                        type="text"
                        name="firstName"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                      </label>
                      <input
                          onChange={onChangeHandler}
                          value={user.lastName}
                          type="text"
                          name="lastName"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                      </label>
                      <input
                          onChange={onChangeHandler}
                          value={user.email}
                          type="email"
                          name="email"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="bDay" className="block text-sm font-medium text-gray-700">
                          Birthday
                      </label>
                      <input
                          onChange={onChangeHandler}
                          value={user.bDay}
                          type="date"
                          name="bDay"
                          id="bDay"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Gender:
                      </label>
                      <select
                          onChange={onChangeHandler}
                          value={user.gender}
                          id="gender"
                          name="gender"
                          autoComplete="country"
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                          <option value="OTHER">OTHER</option>
                      </select>
                    </div>
                      <div className="col-span-6">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                              Country / Region
                          </label>
                          <select
                              onChange={onChangeHandler}
                              value={user.country}
                              id="country"
                              name="country"
                              autoComplete="country"
                              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Russia">Russia</option>
                          </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                              City
                          </label>
                          <input
                              onChange={onChangeHandler}
                              value={user.city}
                              type="text"
                              name="city"
                              id="city"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                              Street address
                          </label>
                          <input
                              onChange={onChangeHandler}
                              value={user.street}
                              type="text"
                              name="street"
                              id="street-address"
                              autoComplete="street-address"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                      </div>

                      <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                              State / Province
                          </label>
                          <input
                              onChange={onChangeHandler}
                              value={user.region}
                              type="text"
                              name="region"
                              id="state"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                              Apartment
                          </label>
                          <input
                              onChange={onChangeHandler}
                              value={user.apartment}
                              type="number"
                              name="apartment"
                              id="apartment"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                      </div>
                      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                              Zipcode
                          </label>
                          <input
                              onChange={onChangeHandler}
                              value={user.zipcode}
                              type="number"
                              name="zipcode"
                              id="zipcode"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                              Phone
                          </label>
                          <input
                              onChange={onChangeHandler}
                              value={user.phone}
                              type="number"
                              name="phone"
                              id="phone"
                              autoComplete="phone"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                      </div>
                      <div className="col-span-6">
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                              Books im my waiting list
                          </label>
                          <div className="mt-1">
                              <div className="shadow-sm flex flex-col flex-wrap p-5 mt-1 w-full max-h-80 sm:text-sm border border-gray-300 rounded-md">
                                  {user.waiting.map(book => {
                                   return <a
                                          className="my-1.5 cursor-pointer"
                                          onClick={() => router.push(`/books/${book.id}`)}
                                          key={key+=1}
                                          >
                                          {book.title}
                                          </a>
                                  })}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                      type="submit"
                      className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                      Save
                  </button>
              </div>
          </div>
        </form>
    )
  }

  return null;
}

// eslint-disable-next-line react/display-name
withAuth(Index.getLayout = (page: any) => {
  return <Layout>
            <SidebarForProfile>{page}</SidebarForProfile>
         </Layout>
})

export default Index