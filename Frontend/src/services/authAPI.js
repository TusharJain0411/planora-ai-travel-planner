import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api/auth`,
  withCredentials: true,
});

// Register
// export const registerUser = async (userData) => {
//   const res = await api.post("/register", userData);
//   return res.data;
// };

// Login
// export const loginUser = async (userData) => {
//   const res = await api.post("/login", userData);
//   return res.data;
// };

// Google Login
export const googleLogin = async (idToken) => {
  const res = await api.post("/google", { idToken });
  return res.data;
};

//update Theme
export const updateUserTheme = async (theme, token) => {
  const res = await api.put(
    "/theme",
    { theme },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};