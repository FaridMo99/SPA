import React, { useState } from "react";
import {useMutation} from "@tanstack/react-query"

const buttonStyles="bg-green-300 text-white rounded-3xl p-2 w-18 mr-2 font-bold hover:bg-gray-300 hover:text-green-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:hover:text-gray-400"

function CreatePostField() {
  const [text, setText] = useState("");

  function submitHandler(e){
    e.preventDefault()
  }

  return (
    <section aria-label="Create Post" className="w-full h-1/5 bg-white">
      <form onSubmit={submitHandler} className="w-full h-full">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Tell us..."
          className="bg-white w-full h-2/3 font-bold"
        ></textarea>
        <div className="border-y-black/10 border-y-2 w-full h-1/3 -mt-1.5 flex items-center justify-end">
          <button
            disabled={text.length === 0}
            className={buttonStyles}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePostField;

//add logic for creating post