import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Home/home.css";
import Swal from 'sweetalert2';
import {API} from '../../utilize/utilize';
import oops from "../../assets/oops.png";
import cookie from 'react-cookies'
export default function AllCountries() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const fetchAllData = async () => {
    let data = await axios
      .get("https://api.covid19api.com/summary")
      .then((result) => {
        return result.data;
      });
    setTimeout(() => {
      setData(data.Countries);
      setLoader(false);
    }, 6000);
  
  };

  useEffect(() => {
    fetchAllData();
  }, []);


  const addToMyRecord= async (e)=>{
    if(cookie.load('token')){

      let newData = {
        userId: cookie.load('id'),
        Country: e.Country,
        Total_Confirmed_Cases: e.TotalConfirmed,
        Total_Recovered_Cases: e.TotalRecovered,
        Total_Deaths_Cases: e.TotalDeaths,
        Date: e.Date,
      }
  
       await axios.post(`${API}/addRecord`,newData ,{
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
  
  
      }).then((result =>{return result})).then(
        Swal.fire({
          icon: 'success',
          title: 'Add Record',
          text: 'You have Added the Record successfully!',
          showConfirmButton: false,
           timer: 1500
        
        })
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Cannot Add Records',
        text: 'You have to Login first!',
      })
      
    }
  }

  return (
    <>
      <h2>COVID19 Statistics For All Countries</h2>

      {loader ? (
        <div className="loader">
          <div className="face">
            <div className="circle"></div>
          </div>
          loading
          <div className="face">
            <div className="circle"></div>
          </div>
        </div>
      ) : (
        <>
          {data ? (
            <div className="cards2">
              {data.map((e,idx) => {
                return (
                  <>
                    <div className="cards-inner2" key={idx}>
                      <h3>Country:{e.Country}</h3>
                      <h5>Total Confirmed Cases :{e.TotalConfirmed}</h5>
                      <h5>Total Deaths Cases:{e.TotalDeaths}</h5>
                      <h5>Total Recovered Cases:{e.TotalRecovered}</h5>
                      <h5>Date:{e.Date}</h5>
                      <span>
                        --------------------------------------------------------
                      </span>
                      <br></br>
                      <button onClick={()=>addToMyRecord(e)}>Add To My Record</button>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <img
              src={oops}
              alt="oops"
              style={{ width: "80%", height: "500px" }}
            ></img>
          )}
        </>
      )}
    </>
  );
}
