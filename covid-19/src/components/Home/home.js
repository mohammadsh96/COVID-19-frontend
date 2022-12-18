import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { countries } from "./data";
export default function Home() {
  const [statistics, setStatistics] = useState({});
  const [cards, setCards] = useState([]);
  const [url, SetUrl] = useState(
    "https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z"
  );

  const fetchAllData = async () => {
    let data = await axios
      .get("https://api.covid19api.com/world/total")
      .then((result) => {
        return result.data;
      });
    setStatistics(data);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const SearchFun = (e) => {
    e.preventDefault();
    let from = e.target.from.value + "T00:00:00Z";
    let to = e.target.to.value + "T00:00:00Z";
    SetUrl(
      `https://api.covid19api.com/country/${e.target.country.value}/status/confirmed?from=${from}&to=${to}`
    );
  };

  const getSpecificCountryData = async () => {
    let data = await axios.get(url).then((result) => {
      return result.data;
    });

    setCards(data);
  };
  useEffect(() => {
    getSpecificCountryData();
    // eslint-disable-next-line
  }, [url]);
  return (
    <>
      <div>
        <h3  id="titles">World Total statistics</h3>
        <div className="total-statistics">
          <h4>Total Confirmed :{statistics.TotalConfirmed} </h4>
          <h4>Total Deaths :{statistics.TotalDeaths}</h4>
          <h4>Total Recovered :{statistics.TotalRecovered}</h4>
        </div>
      </div>
      <br></br>
      <br></br>
      <h3 id="titles">Get statistics for a Specific Country</h3>

      <div className="search-form">
        <form onSubmit={SearchFun}>
          <select name="country">
            {countries.map((e, idx) => {
              return (
                <option key={idx} value={e}>
                  {e}
                </option>
              );
            })}
          </select>

          <input type="date" name="from" required></input>

          <input type="date" name="to" required></input>
          <button type="submit">SEARCH</button>
        </form>
      </div>

      <div className="cards">
        {cards.map((e, idx) => {
          return (
            <div className="cards-inner" key={idx}>
              <h3>Date:{e.Date}</h3>
              <p style={{ fontSize: "10px", color: "gray" }}>{e.Country}</p>
              <h5>Number of confirmed cases :{e.Cases}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
}
