import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import Modal from '../../utils/Modal.js';
import BankModal from '../../utils/Modal2.js';


const DonationMap = () => {
    const [userLocation, setUserLocation] = useState({ lat: -34.397, lng: 150.644 });
    const [isLoading, setIsLoading] = useState(true);
    const [foodBanks, setFoodBanks] = useState([]);

    const foods = [
          {
            index: "01",
            product: "Fruit1",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "02",
            product: "Fruit2",
            exp_date: "2024/3/23",
            is_donatable: false,
          },
          {
            index: "03",
            product: "Fruit3",
            exp_date: "2024/3/23",
            is_donatable: false,
          },
          {
            index: "04",
            product: "Fruit4",
            exp_date: "2024/3/23",
            is_donatable: false,
          },
          {
            index: "05",
            product: "Fruit5",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "06",
            product: "Fruit6",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "07",
            product: "Fruit7",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "08",
            product: "Fruit8",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "09",
            product: "Fruit9",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "10",
            product: "Fruit10",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "11",
            product: "Fruit11",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "12",
            product: "Fruit12",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "13",
            product: "Fruit12",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
          {
            index: "14",
            product: "Fruit12",
            exp_date: "2024/3/23",
            is_donatable: true,
          },
        ];

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
            const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
            if (!existingScript) {
                const script = document.createElement('script');
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
        service.nearbySearch({
          location: location,
          radius: 10000,
          keyword: 'food banks',
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                setFoodBanks(results);
                results.forEach((place) => {
                    new window.google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                    });
                });
            }
        });
    };

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div id="map" style={{ height: '90%', borderRadius: '10px', border: '4px solid #efeed7', boxShadow: '0 6px 10px #212121', marginTop: '-20px'}}></div>
                    <div id="ScrollViewContainer" style={{height: '30px', width: '100%', marginTop: "25px", display: "flex", justifyContent: 'space-between'}}>
                        <BankModal props={foodBanks}/>
                        <Modal foods={foods}/>
                    </div>
                </>
            )}
        </>
    );
};

export default DonationMap;
