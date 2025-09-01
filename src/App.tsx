import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import { funcDebaunce } from './scripts/utils/debaunce';
import { funcGetCoordinates } from './scripts/api/getCoordinates';
import { City } from './scripts/types/city';

function App() {
  const [citys, setCitys] = useState<City[]>([])
  const [inputCity, setInputCity] = useState<string>("")

  const funcDebaunceCity = (city: string) => setInputCity(prev => city)
  const debaunce = funcDebaunce(funcDebaunceCity, 1000);
  
  const funcOnChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    debaunce(e.target.value)
  }

  useEffect(() => {
    if (!inputCity.length) {
      setCitys(prev => [])
      return
    }
    
    async function fecthData() {
      const coordinates = await funcGetCoordinates(inputCity)
      setCitys(prev => coordinates)
    }

    fecthData()
  }, [inputCity])
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.body}>
          <input className={styles.input} type="text" onChange={funcOnChangeCity}/>
          <div className={styles.list}>
            {
              citys.length && citys.map((city: City) => (
                <div className={styles.item}>{city.name}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div> 
  )
}

export default App;
