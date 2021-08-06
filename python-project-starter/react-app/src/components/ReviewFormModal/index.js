import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm';

export default function ReviewFormModal({updateState, initReview}) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }
    const openModal = () => {
        updateState = false;
        setShowModal(true)
    }

    return (
        <>
            <button onClick={openModal}>Write a review</button>
            {showModal && (
                <Modal onClose={closeModal}>
                    <ReviewForm updateState={updateState} initReview={initReview}/>
                </Modal>
            )}
        </>
    )
}
