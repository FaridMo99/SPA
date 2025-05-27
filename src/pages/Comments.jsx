import React from "react";
import { useOutletContext } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";

function Comments() {
  const [data, isLoading] = useOutletContext();

  return (
    <section
      aria-label="Your Comments"
      className="w-full flex flex-col items-center my-10"
    >
      {isLoading ? <CustomLoader /> : <p>{data[0].comments}</p>}
    </section>
  );
}

export default Comments;
