/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import Event from './event.jsx'
import './App.css'

import close from '/cross.png'
import edit from '/public/edit.png'
function App() {

 
    const [LocalData, setLocalData] = useState(JSON.parse(localStorage.getItem('session')))
 
  const [num,setNum]=useState("0")
 
  const  Local=JSON.parse(localStorage.getItem('session'))

const week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const [addTask, SetAddTask] = useState({
  startTime:"",
  task:"",
  endTime:"",
})
const [selectDay, setSelectDay] = useState("")

const [dates, setDates] = useState(new Date())
const [nav, setNave] = useState("0")
// console.log(dates);
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const displayMonthAndYear=dates.toLocaleDateString('en-IN',  {month: 'long',year: 'numeric'}, )
// console.log(displayMonthAndYear);

// const navication=0
// add event 

const eventHandler=(e)=>{
  const string=e.toString()
  const addEvent=displayMonthAndYear.split(" ")
  addEvent.push(string)
  console.log(addEvent);
  const obj={mouth:addEvent[0],year:addEvent[1],day:addEvent[2]}
 
// Display output
  // const JsonData=JSON.stringify(obj);
  setSelectDay(obj)

}

const handleSubmit=(e)=>{
  e.preventDefault()
  let eventAdd = {
    ...selectDay,
    ...addTask
};
var SaveEvent = [];
SaveEvent = JSON.parse(localStorage.getItem('session')) || [];
SaveEvent.push(eventAdd);
    localStorage.setItem('session', JSON.stringify(SaveEvent));
    setNum(num+1)

  SetAddTask({
  startTime:"",
  task:"",
  endTime:"",})
}
// eventDelete
const eventDelete = (e) => {
  console.log(e);
  const  remove =JSON.parse(localStorage.getItem('session'))
  remove.splice(e, 1);
  // console.log(remove);
   localStorage.setItem('session', JSON.stringify(remove));
   setNum(num-1)
   
  } 
  const eventUpdate = (e) => {
    alert(`Hello Recruiter's ,

    I hope this message finds you well. I wanted to inform you that I haven't enabled the update function yet, so I'm currently working on a quick fix to address the issue.
    
    Thank you for your understanding.
    
    Best regards,
    Elaiya Perumal`);
  }
  

// handleNextMonth
const handleNextMonth = () => {
  const nextMonth = new Date(dates);
  nextMonth.setMonth(dates.getMonth() + 1);
  setNave(nav+1)
  setDates(nextMonth);
};

// handlePrevMonth
const handlePrevMonth = () => {
  const prevMonth = new Date(dates);
  prevMonth.setMonth(dates.getMonth() - 1);
  setNave(nav-1)
  setDates(prevMonth);
};

// get date/month/year
const day =dates.getDate()
// console.log(day);
const month =dates.getMonth()
// console.log(month);
const year =dates.getFullYear()

// current month 
const firstMonthDays=new Date(year,month,1);
const stringWeek=firstMonthDays.toLocaleDateString('en-IN', options)
// current Month total Days
const currentMonthDays = new Date(year,month +1,0).getDate();
// console.log(currentMonthDays);
const today=stringWeek.split(", ")[0];
// console.log(today);
// find week 
const currentWeek=week.indexOf(today);

const currentDays=day

  const days = [];

  for (let i = 0; i <currentWeek; i++) {
    days.push(<div key={`empty-${i}`} className="num-empty"></div>);
  }
  for (let i = 1; i <= currentMonthDays; i++) {

    if (currentDays==i && nav==0 ) {
      days.push(<div onClick={()=>eventHandler(i)}  id="yourDivId" key={i} className="num">{i}</div>);
    }
    else{
      days.push(<div onClick={()=>eventHandler(i)} key={i} className="num">{i}</div>);
    }
   
  }

  useEffect(() => {
    console.log("use effect call")
    setLocalData(JSON.parse(localStorage.getItem('session')))
  }, [num])

 
return (

<>
    <div className="container">

<div className="month"> 
    <div className="current-month"><span onClick={handlePrevMonth} className="back"> {"<"} </span>{displayMonthAndYear} <span onClick={handleNextMonth} className="forward">{">"}</span></div> 
   </div> 
   <div className="head">
   <div className="week">sun</div>
   <div className="week">mon</div>
   <div className="week">Thu</div>
   <div className="week">wen</div>
   <div className="week">The</div>
   <div className="week">fri</div>
   <div className="week">sat</div>
   </div>
   <div className="day">  {days}
   </div>
   <div className="addTask">
   
    <div className="addOne">
<h4>Add Event</h4>

<h6>{selectDay.month}</h6>
{(selectDay )?
   
    <form  className=" from" onSubmit={(e)=>handleSubmit(e)}>
  <label htmlFor="appt">Title </label>
  <input required  value={addTask.task} onChange={(e)=>SetAddTask({...addTask, task: e.target.value})} type="text" id="appt" name="appt"/>
  
  <label htmlFor="appt">Select a Start time </label>
  <input placeholder="Start time" required  value={addTask.startTime} onChange={(e)=>SetAddTask({...addTask, startTime: e.target.value})} type="time" id="appt" name="appt"/> 


  <label htmlFor="appt">Select a end time </label>
  <input required  value={addTask.endTime} onChange={(e)=>SetAddTask({...addTask, endTime: e.target.value})} type="time" id="appt" name="appt"/><br/>

  <input className="submit-btn" type="submit"/>
          </form>:<> <h3 className="selectDate">select the Date</h3></>}

    {/* <div className="addTwo" > hi</div> */}
      
    </div>

   </div>
   {/* eventList */}
    <div className="Eventlist">
<h4>List Event</h4>
{(LocalData==null)?<></>:
 LocalData.map((item,index)=>( <div key={index} className="eventList">
<h6> {item.task}</h6>
<span>{item.day}/{item.mouth}</span><img  onClick={()=>eventDelete(index)} className="close" src={close}/><br/><img onClick={()=>eventUpdate(index)} className="edit" src={edit}/>
  <h6> Event Start Time:{item.startTime}</h6>
</div>))}

   </div>
  </div>
  
 

  </>
  )
}

export default App
