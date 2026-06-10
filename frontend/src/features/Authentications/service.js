import axios from "axios";
export const checkUser = async ({username , password}) =>
    await axios.post('http://localhost:4000/user/login', {
        username,
        password,
      })


