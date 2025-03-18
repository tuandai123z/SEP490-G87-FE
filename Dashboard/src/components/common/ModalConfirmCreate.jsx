

const ModalConfirmCreate = ({ handleClose, handleConfirm, type }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 animate-fadeIn">
            <div className="relative z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate-slideIn">
                <button
                    className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-red-600 "
                    onClick={handleClose}
                >
                    &times;
                </button>
                <h2 className="mb-4 text-xl font-semibold">
                    Xác nhận {type}
                </h2>
                <p>Bạn đã kiểm tra thông tin kĩ càng?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2 font-semibold text-white transition-all duration-300 bg-gray-600 rounded hover:bg-gray-700"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-5 py-2 font-semibold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-800"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideIn {
                    from {
                        transform: translateY(-20%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }

                .animate-slideIn {
                    animation: slideIn 0.3s ease-in-out;
                }
            `}</style>
        </div>
    )
}

export default ModalConfirmCreate
