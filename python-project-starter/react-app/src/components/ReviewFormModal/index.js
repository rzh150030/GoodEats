import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

export default function ReviewFormModal({modalState}) {
    const [showModal, setShowModal] = useState(modalState);

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Write a review</button>
            {showModal && (
                <Modal onClose={closeModal}>
                    <ReviewForm />
                </Modal>
            )}
        </>
    )
}
