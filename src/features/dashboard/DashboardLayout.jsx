import styled from "styled-components";
import Row from "../../ui/Row";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays, stays } = useRecentStays();

  if (isLoadingStays || isLoadingBookings) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Row>
        <div>Stats</div>
      </Row>
      <div>Today's Activity</div>
      <div>chart stay durations</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
