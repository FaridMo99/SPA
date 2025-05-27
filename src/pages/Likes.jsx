import React from "react";
import { useOutletContext } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

function Likes() {
  const [data, isLoading] = useOutletContext();

  return (
    <section
      aria-label="Your Likes"
      className="w-full flex flex-col items-center my-10"
    >
      {isLoading ? <CustomLoader /> : <p>{data[0].likes}</p>}
    </section>
  );
}

export default Likes;
