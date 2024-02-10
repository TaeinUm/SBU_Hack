import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import LoadingScreen from '../loading/LoadingScreen';
import Modal from '../../utils/Modal';
import BankModal from '../../utils/Modal2';


const DonationMap = () => {
    const [userLocation, setUserLocation] = useState({ lat: -34.397, lng: 150.644 });
    const [isLoading, setIsLoading] = useState(true);

    // Ref for the bottom sheet
    const bottomSheetRef = useRef(null);

    // Snap points for the bottom sheet
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // Handler to expand the bottom sheet
    const handleExpandPress = useCallback(() => {
        bottomSheetRef.current?.expand();
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
        });
    
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: location,
          radius: 10000,
          keyword: 'food banks',
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
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
                    <div id="map" style={{ height: '65vh', width: '100%', borderRadius: '10px', border: '4px solid #efeed7', boxShadow: '0 6px 10px #212121', marginTop: '-20px'}}></div>
                    <div id="ScrollViewContainer" style={{height: '30px', width: '100%', marginTop: "25px", display: "flex", justifyContent: 'space-between'}}>
                        <BankModal/>
                        <Modal/>
                    </div>
                </>
            )}
        </>
    );
};

export default DonationMap;
