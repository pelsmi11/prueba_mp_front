import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { changePasswordRequest } from "../api/auth";

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenParam = queryParams.get('token');
        if (!tokenParam) {
            setErrorMsg('Token no válido');
        }
    }, [location.search]);

    const onSubmit = async (data) => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (data.password !== data.confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden');
            return;
        }

        try {
            await changePasswordRequest({ token: token, newPassword: data.password });
            setSuccessMsg('Contraseña cambiada exitosamente. Redirigiendo...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (e) {
            console.log(e);
            setErrorMsg('Hubo un error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
        }
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 bg-white p-8 rounded-lg">
                <div className="text-center">
                    <Logo size="medium"></Logo>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Cambiar Contraseña</h3>
                        <p className="">Ingresa tu nueva contraseña a continuación:</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <Input label="Nueva Contraseña" type="password" required={true} {...register('password', { required: true })} />
                    {errors.password && <p className="text-red-500">La contraseña es obligatoria</p>}

                    <Input label="Confirmar Contraseña" type="password" required={true} {...register('confirmPassword', { required: true })} />
                    {errors.confirmPassword && <p className="text-red-500">Debes confirmar tu contraseña</p>}
                    {errors.confirmPassword && <p className="text-red-500">Debes confirmar tu contraseña</p>}

                    <p className="text-red-600 text-center">
                        {errorMsg}
                    </p>
                    <p className="text-green-600 text-center">
                        {successMsg}
                    </p>

                    <div className="w-full flex items-center justify-center">
                        <Button text="Cambiar Contraseña"></Button>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/login" className="hover:text-indigo-600">Regresar al inicio de sesión</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ChangePassword;