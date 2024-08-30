import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDataRequest } from '../api/landing.js'
import Logo from "../components/Logo";

function LandingPage() {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [version, setVersion] = useState("");

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await getDataRequest();
                setName(res.data.name);
                setAuthor(res.data.author);
                setDescription(res.data.description);
                setVersion(res.data.version);
            } catch (error) {
                console.error('Error fetching cases:', error);
            }
        };

        fetchCases();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div>
                <Logo size="large" />
            </div>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
                Bienvenido a Nuestra Aplicación
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-lg">
                Descubre todas nuestras funciones y servicios. Inicia sesión para
                empezar a explorar.
            </p>
            {name && (
                <p className="text-sm text-gray-500 text-center max-w-lg">
                    <strong>Nombre:</strong> {name}
                </p>
            )}
            {author && (
                <p className="text-sm text-gray-500 text-center max-w-lg">
                    <strong>Autor:</strong> {author}
                </p>
            )}
            {description && (
                <p className="text-sm text-gray-500 text-center max-w-lg">
                    <strong>Descripción:</strong> {description}
                </p>
            )}
            {version && (
                <p className="text-sm text-gray-500 mb-8 text-center max-w-lg">
                    <strong>Versión:</strong> {version}
                </p>
            )}
            <Link
                to="/login"
                className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-300"
            >
                Loguearse
            </Link>
        </div>
    );
}

export default LandingPage;
