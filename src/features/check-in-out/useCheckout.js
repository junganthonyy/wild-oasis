import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      // invalidates all query keys active on the page
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error(`There was an error while checking in.`);
    },
  });

  return { isCheckingOut, checkout };
}
