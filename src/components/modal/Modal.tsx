import React from 'react'
import { City } from '../../scripts/types/city'
import styles from './styles.module.css'

interface Props {
    citys: City[]
    notFoundCity: boolean
    funcOnChangeCity: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const URL_IMAGES = process.env.REACT_APP_API_IMAGES

export const Modal = ({
    citys,
    notFoundCity,
    funcOnChangeCity
}: Props) => {
    console.log(citys)
  return (
    <div className={styles.wrapper}>
        <input className={styles.input} type="text" onChange={funcOnChangeCity}/>
        <div className={styles.body}>
        {
            !!citys.length ? (
            <div className={styles.list}>
                {
                    citys.map((city: City) => (
                        <div className={styles.item}>
                            <img className={styles.item_photo} src={`${URL_IMAGES}/${city.country_code.toLowerCase()}.svg`} alt="" />
                            {city.name}
                        </div>
                    ))
                }
            </div>
            ) : (
                notFoundCity ? (
                    <div>No locations found</div>
                ) : (
                    <div>Start typing to search for locations</div>
                )
            )
        }  
        </div>          
    </div>
  )
}
