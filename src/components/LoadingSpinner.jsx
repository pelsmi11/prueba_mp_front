const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 text-lg">Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;