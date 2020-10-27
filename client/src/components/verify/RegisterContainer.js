import React from "react";
import Register from "./Register";
import { useSpring, animated } from "react-spring";

const RegisterContainer = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 250 },
  });

  return (
    <animated.div style={props} className="verify-form">
      <Register />
    </animated.div>
  );
};

export default RegisterContainer;
