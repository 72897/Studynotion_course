import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slice/cartSlice";
const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div>
      {cart.map((course, index) => {
        <div>
          <div>
            <img src={course?.thumbnail} alt="" />
            <div>
              <p> {course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span>{course?.ratinfAndReviews?.length} Rating</span>
              </div>
            </div>
          </div>
        </div>;

        <div>
          <button onClick={() => dispatch(removeFromCart(course.id))}>
            <RiDeleteBin6Line />
            <span>Remove</span>
          </button>
          <p>{course?.price}</p>
        </div>;
      })}
    </div>
  );
};

export default RenderCartCourses;
