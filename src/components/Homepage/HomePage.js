import React, { useState, useEffect} from 'react'
import "./HomePage.css"
import ApiRequest from '../../api/ApiRequest'
import ErrorModal from '../ErrorModal/ErrorModal'
import Navbar from '../Navbar/Navbar'
import moment from 'moment'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector} from 'react-redux'
import {addCity, removeCity} from '../../store/likes/likes'

const HomePage = () => {
    
    const [requestFailed, setRequestFailed] = useState(false)
    
    const [hasLoadedDefault, setHasLoadedDefault] = useState(false)

    const [loading, setLoading] = useState(false)
    
    const [search, setSearch] = useState('')
   
    const [city, setCity] = useState('')

    const [text, setText] = useState('')
    
    const [temp, setTemp] = useState('')
    
    const [fiveDayForecast, setFiveDayForecast] = useState('')

    const dispatch = useDispatch()
    const selected = useSelector(state => state.selectedCities)
    const likedCities = useSelector (state => state.likedCities)
    
    const handleLike = event => {
      event.preventDefault();
      dispatch(addCity(city))
      return 
    };

    const handleRemove = event => {
        event.preventDefault();
        dispatch(removeCity(city))
        return 
      };
    
    const handleChange = event => setSearch(event.target.value)
    
    const handleSearch = async (search = 'Tel Aviv') => {
        
        setRequestFailed(false)
        setLoading(true)
       
        const data = await ApiRequest.fetchWeatherInfo(search)
        if(typeof data === 'string'){
            setRequestFailed(true)
            setLoading(false)
            return
        }        
        setCity(data.cityName)
        
        setTemp(data.currentWeather.data[0].Temperature.Imperial.Value)

        setText(data.currentWeather.data[0].WeatherText)
        
        setFiveDayForecast(data.fiveDayForecast.data.DailyForecasts)
        
        setRequestFailed(false)
        setLoading(false)
        return data
    }

    useEffect(() => {
        if(!hasLoadedDefault){
            handleSearch(selected[0])
            setHasLoadedDefault(true)
        } 
    },[]) // eslint-disable-line
    
    //functions to return UI elements
    const searchField = () => (
        <div className="text-field"> 
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            <Button variant="outlined" 
                onClick={ (event) => { event.preventDefault(); handleSearch(search) }}> 
                search 
            </Button>
        </div>
    )

    const weatherDisplayHeader = () => { 
        return ( 
            <div className="header">
                
                <div className="header-left">
                    <span className="text">{city} : {temp} F </span>
                </div>
                
                 { likedCities.indexOf(city) < 0 ?  
                    <div className="header-right">
                        <Button variant="text" onClick={handleLike}><FavoriteBorderIcon/></Button>
                    </div> :  
                    
                    <div className="header-right">
                        <Button variant="text" onClick={handleRemove}><FavoriteIcon/></Button>
                    </div> 
                }
            </div>
        )
    }

    const textDisplay = () => (
        <div className='text-display'>
            {text}
        </div>
    )

    const weatherDisplayBody = () => {
        return (
            <div className='weather-display-grid'>
                { fiveDayForecast.length  ? fiveDayForecast.map((element) => {
                    return ( 
                        <div className="card" key={element.Date}>
                            <span className="first">{element.Temperature.Maximum.Value} F </span>
                            <span className="second">{moment(element.Date).format('dddd')}</span> 
                        </div>
                    )
                }) : null } 
            </div>
        )
    }

    const displayLogic = () => {
        
        if (!loading && !requestFailed) {
            return (
                <div className='weather-display-wrapper'>
                    {weatherDisplayHeader()}
                    {textDisplay()}
                    {weatherDisplayBody()}
                </div>
            )
        }
       
        else if (!loading && requestFailed) { return ( <ErrorModal/> ) }
       
        return ( <CircularProgress /> ) 
    }
    
    return (
    <> 
        <Navbar/>
        <div className="homepage-wrapper">
            {searchField()}
            {displayLogic()}
        </div>
    </>
   )
}

export default HomePage