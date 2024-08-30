import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import Select from "../components/Select";
import { useAuth } from '../context/AuthContext'
import { useState } from "react";
import { useCases } from "../context/CaseContext";
import { useNavigate, useParams } from "react-router-dom";

function CaseFormPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const { createCase, getCase, updateCase } = useCases();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let titleText = "Agregar un caso";
  if(params.id){
    titleText = "Actualizar un caso";
  }


  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const caso = await getCase(params.id);
        console.log(caso);
        setValue('description', caso.description);
        setValue('state', caso.state);
      }
    }
    loadTask();
  }, [])

  let errorMsj = null;
  let res = null;

  const options = [
    { value: "terminado", label: "Terminado" },
    { value: "en proceso", label: "En Proceso" },
  ];

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const onSubmit = async (data) => {
    try {
      setServerError("");
      setSuccessMessage("");
      const dataWithFiscalId = {
        ...data,
        fiscalId: user?.fiscal_id || null // Asegúrate de que user y fiscal_id existan
      };

      if (params.id) {
        res = await updateCase(params.id, dataWithFiscalId)
      } else {
        res = await createCase(dataWithFiscalId);
      }

      if (res.status === 200) {
        if (params.id) {
          setSuccessMessage("Caso actualizado correctamente");
        } else {
          setSuccessMessage("Caso creado correctamente");
        }
        setTimeout(function () {
          setSuccessMessage("");
          navigate('/cases');
        }, 2000);

      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (
          error.response.data.message ==
          '"fiscalId" is required'
        ) {
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 bg-white rounded-lg p-8 mx-20">
          <div className="pb-12 mx-28 px-15 mt-5">
            <Title text={titleText} />
            <div className="space-y-12">
              <div className="pb-12">
                <Input
                  label="Descripción"
                  required={true}
                  type="text"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-12">
              <div className="pb-12">
                <Select
                  label="Estado"
                  options={options}
                  onChange={(e) => e.target.value}
                  placeholder="Select an option..."
                  {...register("state", { required: true })}
                ></Select>
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

export default CaseFormPage;
