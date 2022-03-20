
import React from 'react';
import './App.css';

import {useEffect,useState} from 'react'
function App() {
  const [toDos,setTodos]= useState(()=>{
    // getting stored toDos data from localStorage
    const saved = localStorage.getItem("Storage");
    const initialValue = JSON.parse(saved);
    return (initialValue || "");
 })
  const [toDo,setTodo]=useState('')


 //Program to removing correspondend toDos data from localStorage of browser
 const index = toDos && toDos.findIndex(obj => obj.statusRemove == true);
 // console.log(index);
 if (index > -1) toDos && toDos.splice((index), 1);


 useEffect(() => {
  // storing toDos data to localStorage of browser
  localStorage.setItem("Storage", JSON.stringify(toDos));
}, [toDos]);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const day = dayNames[date.getDay()];

  const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currDate = new Date();
  const hours = currDate.getHours();
  const AMorPM = hours >= 12 ? 'PM' : 'AM'

  var hour = hours % 12;

  const hour12 = () => {
    if (hour === 0) hour = 12;
    return hour;
 };

 const toDoDate = currDate.getDate() + '.' + (currDate.getMonth() + 1) + '.' + currDate.getFullYear();
 const toDoDay = dayNamesShort[currDate.getDay()];
 const toDoTime = hour12() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' ' + AMorPM;
 const toDoTimeDateDay = toDoTime + ' ' + toDoDay + ' ' + toDoDate;


 const handleUserInput = (e) => {
  setTodo(e.target.value);
};

const handleInputSubmit = (e) => {
  e.preventDefault();
  if (toDo) {
     setTodos([...toDos, {
        id: Date.now(),
        text: toDo,
        toDoTime: toDoTimeDateDay,
        statusErase: false,
        statusDone: false,
        statusDrop: false,
        statusRetrieve: false,
        statusRemove: false
     }]);
     setTodo('');
  }
};
const resetInputField = () => {
  setTodo('');
};







  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝☕ </h2>
      </div>
      
      <form onSubmit={handleInputSubmit}>
            <div className="toDoInput">
               <div className="left">
                  <input value={toDo} onChange={handleUserInput} type="text" placeholder=" Plan Something . . ." />
               </div>
               <div className="right erase">
                  <i onClick={resetInputField} className="fas fa-eraser" title="Clear"></i>
               </div>
               <div className="rightEnd  add">
                  <button style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }} type="submit"><i className="fas fa-plus" title="Add"></i></button>
               </div>
            </div>
         </form>



      <div className="container done">
            <h3>Done</h3>
            {
            toDos.map((obj)=>{
    if(obj.statusDone && !obj.statusRemove){
      return(
        <div key={obj.id}  className="toDo">
        <div className="left"></div>
        <div className="top">
           <p className="textCross">{obj.text}</p>
        </div>
        <div className="bottom">
           <p>{obj.toDoTime}</p>
        </div>
        <div className="right bin">
           <i onClick={(e)=> {
             let isdelete = window.confirm("Deleting ToDo Permanently !");
             if(isdelete){
               e.target.value=true
               console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeei")
             }
             setTodos(toDos.filter((obj2)=>{
               if(obj2.id===obj.id){
                 obj2.statusRemove=e.target.value
               }
               return obj2;
             }))
           }} value={obj.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
        </div>
     </div>
      )   }

      return null;
 
  })}
         </div>



         <div className="container onGoing">
            <h3>On Going</h3>
           {
             toDos.map((obj)=>{
              if (!obj.statusDone && !obj.statusDrop) {
return(
                          <div key={obj.id}  className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setTodos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setTodos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value="{obj.statusDrop}" className="fas fa-times" title="Drop"></i>
                           </div>
                        </div>
)
              }else if (obj.statusRetrieve && !obj.statusDone) {
              return(
                <div key={obj.id}  className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setTodos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setTodos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                       obj.statusRetrieve = !e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value="{obj.statusDrop}" className="fas fa-times" title="Drop"></i>
                           </div>
                        </div>
              )
              
              
              }

             })
            
             }
                        
                     
              
                        
                    
         </div>

         <div className="container dropped">
            <h3>Dropped</h3>
            
              {
                toDos.map((obj)=>{
                  if (obj.statusDrop && !obj.statusRetrieve && !obj.statusRemove){
                      
                  
                  return(
                   
                     <div key={obj.id}  className="toDo">
                           <div className="left recycle">
                              <i onClick={(e)=>{
                                e.target.value=true;
                                setTodos(toDos.filter((obj2)=>{
                                  if(obj.id === obj2.id){
                                    obj2.statusRetrieve= e.target.value;
                                  }
                                  return obj2;
                                }))
                              }} value={obj.statusRetrieve} className="fas fa-redo-alt" title="Retrieve"></i>
                           </div>
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right bin">
                              <i onClick={(e)=> {
             let isdelete = window.confirm("Deleting ToDo Permanently !");
             if(isdelete){
               e.target.value=true
               console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeei")
             }
             setTodos(toDos.filter((obj2)=>{
               if(obj2.id===obj.id){
                 obj2.statusRemove=e.target.value
               }
               return obj2;
             }))
           }}  value={obj.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
                           </div>
                        </div>
                  )
                  }


                })
              
              }
                        
                     
         </div>







      
    </div>
  );
}

export default App;



















// <div className="todos">
// {
//            toDos.map((value)=>{

// return(         
//    <div className="todo">
//     <div className="left">
//       <input value={value.status} onChange={(e)=>{
//         console.log(e.target.checked)
//         console.log(value)
//         setTodos(toDos.filter(val2=>{
//           if(val2.id===value.id){
//             val2.status=e.target.checked
//           }
//           return val2;
//         }))
//       }} type="checkbox" name="" id="" />
//       <p>{value.text}</p>
//     </div>

//     <div className="right">
//       <i className="fas fa-times"></i>
//     </div>
//   </div>)
//     })
//   }
//   {toDos.map((obj)=>{
//     if(obj.status){
//       return(
//         <h1>{obj.text}</h1>
//       )   }

//       return null;
 
//   })}
  
// </div>