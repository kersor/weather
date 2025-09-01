import React from 'react'
import styles from './styles.module.css'

interface Props {
    onClick: () => void
}

export const CustomButtonClose = ({
    onClick
}: Props) => {
    return (
        <div onClick={onClick} className={styles.button}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b2b2b2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </div>
    )
}
