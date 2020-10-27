import React from "react";
import Container from "../Container";
import AccountProfile from "./AccountProfile";
import AccountPassword from "./AccountPassword";

const Account = () => {
  return (
    <Container>
      <div className="account">
        <AccountProfile />
        <AccountPassword />
      </div>
    </Container>
  );
};

export default Account;
