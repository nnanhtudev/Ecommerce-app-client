import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { addSession, deleteSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";
import { toast } from "react-toastify";

function SignIn(props) {
  //listCart được lấy từ redux
  const listCart = useSelector((state) => state.Cart.listCart);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [user, setUser] = useState([]);

  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [checkPush, setCheckPush] = useState(false);

  const dispatch = useDispatch();
  const fetchDataAccount = async () => {
    try {
      const response = await UserAPI.getAccount();
      if (response && response.EC === 0) {
        setUser(response.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataAccount();
  }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const inValidInput = () => {
    if (!email) {
      setErrorEmail(true);
      return false;
    } else if (!password) {
      setErrorEmail(false);
      setErrorPassword(true);
      return false;
    } else if (!validateEmail(email)) {
      setEmailRegex(true);
      return false;
    }
    setErrorEmail(false);
    setErrorPassword(false);
    setEmailRegex(false);
    return true;
  };

  const onSubmit = async () => {
    if (inValidInput()) {
      let data = {
        email,
        password,
      };
      try {
        let res = await UserAPI.postSignInUser(data);
        if (res && res.EC === 0) {
          await fetchDataAccount();
          toast.success(res.EM);
          localStorage.setItem("id_user", user.id_User);
          const action = addSession(localStorage.getItem("id_user"));
          dispatch(action);
          setCheckPush(true);
        } else {
          toast.error(res.EM);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //Hàm này dùng để đưa hết tất cả carts vào API của user
  useEffect(() => {
    const fetchData = async () => {
      //Lần đầu sẽ không thực hiện insert được vì addCart = ''
      if (checkPush === true) {
        for (let i = 0; i < listCart.length; i++) {
          //Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
          const params = {
            idUser: localStorage.getItem("id_user"),
            idProduct: listCart[i].idProduct,
            count: listCart[i].count,
          };

          const query = "?" + queryString.stringify(params);

          const response = await CartAPI.postAddToCart(query);
          console.log(response);
        }

        setRedirect(true);
      }
    };

    fetchData();
  }, [checkPush]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>

          <div className="d-flex justify-content-center pb-5">
            {emailRegex && <span className="text-danger">* Incorrect Email Format</span>}
            {errorEmail && <span className="text-danger">* Please Check Your Email</span>}
            {errorPassword && <span className="text-danger">* Please Check Your Password</span>}
          </div>

          <div className="wrap-input100 validate-input">
            <input className="input100" type="text" placeholder="Email" value={email} onChange={onChangeEmail} />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {redirect && <Redirect to={`/`} />}
            <button className="login100-form-btn" onClick={onSubmit}>
              Sign in
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
