import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard");
      console.log("logged in", user);
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Email or Password was incorrect.");
    },
  });

  return { login, isLoading };
}
