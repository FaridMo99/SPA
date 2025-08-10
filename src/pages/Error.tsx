import { useNavigate } from "react-router-dom";

export default function ErrorPage({ userspage = false }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark:bg-black flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          {userspage
            ? "User not found."
            : "Sorry, the page you are looking for does not exist."}
        </p>
        <div className="w-full flex justify-evenly items-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-green-300 dark:bg-dark-green mr-4 text-white rounded-lg shadow hover:bg-green-500 transition"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="mt-6 px-6 py-2 bg-green-300 dark:bg-dark-green text-white rounded-lg shadow hover:bg-green-500 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
