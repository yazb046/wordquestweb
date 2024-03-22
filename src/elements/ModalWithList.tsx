import React, { useEffect } from 'react'
import Modal from 'antd/es/modal/Modal'
import { useState } from 'react'

interface Props {
    isOpen:boolean,
  }

const ModalWithList: React.FC <Props> = ({isOpen,}) => {

    const[isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        setIsModalOpen(isOpen);
    },[isOpen]);

    const openModal = () => {
        setIsModalOpen(true);
      }
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return(
        <>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        </>
    )
}

export default ModalWithList