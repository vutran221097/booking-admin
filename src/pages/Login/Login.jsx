import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import useInput from "../../customHook/useInput";
import Axios from "../../api/Axios";
import { logIn } from "../../reducer/authReducer";
import { toastNoti } from "../../utils/utils";
import { useEffect } from "react";

const Login = () => {
  const username = useInput("username");
  const password = useInput("password");
  const isLogged = useSelector((state) => state.auth.isLogged)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLogged) return
    navigate('/dashboard')
    // eslint-disable-next-line
  }, [])

  const onLogin = async () => {
    try {
      const res = await Axios.post('/users/login', {
        username: username.value,
        password: password.value
      })
      if (res.status === 200) {
        if (!res.data.user.isAdmin) {
          toastNoti("You dont have permission to login!", "error")
          username.reset()
          password.reset()
          return;
        }
        dispatch(logIn(res.data))
        navigate('/dashboard')
        toastNoti("Login success!", "success")
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <div className="control-group">
          <div className={`form-control ${username.error ? "invalid" : ""}`}>
            <input
              type="text"
              name="name"
              onChange={username.onChange}
              onBlur={username.onBlur}
              placeholder="Username"
              value={username.value}
            />
            {username.error && username.touched && (
              <div className="error-text">{username.error}</div>
            )}
          </div>

          <div className={`form-control ${password.error ? "invalid" : ""}`}>
            <input
              type="password"
              name="password"
              onChange={password.onChange}
              onBlur={password.onBlur}
              placeholder="Password"
              value={password.value}
            />
            {password.error && password.touched && (
              <div className="error-text">{password.error}</div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
