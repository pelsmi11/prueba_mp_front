import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useProfiles } from "../context/ProfileContext";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../api/auth";

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const { createProfile, getProfile, updateProfile } = useProfiles();
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    setValue,
    formState: { errors: errorsProfile },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  if (params.id) {
    if (user.fiscal_id != params.id) {
      navigate("/*");
    }
  }

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const fiscal = await getProfile(params.id);

        setValue("name", fiscal.name);
        setValue("lastName", fiscal.last_name);
        setValue("phone", fiscal.phone);
      }
    }
    loadTask();
  }, []);

  let errorMsj = null;
  let res = null;

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");
      const dataWithUserId = {
        ...data,
        userId: user?.id || null,
      };

      if (params.id) {
        res = await updateProfile(params.id, dataWithUserId);
      } else {
        res = await createProfile(dataWithUserId);
      }

      if (res.status === 200) {
        if (params.id) {
          setSuccessMessage("Perfil actualizado correctamente");
        } else {
          setSuccessMessage("Perfil creado correctamente");
          location.reload();
        }
        setTimeout(function () {
          setSuccessMessage("");
          navigate("/cases");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message == '"fiscalId" is required') {
          setServerError("No tiene perfil de fiscal creado");
        } else {
          setServerError(
            error.response.data.message || "Error al registrar el usuario"
          );
        }
      } else {
        setServerError("Error de red o del servidor");
      }
    }
  };

  const onChangePassword = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");

      if (data.password != data.newPassword) {
        setServerError("Las contraseñas no coinciden");
        return;
      }

      const res = await updateUser(user.id, data.newPassword);

      if (res.status === 200) {
        setSuccessMessage("Contraseña cambiada correctamente");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/cases");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitProfile(onSubmit)}>
        <div className="space-y-12 bg-white rounded-lg p-8 mx-20">
          <div className="pb-12 mx-28 px-15 mt-5">
            <Title text="Administre su perfil de Fiscal" />
            <div className="space-y-12">
              <div className="pb-12">
                <Input
                  label="Nombres"
                  required={true}
                  type="text"
                  {...registerProfile("name", { required: true })}
                />
                {errorsProfile.description && (
                  <p className="text-red-500">{errorsProfile.description.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-12">
              <div className="pb-12">
                <Input
                  label="Apellidos"
                  required={true}
                  type="text"
                  {...registerProfile("lastName", { required: true })}
                />
                {errorsProfile.description && (
                  <p className="text-red-500">{errorsProfile.description.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-12">
              <div className="pb-12">
                <Input
                  label="Telefono"
                  required={true}
                  type="number"
                  {...registerProfile("phone", { required: true })}
                />
                {errorsProfile.description && (
                  <p className="text-red-500">{errorsProfile.description.message}</p>
                )}
              </div>
            </div>

            {serverError && (
              <p className="text-red-600 text-center">{serverError}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-center">{successMessage}</p>
            )}
            {errorMsj && (
              <p className="text-green-600 text-center">{errorMsj}</p>
            )}
            <div className="w-full flex justify-end items-center mt-4">
              <Button text="Guardar"></Button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmitPassword(onChangePassword)}>
        <div className="space-y-12 mt-4 bg-white rounded-lg p-8 mx-20">
          <div className="pb-12 mx-28 px-15 mt-5">
            <Title text="Cambiar contraseña" />

            <div className="space-y-12">
              <div className="pb-12">
                <Input
                  label="Nueva contraseña"
                  type="password"
                  required={true}
                  {...registerPassword("password", { required: true })}
                ></Input>
                {errorsPassword.email && (
                  <p className="text-red-500">
                    La contraseña no es valida, o es incorrecta{" "}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-12">
              <div className="pb-12">
                <Input
                  label="Repita su contraseña"
                  type="password"
                  required={true}
                  {...registerPassword("newPassword", { required: true })}
                ></Input>
                {errorsPassword.email && (
                  <p className="text-red-500">
                    La contraseña no es valida, o es incorrecta{" "}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <p className="text-red-600 text-center">{serverError}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-center">{successMessage}</p>
            )}
            {errorMsj && (
              <p className="text-green-600 text-center">{errorMsj}</p>
            )}
            <div className="w-full flex justify-end items-center mt-4">
              <Button text="Guardar"></Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
