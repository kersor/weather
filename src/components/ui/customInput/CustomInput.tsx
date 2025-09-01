import { Dispatch } from 'react'
import styles from './styles.module.css'
import { CustomButtonClose } from '../customButton/customButtonClose/CustomButtonClose'

interface Props {
    funcOnChangeCity: (city: string) => void
    setInputCity: Dispatch<React.SetStateAction<string>> 
    inputCity: string
    funcCleanInput: () => void
}

export const CustomInput = ({
    funcOnChangeCity,
    setInputCity,
    inputCity,
    funcCleanInput
}: Props) => {

    const funcOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const city = e.target.value
        setInputCity(prev => city)
        funcOnChangeCity(city)
    }

    return (
        <div className={styles.wrapper_input}>
            <input className={styles.input} type="text" onChange={funcOnChange} value={inputCity}/>
            <CustomButtonClose onClick={funcCleanInput} />
        </div>
    )
}