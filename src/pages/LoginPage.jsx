import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const { signIn, isAuthenticated, errors: LoginErrors } = useAuth();
    const navigate = useNavigate();

    const errorMsg = LoginErrors.error ? "Email o contraseña incorrectos": "";

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/cases");
        }
    }, [isAuthenticated])

    const onSubmit = async (data) => {
        signIn(data);
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 bg-white p-8 rounded-lg">
                <div className="text-center">
                    <Logo size="medium"></Logo>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Iniciar Sesion</h3>
                        <p className="">No tienes una cuenta? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Creala</Link></p>
                    </div>
                </div>
                
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <Input label="Email" required={true} type="email"  {...register('email', { required: true })}></Input>
                    {errors.email && (<p className="text-red-500">El email no es valido</p>)}

                    <Input label="Contraseña" type="password" required={true} {...register('password', { required: true })}></Input>
                    {errors.email && (<p className="text-red-500">La contraseña no es valida, o es incorrecta </p>)}

                    <p className="text-red-600 text-center">
                    {errorMsg}
                    </p>
                    
                    <div className="w-full flex items-center justify-center">
                        <Button text="Iniciar Sesion"></Button>
                    </div>

                    <div className="text-center">
                        <Link to="/recovery-password" className="hover:text-indigo-600">Olvidaste tu contraseña?</Link>
                    </div>
                </form>
            </div>
        </main>);
}

export default LoginPage;
