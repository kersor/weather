import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import { funcDebaunce } from './scripts/utils/debaunce';
import { funcGetCoordinates } from './scripts/api/getCoordinates';
import { City, CityLocalStorage } from './scripts/types/city';
import { Modal } from './components/modal/Modal';
import { CustomButton } from './components/ui/customButton/customButton/CustomButton';
import { useCityLocalStorage } from './scripts/hooks/useCityLocalStorage';
import { weatherCodeMap } from './scripts/const/weatherCode';
import { days } from './scripts/const/days';

const defaultState: CityLocalStorage = {
    admin1: "",          
    admin1_id: 0,       
    country: "",         
    country_code: "",    
    country_id: 0,     
    elevation: 0,       
    feature_code: "",   
    id: 0,             
    latitude: 0,        
    longitude: 0,    
    name: "",           
    population: 0,     
    timezone: "",
    daily: {
      temperature_2m_max: [],
      temperature_2m_min: [],
      time: [],
      weathercode: []
    }  
}


function App() {
  const [value, setValue] = useCityLocalStorage(
    process.env.REACT_APP_KEY_LOCAL_STORAGE_WEATHER as string || "weather",
    defaultState
  )

  const [openModal, setOpenModal] = useState(false)

  
  return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.body}>
            <div className={styles.content}>
                {
                  value.name ? (
                    <React.Fragment>
                      <div className={styles.city}>{value.name}, {value.country}</div>
                      <div className={styles.weather}>
                        <div className={styles.weather_nowDay}>
                          <BlockWeatherNowDay value={value} index={0} />
                        </div>
                        <div className={styles.weather_nextDays}>
                          <BlockWeatherNextDays value={value} index={1}/>
                          <BlockWeatherNextDays value={value} index={2}/>
                          <BlockWeatherNextDays value={value} index={3}/>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className={styles.city}>Choose City</div>
                  )
                }
            </div>
            <div onClick={() => setOpenModal(prev => true)} className={styles.footer}>
               List of cities
            </div>
          </div>
          
        </div>
        
        <Modal
          isOpen={openModal}
          onOpen={setOpenModal}
          setValue={setValue}
        />
      </div>
  )
}

const BlockWeatherNextDays = ({
  value,
  index
}: {
  value: CityLocalStorage
  index: number
}) => {
  const date = new Date(value.daily.time[index])

  const day = index === 1 ? "Tomorrow" : days[date.getDay()]
  const temp_min = value.daily.temperature_2m_min[index]
  const temp_max = value.daily.temperature_2m_max[index]
  
  return (
    <div className={styles.blockWeatherNextDays}>
      <div className={styles.blockWeatherNextDays_date}>
        <div>{day}</div>
        <div>{weatherCodeMap[value.daily.weathercode[index]]}</div>
      </div>

      <div className={styles.blockWeatherNextDays_temperature}>
        <div>{temp_max}°</div>
        <div>/ {temp_min}°</div>
      </div>
    </div>
  )
}

const BlockWeatherNowDay = ({
  value,
  index
}: {
  value: CityLocalStorage
  index: number
}) => {
  const date = new Date(value.daily.time[index])

  const day = index === 1 ? "Tomorrow" : days[date.getDay()]
  const temp_min = value.daily.temperature_2m_min[index]
  const temp_max = value.daily.temperature_2m_max[index]
  
  return (
    <div className={styles.blockWeatherNowDay}>
      <div className={styles.blockWeatherNowDay_date}>
        <div>{day}</div>
        <div>{weatherCodeMap[value.daily.weathercode[index]]}</div>
      </div>

      <div className={styles.blockWeatherNowDay_temperature}>
        <div>{temp_max}°</div>
        <div>/ {temp_min}°</div>
      </div>
    </div>
  )
}

export default App;

