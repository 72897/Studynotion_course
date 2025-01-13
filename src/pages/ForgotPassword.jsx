import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getPasswordResetToken } from "../services/operations/authAPI";
import "./Spinner.css";
const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            {!emailSent ? "Reset your password" : " Check your password"}
          </h1>

          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you the instructions to reset your pasword. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-400">
                  Email Address<sup className="text-richblack-5"> *</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter you email address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full  h-16 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div>
            <Link to="/login">
              <p className="text-richblack-5 flex items-center gap-x-2 mt-3">
                Back to login
                <BiArrowBack />
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
