import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login Successful");
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log("ERROR", error);
      toast.error(`${error.message}: ${error.cause.message}`);
    },
  });

  return { login, isPending };
}
