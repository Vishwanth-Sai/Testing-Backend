import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
function App() {
  const [User, setUser] = useState({Id : "", Name: ""});
  const [Msg, setMsg] = useState("");
  const [Users, setUsers] = useState([]);
  const getUsers = async()=>{
    const {data,error} = await supabase.from("profiles").select("*").order("id")
    if(error){
      setMsg(error.message);
      return;
    }
    setUsers(data);
  }
  useEffect(()=>{
    getUsers();
  },[]);
  const handlecreate = async(e)=>{
    e.preventDefault();
    setMsg("");
    const resp = await supabase.from("profiles").insert({id :Number(User.Id), name: User.Name});
    if(resp.error){
      setMsg(resp.error.message);
      return;
    }
    setMsg("User added");
    setUser({Id : "", Name: ""});
    getUsers();
  }
  return (
    <>
      <div className="flex flex-col gap-1.5 items-center justify-center min-h-screen bg-gray-100 ">
          <input 
            placeholder="Enter your id" 
            className="border border-b-fuchsia-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={User.Id}
            onChange={(e) => setUser({...User, Id:e.target.value})}
          ></input>
          <input 
            placeholder="Enter your name" 
            className="border border-b-fuchsia-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={User.Name}
            onChange={(e) => setUser({...User, Name:e.target.value})}
          ></input>
          <button onClick={handlecreate} className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
          {Msg && <p className="text-red-500 font-bold mb-4">{Msg}</p>}
      </div>
    </>
  )
}

export default App
