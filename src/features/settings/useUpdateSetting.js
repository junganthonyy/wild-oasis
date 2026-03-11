import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Setting Successfully updated.");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSetting };
}
