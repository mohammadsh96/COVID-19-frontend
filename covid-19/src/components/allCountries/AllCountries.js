import React, { useState, useEffect } from "react";
import axios from 'axios'
import '../Home/home.css'
import oops from '../../assets/oops.png'
export default function AllCountries(){

const [data ,setData]=useState([])
const [loader,setLoader]=useState(true)
const fetchAllData=async()=>{

    let data =await axios.get('https://api.covid19api.com/summary').then((result)=>{
        return result.data;
    })
    setTimeout(()=>{
        setData(data.Countries)
        setLoader(false)
    },6000)
    if(data){

       
        console.log('data.Countries: ', data);
    }
}


useEffect(()=>{
    fetchAllData()
},[])
    return(<>
    <h2>COVID19 statistics For All Countries</h2>
   
    {loader ? 
     <div class="loader">
     <div class="face">
       <div class="circle"></div>
     </div>
     loading
     <div class="face">
       <div class="circle"></div>
     </div>
   </div>
     
     : <> 
 {data ?
<div className="cards2">

    {data.map(e=>{
        return(<>
        <div className="cards-inner2">
        <h3>Country:{e.Country}</h3>
        <h5>Total Confirmed Cases :{e.TotalConfirmed}</h5>
        <h5>Total Deaths Cases:{e.TotalDeaths}</h5>
        <h5>Total Recovered Cases:{e.TotalRecovered}</h5>
        <h5>Date:{e.Date}</h5>
        <span>--------------------------------------------------------</span>
        <br></br>
        <button>Add To My Record</button>
        </div>
        </>)
        })}
    </div>
     : <img src={oops} alt="oops" style={{width:"80%" ,height:"500px"}}></img>}
    </>}
   
   
    
    </>)
}