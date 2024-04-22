import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (data: any) => {
  const response = await axios.post(`${BASE_URL}/register/`, {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
    password2: data.password2,
  });

  return response.data;
};
