import React, { useState, useEffect, useContext } from "react";
import cookie from "react-cookies";
import axios from "axios";
import Swal from "sweetalert2";
import oops from "../../assets/oops.png";
import { Redirect, Switch } from "react-router-dom";
import { LoginContext } from "../../context/authContext";
import {API} from '../../utilize/utilize';

export default function MyRecords() {
  const auth = useContext(LoginContext);
  console.log(auth.loginStatus);
  const [myRecords, setMyRecords] = useState([]);

  const fetchMyRecord = async () => {
    let data = await axios
      .get(`${API}/MyRecords/${cookie.load("id")}`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then((result) => {
        return result.data;
      });
    setMyRecords(data);
  };
  useEffect(() => {
    fetchMyRecord();
  }, []);
  const DeleteRecord = async (e) => {
    console.log(e.id);
    await axios
      .delete(`${API}/MyRecords/${cookie.load("id")}/${e.id}`, {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      })
      .then(
        Swal.fire({
          icon: "success",
          title: "Delete Record",
          text: "You have Deleted the Record successfully!",
          showConfirmButton: false,
           timer: 1500
        })
      )
      .then(() => fetchMyRecord());
  };

  return (
    <>
       <h2>COVID19 Statistics For All Countries</h2>
      {cookie.load("token") ? (
        <>
          {myRecords.length ? (
            <div className="cards2" key={1}>
              {myRecords.map((e, idx) => {
                return (
                  <>
                    <div className="cards-inner2" key={idx}>
                      <h3>Country:{e.Country}</h3>
                      <h5>Total Confirmed Cases :{e.Total_Deaths_Cases}</h5>
                      <h5>Total Deaths Cases:{e.Total_Deaths_Cases}</h5>
                      <h5>Total Recovered Cases:{e.Total_Recovered_Cases}</h5>
                      <h5>Date:{e.Date}</h5>
                      <span>
                        --------------------------------------------------------
                      </span>
                      <br></br>
                      <button onClick={() => DeleteRecord(e)}>
                        Delete Record
                      </button>
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
      ) : (
        <>
          <Switch>
            <Redirect from="*" to={`/signin`}></Redirect>
          </Switch>
        </>
      )}
    </>
  );
}
