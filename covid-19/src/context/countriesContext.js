import React, { useState, useEffect } from "react";
import axios from "axios";

export const CountriesContext = React.createContext();

export default function CountriesProvider(props) {

    const [AllCountries ,setCountries]=useState([])

  const getCountries = async () => {
    try {
      let data = await axios.get("https://api.covid19api.com/summary").then((result)=>{return result.data});
         let countries=data.Countries.map((e)=>{
        return e.Country;
      })
      if(data){
        setCountries(countries);
      }
    } catch (err) {
      console.log(err);
    }
  };
useEffect(()=>{
    getCountries();
})

  const state = {
    getCountries: getCountries,
    AllCountries:AllCountries,
  };
  return (
    <CountriesContext.Provider value={state}>
      {props.children}
    </CountriesContext.Provider>
  );
}
