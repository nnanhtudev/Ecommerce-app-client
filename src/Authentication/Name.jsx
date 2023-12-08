import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { useDispatch } from "react-redux";
import { deleteSession } from "../Redux/Action/ActionSession";
import { toast } from "react-toastify";
function Name(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPI.getAccount();
        if (response && response.EC === 0) {
          setName(response.DT);
        }
      } catch (error) {
        localStorage.clear();
        const action = deleteSession("");
        dispatch(action);
        toast.error("Login session expired");
      }
    };
    fetchData();
  }, []);

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: "pointer" }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {name.fullName}
      </a>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        {/* <Link
					className='dropdown-item border-0 transition-link'
					to={'/manage'}>
					Manage
				</Link> */}
        <Link className="dropdown-item border-0 transition-link" to={"/history"}>
          History
        </Link>
      </div>
    </li>
  );
}

export default Name;
