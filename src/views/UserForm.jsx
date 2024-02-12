import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function UserForm() {
  const navigate = useNavigate();
  const {id}= useParams()
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    telephone: '',
    password: '',
    password_confirmation: '',
    sexe: '',
    nationalite: '',
    role: '',
    adresse: '',
    ville: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          console.log(data);
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          Swal.fire({
            title: "Good job!",
            text: "User was successfully updated!",
            icon: "success"
          })
          if (user.role==="admin") {
            navigate('/admin/dashboard')
            
          }
          else navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
      }else {
        axiosClient.post('/users', user)
        .then(() => {
          Swal.fire({
              title: "Good job!",
              text: "User was successfully created!",
              icon: "success"
            })
          navigate('/admin/dashboard')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }
  

  return (
    <>
      {user.id && <h1>Update User: {user.nom}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
            <form className="flex flex-col" onSubmit={onSubmit}>
            <input
            className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"
              value={user.name}
              onChange={ev => setUser({ ...user, name: ev.target.value })}
              placeholder="Nom"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              value={user.telephone}
              onChange={ev => setUser({ ...user, telephone: ev.target.value })}
              placeholder="telephone"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              value={user.email}
              onChange={ev => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              type="password"
              onChange={ev => setUser({ ...user, password: ev.target.value })}
              placeholder="Password"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              type="password"
              onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
              placeholder="Password Confirmation"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              value={user.sexe}
              onChange={ev => setUser({ ...user, sexe: ev.target.value })}
              placeholder="Sexe"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              value={user.nationalite}
              onChange={ev => setUser({ ...user, nationalite: ev.target.value })}
              placeholder="Nationalite"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              value={user.role}
              onChange={ev => setUser({ ...user, role: ev.target.value })}
              placeholder="Role"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"

              value={user.adresse}
              onChange={ev => setUser({ ...user, adresse: ev.target.value })}
              placeholder="Adresse"
            />
            <input
                        className="rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2"
              value={user.ville}
              onChange={ev => setUser({ ...user, ville: ev.target.value })}
              placeholder="Ville"
            />
            <button type="submit" className="rounded-md px-5 text-white  w-[100px] bg-purple-500 py-2 m-2 hover:bg-purple-600  ">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
