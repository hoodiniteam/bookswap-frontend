import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../../components/HOC";
import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline'

const navigation = [
    { name: 'Account', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Password', href: '#', icon: KeyIcon, current: false },
    { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: false },
    { name: 'Team', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Integrations', href: '#', icon: ViewGridAddIcon, current: false },
]
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

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
  id: string
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
  region: string
  street: string
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
      // <form className="px-5 py-8 flex flex-col w-80" onSubmit={submitHandler}>
      //   <div className='flex justify-between '>
      //     Email:
      //     <input className="border" name="email" value={user.email} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     First Name:
      //     <input className="border" name="firstName" value={user.firstName} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Last Name:
      //     <input className="border" name="lastName"  value={user.lastName} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Region:
      //     <input className="border" name="region"  value={user.region} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Country:
      //     <input className="border" name="country"  value={user.country} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     City:
      //     <input className="border" name="city"  value={user.city} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Street:
      //     <input className="border" name="street"  value={user.street} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Apartment:
      //     <input className="border" name="apartment"  value={user.apartment} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Birthday:
      //     <input type="text"  className="border" name="bDay"  value={user.bDay} onChange={onChangeHandler}/>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     WaitingList:
      //     <div className="flex flex-col">
      //       {user.waiting.map(book => {
      //         return <span key={key+=1}>{book.title}</span>
      //       })}
      //     </div>
      //   </div>
      //   <div className="flex justify-between my-1">
      //     Phone:
      //     <input className="border" name="phone"  value={user.phone} onChange={onChangeHandler}/>
      //   </div>
      //     <div className="flex justify-between my-1">
      //         My Books
      //         <button onClick={() => router.push('/profile/books')}>MyBooks</button>
      //     </div>
      //   <button onClick={() => router.push('/home')}>To Homepage</button>
      //   <button type="submit">Save</button>
      // </form>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                <nav className="space-y-1">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                                'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <item.icon
                                className={classNames(
                                    item.current
                                        ? 'text-indigo-500 group-hover:text-indigo-500'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                <form action="#" method="POST">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm flex">
                    <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                      workcation.com/
                    </span>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        About
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="you@example.com"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Brief description for your profile. URLs are hyperlinked.
                                    </p>
                                </div>

                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 flex items-center">
                    <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                                        <button
                                            type="button"
                                            className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                    <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

                <form action="#" method="POST">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Provide basic informtion about the job. Be specific with the job title.
                                </p>
                            </div>

                            <fieldset>
                                <legend className="text-base font-medium text-gray-900">By Email</legend>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-start">
                                        <div className="h-5 flex items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <div className="h-5 flex items-center">
                                                <input
                                                    id="candidates"
                                                    name="candidates"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="candidates" className="font-medium text-gray-700">
                                                    Candidates
                                                </label>
                                                <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <div className="h-5 flex items-center">
                                                <input
                                                    id="offers"
                                                    name="offers"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="offers" className="font-medium text-gray-700">
                                                    Offers
                                                </label>
                                                <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="mt-6">
                                <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                                <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="push-everything" className="ml-3">
                                            <span className="block text-sm font-medium text-gray-700">Everything</span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="push-email" className="ml-3">
                                            <span className="block text-sm font-medium text-gray-700">Same as email</span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="push-nothing" className="ml-3">
                                            <span className="block text-sm font-medium text-gray-700">No push notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
  }
  return null;
}
export default withAuth(Index)
