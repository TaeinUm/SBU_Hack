import React from "react";
import MovingComponent from "react-moving-text";
import Lottie from "lottie-react";
import LandingFootprint from "../../assets/Lottie/LandingFootprint.json";
const IntroPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={LandingFootprint}
        style={{ position: "fixed", opacity: 0.5 }}
      />
      <MovingComponent
        type="fadeInFromBottom"
        duration="1500ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
      >
        <div
          style={{
            fontSize: "5rem",
            fontWeight: 200,
            color: "var(--trunk-color)",
          }}
        >
          BitePrint
        </div>
      </MovingComponent>
    </div>
  );
};

export default IntroPage;
