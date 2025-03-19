import { useState } from 'react';

interface ModalData {
    title: string;
    children?: React.ReactNode; // הוספת שדה children
    confirmText?: string;
    onConfirm?: () => void;
}

const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalData | null>(null);

    const openModal = (data: ModalData) => {
        setModalData(data);
        setIsOpen(true);
    };

    const closeModal = () => {
        setModalData(null);
        setIsOpen(false);
    };

    return { isOpen, modalData, openModal, closeModal };
};

export default useModal;
