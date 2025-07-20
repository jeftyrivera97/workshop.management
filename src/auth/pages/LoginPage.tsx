import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (
      errorMessage !== undefined &&
      errorMessage !== null &&
      errorMessage !== ""
    ) {
      try {
        Swal.fire("Error en la autenticación", errorMessage, "error");
      } catch (error) {
        console.error("Error con SweetAlert2:", error);
        // Fallback: usar alert nativo
        alert(`Error: ${errorMessage}`);
      }
    }
  }, [errorMessage]);

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-20 mb-20">
        <div className="card-body">
          <h2 className="card-title">Acceder a Sistema</h2>
          <form onSubmit={loginSubmit}>
            <div className="items-center mt-2">
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <span>ID del Host</span>
                <input
                  type="text"
                  className="grow"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                  placeholder="ID del Host"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  className="grow"
                />
              </label>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary w-full">INGRESAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
