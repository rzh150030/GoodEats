import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CommentForm from './CommentForm';

export default function CommentFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Write a review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentForm />
                </Modal>
            )}
        </>
    )
}
