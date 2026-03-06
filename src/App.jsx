import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  /* background-color: green; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">Wild Oasis </Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => console.log("dogs")}>Check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => console.log("dogs")}
              >
                Check out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Check in form</Heading>
            <form>
              <Input placeholder={5} type="number" />
              <Input placeholder={5} type="number" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
