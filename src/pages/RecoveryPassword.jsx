import { forgtPassword } from "../api/auth";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../components/Logo";

function ProfilePage() {
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setServerError('');
            setSuccessMessage('');

            const res = await forgtPassword(data);

            if (res.status === 200) {
                setSuccessMessage('Email enviado correctamente');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setServerError(error.response.data.message || 'Error al envniar el correo');
            } else {
                setServerError('Error de red o del servidor');
            }
        }
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
            <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg max-w-sm w-full">
                <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                    <div className="text-center">
                        <Logo size="medium"></Logo>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                                Recuperar contraseña
                            </h3>
                            <p className="">
                                Ingrese su email para enviar el link de cambio de contraseña
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input label="Email" required={true} type="email" {...register('email', { required: true })} />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        {serverError && <p className="text-red-600 text-center">{serverError}</p>}
                        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                        <div className="w-full flex items-center justify-center">
                            <Button text="Enviar correo"></Button>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/login" className="hover:text-indigo-600">Regresar al inicio de sesión</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default ProfilePage
