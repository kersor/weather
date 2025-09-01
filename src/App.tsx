import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import { funcDebaunce } from './scripts/utils/debaunce';
import { funcGetCoordinates } from './scripts/api/getCoordinates';
import { City, CityLocalStorage } from './scripts/types/city';
import { Modal } from './components/modal/Modal';
import { CustomButton } from './components/ui/customButton/customButton/CustomButton';
import { useCityLocalStorage } from './scripts/hooks/useCityLocalStorage';

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
                <div className={styles.city}>Moscow, Russia</div>
                <div className={styles.weather}>
                  <div className={styles.weather_nextDays}>
                    <BlockWeatherNextDays />
                    <BlockWeatherNextDays />
                    <BlockWeatherNextDays />
                  </div>
                  <div className={styles.weather_nowDay}>123</div>
                </div>
            </div>
            <div className={styles.footer}>
               <CustomButton title='Open' onClick={() => setOpenModal(prev => true)} />
            </div>
            
           
          </div>
          
        </div>
        
        <Modal
          isOpen={openModal}
          onOpen={setOpenModal}
        />
      </div>
  )
}

const BlockWeatherNextDays = () => {
  return (
    <div className={styles.blockWeatherNextDays}>
      <div className={styles.blockWeatherNextDays_date}>
        <div>Tomorrow</div>
        <div>Clear</div>
      </div>

      <div className={styles.blockWeatherNextDays_temperature}>
        <div>11°</div>
        <div>/ 10°</div>
      </div>
    </div>
  )
}

export default App;

