import React,{useEffect} from 'react';
import covid from '../../assets/covid.png'
export default function PageNotFound(){
useEffect(()=>{
    window.scrollTo(0, 440);
})
    return(
    <img src={covid} alt="covid" style={{width:"80%",height:"800px"}}/>
    )
}