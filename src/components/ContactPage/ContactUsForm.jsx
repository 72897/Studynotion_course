import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/api";
import CountryCode from "../../data/countrycode.json";
import "../../App.css";
const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: ",",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log("logging data", data);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      //   const response = { status: "OK" };
      console.log("loading response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto ">
      <form
        className="flex flex-col gap-7"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* firstName */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname" className="text-[14px] text-richblack-5">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
            />
            {errors.firstname && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your name
              </span>
            )}
          </div>
          {/* lastName */}
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="text-[14px] text-richblack-5">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              {...register("lastname")}
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
            />
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[14px] text-richblack-5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            {...register("email", { required: true })}
            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
          />
          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your email address
            </span>
          )}
        </div>

        {/* phoneNo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="text-[14px] text-richblack-5">
            Phone Number
          </label>
          <div className="flex gap-5">
            {/* dropdown */}

            <div className="flex w-[81px] flex-col gap-2">
              <select
                name="dropdown"
                id="dropdown"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code}-{element.country}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* phonenumber field */}

            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "please enter phone number",
                  },
                  maxLength: { value: 10, message: "Invalid phone number" },
                  minLength: { value: 8, message: "Invalid phone number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <spna className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </spna>
          )}
        </div>

        {/* message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-[14px] text-richblack-5">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your message
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
            ${
              !loading &&
              "transition-all duration-200 hover:scale-95 hover:shadow-none"
            }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
