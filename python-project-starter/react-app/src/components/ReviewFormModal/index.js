import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm';
import "./ReviewFormModal.css";

export default function ReviewFormModal({updateState, initReview, setUpdateState}) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }
    const openModal = () => {
        setUpdateState(false); //set update state in parent comp to false to allow create state on form
        setShowModal(true)
    }

    return (
        <>
            <button onClick={openModal} className="create-review-button">Write a review</button>
            {showModal && (
                <Modal onClose={closeModal}>
                    <ReviewForm updateState={updateState} initReview={initReview}/>
                </Modal>
            )}
        </>
    )
}
