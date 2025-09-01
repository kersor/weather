import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import { funcDebaunce } from './scripts/utils/debaunce';
import { funcGetCoordinates } from './scripts/api/getCoordinates';
import { City } from './scripts/types/city';
import { Modal } from './components/modal/Modal';
import { CustomButton } from './components/ui/customButton/customButton/CustomButton';

function App() {
  const [weather, setWeather] = useState({

  })
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

