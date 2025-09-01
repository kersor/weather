import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './App.module.css'
import axios from 'axios';
import { funcDebaunce } from './scripts/utils/debaunce';
import { funcGetCoordinates } from './scripts/api/getCoordinates';
import { City } from './scripts/types/city';
import { Modal } from './components/modal/Modal';

function App() {
  const [openModal, setOpenModal] = useState(false)
  
  return (
      <div>
        <div onClick={() => setOpenModal(prev => true)}>Open</div>
        <Modal
          isOpen={openModal}
          onOpen={setOpenModal}
        />
      </div>
  )
}

export default App;
