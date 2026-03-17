import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created. Please verify new account from user's email address.",
      );
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { isLoading, signup };
}
