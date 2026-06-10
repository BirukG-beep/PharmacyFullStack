import { useState } from "react";
import { checkUser } from "../service"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Reducer/userSlices.js';
import {toast} from "react-toastify"
import { constructImageUrl } from "../helper/constructImageUrl";
export const userHook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const login = async ({ username, password }) => {
    try {


      setLoading(true);

      const result = await checkUser({ username, password });

      console.log(result)

      if (result.status === 200) {
        const userImage = await constructImageUrl(username);

        dispatch(setUser({
          _id: result.data.user._id,
          username: result.data.user.username,
          image: userImage,
          role: result.data.user.role,
          token: result.data.access_token,
        }));

        localStorage.setItem("token", result.data.access_token);

        navigate('/home'); // keep it simple first
      }
    } catch (error) {
      toast.error('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};