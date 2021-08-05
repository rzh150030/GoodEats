import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

export default function ReviewFormModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button onClick={() => setShowModal(true)}>Write a review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReviewForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}
