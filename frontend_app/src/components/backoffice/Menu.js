import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getUser,
  logoutUser,
  resetAuthState,
  setAuthError,
  setUser,
} from "../../features/auth/authSlice";
import { FaTh, FaUserAlt, FaRegChartBar } from "react-icons/fa";
import { TbFaceId } from "react-icons/tb";
import { resetMatchState } from "../../features/dashboard/matchSlice";
import {
  getPicture,
  getProfilePicture,
  getUserStatus,
  getUserStatusCode,
} from "../../features/dashboard/userSlice";

export const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const code = useSelector(getUserStatusCode);
  const profilePicture = useSelector(getPicture);

  const logout = () => {
    dispatch(resetAuthState());
    dispatch(resetMatchState());
    dispatch(logoutUser({ token: user.token }));
    setTimeout(() => {
      dispatch(resetAuthState());
    }, 5000);
  };

  const unauthorized = () => {
    dispatch(resetAuthState());
    dispatch(logoutUser({ token: user.token }));
    dispatch(
      setAuthError({
        login: { serverErr: "Expired or invalid token. Please log in." },
      })
    );
  };

  useEffect(() => {
    dispatch(getProfilePicture({ email: user.email, token: user.token })).then(
      (payload) => {
        if (payload.meta.requestStatus === "rejected") {
          dispatch(setUser(null));
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      }
    );
  }, [dispatch, user.email, user.token]);

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/manage-tourist",
      name: "Quản lý khách du lịch",
      icon: <FaUserAlt />,
    },
    {
      path: "/manage-employee",
      name: "Quản lý nhân viên",
      icon: <FaRegChartBar />,
    },
    {
      path: "/attendance-employee",
      name: "Chấm công nhân viên",
      icon: <TbFaceId />,
    },
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="image-container">
          {status === "rejected" && (code === 401 || code === 403) ? (
            unauthorized()
          ) : (
            <img alt="profile picture" src={profilePicture} />
          )}
        </div>
        <div className="user-container">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
        <button type="button" className="zoom-in" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};
