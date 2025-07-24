import axios from 'axios';


//const { VITE_API_URL } = getEnvVariables()

const baseURL = import.meta.env.VITE_API_URL;


const adminApi = axios.create({
    baseURL: baseURL, // Laravel API URL
    withCredentials: true, // 
});

// Interceptor de solicitud (request)
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Laravel usa 'Bearer'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Interceptor de respuesta (response)
// adminApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       // Por ejemplo, token expirado o no autorizado
//       if (error.response.status === 401) {
//         // Puedes redirigir, limpiar token, etc.
//         localStorage.removeItem('token');
//         window.location.href = '/login';
//       }

//       // Otros errores comunes de Laravel
//       if (error.response.status === 422) {
//         // Laravel valida y devuelve errores de validación en 422
//         return Promise.reject(error.response.data.errors);
//       }
//     }

//     return Promise.reject(error);
//   }
// );



export default adminApi;