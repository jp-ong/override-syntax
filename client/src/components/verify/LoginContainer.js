import React from "react";
import Login from "./Login";
import { useSpring, animated } from "react-spring";

const LoginContainer = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 250 },
  });

  return (
    <animated.div style={props} className="verify-form">
      <Login />
    </animated.div>
  );
};

export default LoginContainer;
