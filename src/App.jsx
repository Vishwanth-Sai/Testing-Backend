import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
function App() {
  const [User, setUser] = useState({ Id: "", Name: "" });
  const [Msg, setMsg] = useState("");
  const [Users, setUsers] = useState([]);
  const [EditId, setEditId] = useState(null);
  const getUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*").order("id")
    if (error) {
      setMsg(error.message);
      return;
    }
    setUsers(data);
  }
  useEffect(() => {
    getUsers();
  }, []);
  const HandleCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    const resp = await supabase.from("profiles").insert({ id: Number(User.Id), name: User.Name });
    if (resp.error) {
      setMsg(resp.error.message);
      return;
    }
    setMsg("User added");
    setUser({ Id: "", Name: "" });
    getUsers();
  }
  const HandleEdit = (u) => {
    setUser({ Id: Number(u.id), Name: u.name })
    setEditId(u.id)
    setMsg("")
  }
  const HandleUpdate = async (e) =>{
    e.preventDefault()
    const resp = await supabase.from("profiles").update({name:User.Name}).eq("id", EditId)
    if(resp.error){
      setMsg(resp.error.message)
      console.log("error occured")
      return;
    }
    setMsg("user updated")
    setUser({Id : "", Name: ""})
    setEditId(null)
    getUsers()
  }
  const HandleDelete = async(u) =>{
    const resp = await supabase.from("profiles").delete().eq("id", u.id);
    if(resp.error){
      console.log(resp.error.message)
      return;
    }
    setMsg("user deleted")
    if(EditId == u.id){
      setUser({Id: "", Name: ""})
      setEditId(null)
    }
    getUsers()
  }
  return (
    <>
      <div className="flex flex-col gap-1.5 items-center justify-center min-h-screen bg-gray-100 ">
        <input
          placeholder="Enter your id"
          className="border border-b-fuchsia-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={User.Id}
          onChange={(e) => setUser({ ...User, Id: e.target.value })}
        ></input>
        <input
          placeholder="Enter your name"
          className="border border-b-fuchsia-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={User.Name}
          onChange={(e) => setUser({ ...User, Name: e.target.value })}
        ></input>
        <button onClick={EditId !==null ? HandleUpdate : HandleCreate} className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Submit
        </button>
        <div>
          User Lists
        </div>
        {Users.map((u, index) => {
          return (
            <div>
              <span className="font-semibold">user name is: {u.name}</span>
              <span>user id is: {u.id}</span>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>HandleEdit(u)} className="bg-green-500 text-white rounded-md py-1 px-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Edit
                </button>
              <button onClick={()=>HandleDelete(u)} className="bg-red-500 text-white rounded-md py-1 px-3 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Delete
              </button>
            </div>

          </div>
         );
        })}
        {Msg && <p className="text-red-500 font-bold mb-4">{Msg}</p>}
      </div>
    </>
  )
}

export default App
