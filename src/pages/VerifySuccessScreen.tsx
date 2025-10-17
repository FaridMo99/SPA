import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyUser } from "../utils/signup";
import CustomLoader from "../components/ui/CustomLoader";
import toast from "react-hot-toast";

//make it so if user exists in db but just verifed false, he can request new email
//add delete user after 24 hours logic
function VerifySuccessScreen() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["verifying user", token, userId],
    mutationFn: () => verifyUser(userId!, token!),
    onSuccess: () => {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

  useEffect(() => {
    if (!token || !userId) {
      navigate("/signup");
      return;
    }
    mutate();
  }, [token, userId, navigate, mutate]);

  return (
    <p className="text-green-400 mt-10 text-center dark:text-dark-green font-bold text-3xl">
      {isSuccess && "Verified Successfully, you will be redirected shortly..."}
      {isPending && <CustomLoader size={100} />}
      {isError && "Verification failed, you will be redirected shortly"}
    </p>
  );
}

export default VerifySuccessScreen;
