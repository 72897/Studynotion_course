import React from "react";
import { useSelector } from "react-redux";
import Iconbtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("bought thses courses:", courses);

    //payment gateway baad mai krunga
  };

  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>

      <Iconbtn
        text="But Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
