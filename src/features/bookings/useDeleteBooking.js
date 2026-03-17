import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      toast.success(`Booking was successfully deleted.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`Unable to delete booking`);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
