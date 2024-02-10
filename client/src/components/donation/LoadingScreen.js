import Lottie from "lottie-react";
import Loader from "../../assets/Lottie/MapLoader.json";
import "./donationmap.css";

const LoadingScreen = () => {
  console.log("entered loading page");
  return (
    <div className="donationmap_container">
      <Lottie animationData={Loader} />
    </div>
  );
};

export default LoadingScreen;
