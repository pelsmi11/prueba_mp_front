import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Select from "../components/Select";
import { registerRequest } from "../api/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
    ];

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setServerError('');
            setSuccessMessage('');

            const res = await registerRequest(data);

            if (res.status === 200) {
                setSuccessMessage('Usuario creado correctamente');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                if(error.response.data.message == '"password" length must be at least 8 characters long'){
                    setServerError("La contraseña debe tener al menos 8 caracteres");
                }else{
                setServerError(error.response.data.message || 'Error al registrar el usuario');
                }
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
                                Crear cuenta
                            </h3>
                            <p className="">
                                Ya tienes una cuenta?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Loguearse
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input label="Email" required={true} type="email" {...register('email', { required: true })} />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        <Input label="Contraseña" type="password" required={true} {...register('password', { required: true })} />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        <Select
                            label="Rol"
                            options={options}
                            onChange={(e) => e.target.value}
                            placeholder="Select an option..."
                            {...register('role', { required: true })}></Select>

                        {serverError && <p className="text-red-600 text-center">{serverError}</p>}
                        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                        <div className="w-full flex items-center justify-center">
                            <Button text="Registrarse"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;
