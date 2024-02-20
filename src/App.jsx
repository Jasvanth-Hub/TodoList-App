import './App.css'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Footer from './Footer';

function App() {

  const [Todos, setTodos] = useState([])
  const [Todo, setTodo] = useState("")

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("Todos"))
    if(items)
    {
      setTodos(items)
    }
  }, [])
  

  const saveToLs = (params) =>{
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }
 
  const handleEdit = (e) => {
    let id = e.target.name
    let todo = Todos.filter(item => item.id === id)
    setTodo(todo[0].Todo)
    let newtodo = Todos.filter(item => item.id != id)
    setTodos(newtodo)
    saveToLs()
  }

  function deleteItem(e) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      let id = e.target.name
      let newtodo = Todos.filter(item => item.id != id)
      setTodos(newtodo)
      saveToLs()
    }
  }

  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }])
    setTodo("")
    saveToLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name
    let index = Todos.findIndex(item => {
      return item.id === id
    })
    let newtodo = [...Todos]
    newtodo[index].isCompleted = !newtodo[index].isCompleted
    setTodos(newtodo)
    saveToLs()
  }

  const [showfinish, setshowfinish] = useState(false)

  let showCompleted = ()=>{
    setshowfinish(!showfinish)
  }

  return (
    <>
      <Navbar />
      <div className=" container max-w-[90vw]  mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]  " id='container'>
        <div className="box1 flex justify-center  mb-12   " >
          <div className="input w-[80%] ">
            <div className="addTodo">
              <h1 className='  si:text-2xl font-bold text-center mb-14 '>i-Task - Manage your Todos at one place </h1>
              <h2 className="text-lg font-bold text-left ">Add a Todo</h2>
            </div>
            <div className='flex sm:flex-row  flex-col '>
              <input className='w-[100%] sm:w-[90%]  h-[60%] sm:h-[40px] rounded-md p-2 ' type="text" value={Todo} onChange={handleChange} onKeyUp={(e) => {
                if (e.key === "Enter" && (Todo.length>3))
                  handleAdd()
              }}/>
              <button onClick={handleAdd} disabled={Todo.length<=3}  className='bg-violet-800 hover:bg-violet-950 p-2 py-1 h-8   text-white rounded-md mx-3 text-sm font-bold my-3 sm:my-1  w-20 self-center disabled:bg-violet-300  ' >Add</button>
            </div>
          </div>
        </div>
        <div className='font-bold my-2 ml-[12%] '><input className='mr-1 ' onChange={showCompleted} value={showfinish}  type="checkbox" name="" id="finished" /><label className='hover:cursor-pointer' htmlFor="finished">Show finished</label></div>
        <div className='w-[90%] mx-auto  h-[1px]  bg-black opacity-15 my-3 '></div>
        {Todos.length == 0 ? <div className='text-xl font-bold text-center sticky top-3' > The list is Empty </div> : <h1 className='text-xl font-bold text-center sticky top-3 z-50'>Your Todos</h1>}
        <div className="box2 flex justify-center"d='box2'>
          {Todos[0] && <div className="todos bg-violet-50 rounded-md box-border p-2">
            {
              Todos.map((item, id) => {
                return (showfinish || !item.isCompleted ) && (
                  <>
                    <div key={id} className="todo flex  justify-center">
                      <input type="checkbox" className='mr-1' checked={item.isCompleted} onChange={handleCheck} name={item.id} id="" />
                      <div className="text w-[60%]  border-2 p-1 bg-yellow-100 my-5 rounded-md">
                        <p className={item.isCompleted ? 'si:text-xl text-xs line-through' : "si:text-xl text-xs"} >{item.Todo}</p>
                      </div>
                      <div className="buttons   h-20 flex flex-col  justify-center items-center  si:flex-row si:justify-between ml-6  self-center  ">
                        <button onClick={handleEdit} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 h-8 max-si:mb-1  text-white rounded-md mx-1 text-sm font-bold ' name={item.id}>Edit</button>
                        <button onClick={deleteItem} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 h-8 text-white rounded-md mx-1 text-sm font-bold' name={item.id} >Delete</button>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>}
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default App
