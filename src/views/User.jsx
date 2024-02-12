import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useParams ,Link} from "react-router-dom";
export default function User() {
const {id}=useParams()
const [user,setUser]=useState()

  useEffect(() => {
    axiosClient.get(`/users/${id}`)
    .then((data) => {
      console.log(data.data);
      setUser(data.data)
    })
    .catch(() => {
    })
  }, [])

  return (<>
  {user &&  <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the user.
            </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        id
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {id}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.name}
                    </dd>
                </div>
                   <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.email}
                    </dd>
                </div>
               
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.telephone}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Role
                    </dt>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.role}
                    </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Address
                    </dt>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.adresse}
                    </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Ville
                    </dt>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.ville}
                    </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Gender
                    </dt>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.sexe}
                    </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                    nationalite
                    </dt>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.nationalite}
                    </div>
                </div> 
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <Link to="/admin/dashboard" className=" bg-purple-500 hover:bg-purple-600  text-white border py-2 px-5 w-40 text-center text-xs leading-tight  rounded-lg"> Back Home </Link>
                </div> 
            </dl>
        </div> 
    </div> }

  </>

  )
}