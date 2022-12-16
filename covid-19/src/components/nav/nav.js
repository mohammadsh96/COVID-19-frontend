import React from 'react'
import './nav.css'

export default function Nav(){
    return(
        <div className="nav">
        <nav>
           
        <a href='/'>Home</a>
        <a href='AllCountries'>All Countries</a>
        <a href='MyRecords'>My Records</a>
        <a href='/signup'>signup</a>
        <a href='/signin'>signin</a>
        </nav>
        </div>
    )
}