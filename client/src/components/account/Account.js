import React from "react";
import Container from "../Container";
import Breadcrumbs from "../Breadcrumbs";

import AccountProfile from "./AccountProfile";
import AccountPassword from "./AccountPassword";

const Account = () => {
  return (
    <Container>
      <Breadcrumbs
        show={true}
        crumbs={[
          { link: `/`, text: `Home` },
          { link: `/account`, text: "account" },
        ]}
      />
      <div className="account">
        <AccountProfile />
        <AccountPassword />
      </div>
    </Container>
  );
};

export default Account;
