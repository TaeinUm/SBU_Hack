import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen.js";
import Modal from "../../utils/Modal.js";
import BankModal from "../../utils/Modal2.js";

import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState.ts";
import { useNavigate } from "react-router-dom";

const DonationMap = ({ defaultHeaders }) => {
  const [userLocation, setUserLocation] = useState({
    lat: -34.397,
    lng: 150.644,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [foodBanks, setFoodBanks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [items, setItems] = useState([]); //dlfma

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const userId = userData._id;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    console.log(userData);
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/products`, {
          method: "GET",
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    window.initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(pos);
            setIsLoading(false); // Update to stop loading once location is fetched
          },
          () => {
            console.error("Error: The Geolocation service failed.");
            setIsLoading(false); // Update to stop loading on error as well
          }
        );
      } else {
        console.error("Error: Your browser doesn't support geolocation.");
        setIsLoading(false); // Update to stop loading if geolocation is not supported
      }
    };

    const loadMapScript = () => {
      const existingScript = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3Ln29m656hbllUAaQCcfINdvdHyZM0mM&callback=initMap&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else if (window.google) {
        window.initMap();
      }
    };

    loadMapScript();

    return () => {
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      displayMap(userLocation);
    }
  }, [isLoading, userLocation]);

  const displayMap = (location) => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: location,
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false,
    });

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: location,
        radius: 10000,
        keyword: "food banks",
      },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setFoodBanks(results);
          results.forEach((place) => {
            new window.google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
            });
          });
        }
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div
            id="map"
            style={{
              height: "630px",
              borderRadius: "10px",
              border: "4px solid #efeed7",

              marginTop: "-20px",
            }}
          ></div>
          <div
            id="ScrollViewContainer"
            style={{
              height: "100px",
              width: "100%",
              marginTop: "25px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <BankModal props={foodBanks} />
            <Modal foods={items} />
          </div>
        </>
      )}
    </>
  );
};

//   return (
//     <>
//       {isLoading ? (
//         <LoadingScreen />
//       ) : (
//         <>
//           <div
//             id="map"
//             style={{
//               height: "65vh",
//               width: "100%",
//               borderRadius: "10px",
//               border: "4px solid #efeed7",
//               boxShadow: "0 6px 10px #212121",
//               marginTop: "-20px",
//             }}
//           ></div>
//           <div
//             id="ScrollViewContainer"
//             style={{
//               height: "30px",
//               width: "100%",
//               marginTop: "25px",
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <BankModal />
//             <Modal />
//           </div>
//         </>
//       )}
//     </>
//   );

export default DonationMap;
