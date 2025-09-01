import React from 'react'
import styles from './styles.module.css'

interface Props {
    onClick: () => void,
    title: string
}

export const CustomButton = ({
    onClick,
    title
}: Props) => {
    return (
        <div onClick={onClick} className={styles.button}>
            {title}
        </div>
    )
}
