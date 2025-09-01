import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import { funcDebaunce } from './scripts/utils/debaunce';
import { funcGetCoordinates } from './scripts/api/getCoordinates';
import { City } from './scripts/types/city';
import { Modal } from './components/modal/Modal';

function App() {
  const [citys, setCitys] = useState<City[]>([])
  const [inputCity, setInputCity] = useState<string>("")
  const [notFoundCity, setNotFoundCity] = useState<boolean>(false)

  const funcDebaunceCity = (city: string) => setInputCity(prev => city)
  const debaunce = funcDebaunce(funcDebaunceCity, 1000);
  
  const funcOnChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    debaunce(e.target.value)
  }

  useEffect(() => {
    if (inputCity.length < 2) {
      setCitys(prev => [])
      setNotFoundCity(prev => false)
      return
    }
    
    async function fecthData() {
      const coordinates = await funcGetCoordinates(inputCity)

      if (coordinates === undefined) {
        setNotFoundCity(prev => true)
        return
      }
      setCitys(prev => coordinates)
    }

    fecthData()
  }, [inputCity])
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Modal
          citys={citys}
          notFoundCity={notFoundCity}
          funcOnChangeCity={funcOnChangeCity}
        />
      </div>
    </div> 
  )
}

export default App;
