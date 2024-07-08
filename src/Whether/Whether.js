import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Whether.css"
import tempreture from './travel (2).png'
import location from './location (2).png'
import time from './timetable.png'
import wind from'./wind.png'


export function Whether(){

    const [city, setCity]=useState("pune");
    const [whether, setWhether]=useState();
      let temp ; 

      useEffect(
        ()=>{
          fetchWether()
        },[]
      )

      useEffect(
        ()=>{
          fetchWether()
        },[city]
      )

  

    const fetchWether = async () => {

    try{

            const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=b1e9536c6b7a406092c161607242406&q=${city}&aqi=no`);
    
           setWhether(result.data);
           console.log(whether);
          
        }
        catch (error){
            console.error("this is error fetching api", error);
          }
        
    };
   {
    whether && ( temp = whether.current.temp_c )
    console.log(temp)
   }

   if(temp>21)
    {
  
    document.getElementById("img").classList.add("bg-sunny")
    document.getElementById("img").classList.remove("bg-rain")
    document.getElementById("img").classList.remove("bg-cloudy")
    document.getElementById("img").classList.remove("bg-snow")
   }
  else if (temp>18) {
    document.getElementById("img").classList.remove("bg-sunny")
    document.getElementById("img").classList.add("bg-rain")
    document.getElementById("img").classList.remove("bg-cloudy")
    document.getElementById("img").classList.remove("bg-snow")
  }
  else if (temp>10) {
    document.getElementById("img").classList.remove("bg-sunny")
    document.getElementById("img").classList.remove("bg-rain")
    document.getElementById("img").classList.add("bg-cloudy")
    document.getElementById("img").classList.remove("bg-snow")
  }
  else if (temp<10) {
    document.getElementById("img").classList.remove("bg-sunny")
    document.getElementById("img").classList.remove("bg-rain")
    document.getElementById("img").classList.remove("bg-cloudy")
    document.getElementById("img").classList.add("bg-snow")
    
  }


    return (
      
        <div className="main" id="img"  >
          <h1 className="head">Weather App</h1>
          <div className="text">
     <input className="input"  type='text' value={city}
     onChange={(e)=>{
       setCity(e.target.value);
     }}
     />
     </div>
     {/* <button className="search" onClick={fetchWether}>search</button> */}

     {
     
     whether &&(
      
         <div>
         
           <h1 className="name"><img src={location} className="location"/>{whether.location.name}<br/> {whether.location.region}</h1>
           
           
           <div className="maindiv">
           <div className="firstdiv">
            <h3 className="celcias"><img src={tempreture} className="tempreture"/> {whether.current.temp_c} ℃</h3>
            
           </div>
           
        
          <div className="thirddiv secdiv">
           <h2 className="des"><img className="img"  src={whether.current.condition.icon}></img> {whether.current.condition.text}</h2>
           </div>
           <div className="secdiv">
           <h2><img src={wind} className="time"/><br/>Wind Speed<br/> {whether.current.wind_kph}</h2>
           </div>
          
         </div>
         <div className="last">
          
         <h2>Current: {whether.location.localtime}</h2>
       
        
         <h2>Last updated: {whether.current.last_updated}</h2>
  
         </div>
         </div>
         
       )
     }
         </div>
       );
    }     