import { Outlet } from "react-router-dom";
import { Container, Header, Icon, Divider } from "semantic-ui-react";

export default function App() {
  return (
    <Container textAlign="center">
      <style>
        {`
      html, body {
        background-color: #252839 !important;
        color: #fff;
      }
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
      </style>
      <Header as="h2" icon inverted textAlign="center">
        <Icon name="coffee" />
        Coffee Break
      </Header>
      <Divider />

      <Outlet />
    </Container>
  );
}
