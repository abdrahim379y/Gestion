import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setToken,setUser,user, setNotification } = useStateContext()
  const [Hide, setHide] = useState(true)
  // les inputes de filtrage :
  const [Filtredname, setFiltredname] = useState('')
  const [Filtredrole, setFiltredrole] = useState('')
  const [Filtredville, setFiltredville] = useState('')



  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
        setToken(null)
        setUser(null)
      })
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(Filtredname.toLowerCase()) &&
    user.role.toLowerCase().includes(Filtredrole.toLowerCase()) &&
    user.ville.toLowerCase().includes(Filtredville.toLowerCase())
  )

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="text-4xl font-bold">Stagaires</h1>
        <h2 className="font-bold  text-xl ">Hello : <span class="rounded-xl bg-purple-600 px-2 pb-2 text-white">{user.name}</span></h2>
      </div>
      <div className="mt-4">
        {Hide ? <>
          <input type="text" onChange={e => setFiltredname(e.target.value)} placeholder="search par nom et prenom"
            class=" rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2" />
          <input type="text" onChange={e => setFiltredville(e.target.value)} placeholder="search par ville"
            class=" rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent m-2" />
          <select name="" id="" className=" rounded-md px-2 py-1  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" onChange={e => setFiltredrole(e.target.value)}>
            <option value="">all</option>
            <option value="admin">admin</option> <option value="user">user</option>
          </select> </> : null}
        <input
          type="submit"
          className="ml-5 px-5 py-2 bg-purple-500 text-white rounded-2xl"
          value={Hide ? "Hide" : "show"}
          onClick={() => {
            setHide(!Hide);
          }}
        />
      </div>
      <h1 className="text-2xl text-center">le nomber de Stagaires : {filteredUsers.length}</h1>

      <div className="text-center text-2xl font-semibold ">
        {loading && "Loading..."}
      </div>
      <section className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10  mt-10 mb-5">
        {!loading && filteredUsers.map(u => {
          return (<>
            <div
              class="relative w-full max-w-2xl my-8 md:my-16 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">

              <span class="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
                user
              </span>
              <svg class="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="32" width="32">
                <path d="M12.6586 11.62C12.6286 11.62 12.6086 11.62 12.5786 11.62C12.5286 11.61 12.4586 11.61 12.3986 11.62C9.49859 11.53 7.30859 9.25 7.30859 6.44C7.30859 3.58 9.63859 1.25 12.4986 1.25C15.3586 1.25 17.6886 3.58 17.6886 6.44C17.6786 9.25 15.4786 11.53 12.6886 11.62C12.6786 11.62 12.6686 11.62 12.6586 11.62ZM12.4986 2.75C10.4686 2.75 8.80859 4.41 8.80859 6.44C8.80859 8.44 10.3686 10.05 12.3586 10.12C12.4086 10.11 12.5486 10.11 12.6786 10.12C14.6386 10.03 16.1786 8.42 16.1886 6.44C16.1886 4.41 14.5286 2.75 12.4986 2.75Z" fill="currentColor"></path>
                <path d="M12.6716 22.55C10.7116 22.55 8.74156 22.05 7.25156 21.05C5.86156 20.13 5.10156 18.87 5.10156 17.5C5.10156 16.13 5.86156 14.86 7.25156 13.93C10.2516 11.94 15.1116 11.94 18.0916 13.93C19.4716 14.85 20.2416 16.11 20.2416 17.48C20.2416 18.85 19.4816 20.12 18.0916 21.05C16.5916 22.05 14.6316 22.55 12.6716 22.55ZM8.08156 15.19C7.12156 15.83 6.60156 16.65 6.60156 17.51C6.60156 18.36 7.13156 19.18 8.08156 19.81C10.5716 21.48 14.7716 21.48 17.2616 19.81C18.2216 19.17 18.7416 18.35 18.7416 17.49C18.7416 16.64 18.2116 15.82 17.2616 15.19C14.7716 13.53 10.5716 13.53 8.08156 15.19Z" fill="currentColor"></path>
              </svg>


              <div class="w-full sm:w-auto flex flex-col items-center sm:items-start">

                <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                  <h1 class="font-bold text-2xl">{u.name}</h1>
                </div>
                <p class="text-sm">Email :{u.email} <br />
                  id:  {u.id}<br />
                  tel :{u.telephone}<br />
                  ville :{u.ville}
                </p>
                <div class="mt-5 flex items-center justify-between text-white">
                  {
                    u.id == user.id ? <div className="">
                      <Link to={'/users/' + u.id} class="  text-white cursor-pointer border py-2 px-8 text-center text-xs leading-tight  rounded-lg bg-purple-500  hover:bg-purple-600">Edit</Link>
                      <Link to={'/usersDetails/' + u.id} class="  text-white cursor-pointer border py-2 px-8 text-center text-xs leading-tight  rounded-lg bg-purple-500  hover:bg-purple-600">showDetails</Link>
                      <button onClick={ev => onDeleteClick(u)} class=" text-white cursor-pointer border py-2 px-8 text-center text-xs leading-tight  rounded-lg bg-red-500 hover:bg-red-600 " to={'/users/' + u.id}>Delete</button>
                    </div> : ""
                  }

                </div>

              </div>
            </div>
          </>
          )
        })
        }
      </section>
    </div>
  )
}