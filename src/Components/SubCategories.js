import React, { useState, useEffect } from 'react'
import './../styles/SubCategories.css'
import Loader from "react-js-loader";
import Card from './Card'

const SubCategories = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [checkClick,setCheckClick] = useState(0);
    const [user, setUser] = useState([]);
    
    var myAPI = "https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=";
    
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return setUser(data);
        } 
        catch (error) {
            
        }
        setCheckClick(0);
    }

    useEffect(() => {
        fetchData();
    },[])

    const startLoader = () =>{
        setCheckClick(1);
    }

    const startDateChangeHandler = (event) => {
        setStartDate(event.target.value);
    };
    const endDateChangeHandler = (event) => {
        setEndDate(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        setUser([]);
        myAPI = myAPI + startDate + "&end_date="+endDate+"&thumbs=true";
        fetchData(myAPI);
        setStartDate('');
        setEndDate('');
    };

  return (
    <div className='subCategories'>
      <div>
        <h1>SUB CATEGORIES</h1>
      </div>
      <h2>Select Duration</h2>

      <form onSubmit={submitHandler}>
            <div className='new-expense__control'>
                <label>Start Date:</label>
                <input
                    type='date'
                    min='1019-01-01'
                    max='2022-12-31'
                    value={startDate}
                    onChange={startDateChangeHandler}
                />
                <label>End Date:</label>
                <input
                    type='date'
                    min='1019-01-01'
                    max='2022-12-31'
                    value={endDate}
                    onChange={endDateChangeHandler}
                />
            </div>
            <input type="submit" value="Submit" onClick={startLoader} className="submitButton"/>
        </form>
        {
            
            <div className='results'>
            {
                user.length > 0 ?(
                user.map((data) => (
                        <Card title={data.title}
                            url={data.url}
                            hdurl={data.hdurl}
                            date={data.date} 
                            type = {data.media_type}
                            vid_url = {data.thumbnail_url}
                            explanation = {data.explanation}
                            name = {data.copyright}
                        />
                    
                    ))
                ):(checkClick === 0?(<></>):(
                
                <Loader type="spinner-circle" bgColor={"#FFFFFF"} title={"Loading Please Wait"} color={'#FFFFFF'} size={100} />
                
                ))
            }
            </div>
        }
    </div>
  )
}

export default SubCategories