import React, { Dispatch, memo, Ref, RefObject, useMemo, useRef, useState } from 'react'
import { City } from '../../scripts/types/city'
import styles from './styles.module.css'
import { CustomInput } from '../ui/customInput/CustomInput'
import { CustomButtonClose } from '../ui/customButton/customButtonClose/CustomButtonClose'
import { funcGetCoordinates } from '../../scripts/api/getCoordinates'
import { funcDebaunce } from '../../scripts/utils/debaunce'

interface Props {
    isOpen: boolean
    onOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const URL_IMAGES = process.env.REACT_APP_API_IMAGES

export const Modal = memo(({
    isOpen,
    onOpen
}: Props) => {

    const [citys, setCitys] = useState<City[]>([])
    const [inputCity, setInputCity] = useState<string>("")
    const [notFoundCity, setNotFoundCity] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
       
    const funcDebaunceCity = async (city: string) => {
        if (city.length <= 1) {
            return
        }

        const coordinates = await funcGetCoordinates(city)

        if (coordinates === undefined) {
            setNotFoundCity(prev => true)
            setLoading(prev => false)
            return
        }
        setCitys(prev => coordinates)
        setLoading(prev => false)
    }

    const debaunce = useMemo(() => funcDebaunce(funcDebaunceCity, 1000), []) 

    if (!isOpen) return null

    
    
    const funcOnChangeCity = (city: string) => {
        setLoading(prev => true)
        setCitys(prev => [])
        setNotFoundCity(prev => false)

        if (city.length <= 1) {
        setLoading(prev => false)
        }

        debaunce(city)
    }

    const funcCleanInput = () => {
        setNotFoundCity(prev => true)
        setLoading(prev => false)
        setCitys(prev => [])
        setInputCity(prev => "")
    }

    const funcOnKey = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    const funcOnClose= (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onOpen(prev => false)
    }





    return (
        <div className={styles.wrapper} onClick={funcOnClose}>
            <div className={styles.container} onClick={funcOnKey}>
                <div className={styles.header}>
                    <div className={styles.title}>Search Locations</div>
                    <CustomButtonClose onClick={() => onOpen(prev => false)} />
                </div>
                <div className={styles.modal}>
                    <CustomInput funcCleanInput={funcCleanInput} inputCity={inputCity} setInputCity={setInputCity} funcOnChangeCity={funcOnChangeCity} />
                    <div className={styles.body}>
                    {
                        !!citys.length ? (
                            <div className={styles.list}>
                                {
                                    citys.map((city: City) => (
                                        <div key={city.admin1_id} className={styles.item}>
                                            <div className={styles.item_top}>
                                                <img className={styles.item_photo} src={`${URL_IMAGES}/${city.country_code.toLowerCase()}.svg`} alt="" />
                                                {city.name}
                                            </div>
                                            <span className={styles.city}>{city.admin1}, {city.country}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            loading ? (
                                <div>Loading...</div>
                            ) : (
                                notFoundCity ? (
                                    <div>No locations found</div>
                                ) : (
                                    <div>Start typing to search for locations</div>
                                )
                            ) 
                        )
                    }  
                    </div>      
                </div> 
        </div>
        </div>

    )
})
