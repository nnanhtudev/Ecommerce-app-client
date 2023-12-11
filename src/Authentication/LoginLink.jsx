import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteSession } from "../Redux/Action/ActionSession";
import UserAPI from "../API/UserAPI";
import { toast } from "react-toastify";

function LoginLink(props) {
  const dispatch = useDispatch();

  const onRedirect = async () => {
    let res = await UserAPI.postLogoutUser();
    if (res && res.EC === 0) {
      toast.success(res.EM);
      localStorage.clear();

      const action = deleteSession("");
      dispatch(action);
    }
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
