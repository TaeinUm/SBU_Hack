// // API KEY = AIzaSyC3Ln29m656hbllUAaQCcfINdvdHyZM0mM


// import React, { useEffect, useState } from 'react';

// const DonationMap = () => {
//     const [userLocation, setUserLocation] = useState({ lat: -34.397, lng: 150.644 }); // Default or user location
//     const [isLoading, setIsLoading] = useState(true); // Add a state to track loading status

//     useEffect(() => {
//         const loadMapScript = () => {
//             setIsLoading(true);

//             const script = document.createElement('script');
//             script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3Ln29m656hbllUAaQCcfINdvdHyZM0mM&callback=initMap&libraries=places`;
//             script.async = true;
//             script.defer = true;
//             document.head.appendChild(script);

//             // Define callback globally
//             window.initMap = initMap;
//         };

//         if (!window.google) {
//             loadMapScript();
//         } else {
//             initMap();
//         }

//         return () => {
//             // Cleanup
//             delete window.initMap;
//         };
//     }, []);

//     const initMap = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const pos = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude,
//                     };
//                     setUserLocation(pos);
//                     displayMap(pos);
//                 },
//                 () => {
//                     console.error("Error: The Geolocation service failed.");
//                     displayMap(userLocation); // Fallback to default location
//                 }
//             );
//         } else {
//             console.error("Error: Your browser doesn't support geolocation.");
//             displayMap(userLocation); // Fallback to default location
//         }
//     };

//     const displayMap = (location) => {
//         const map = new window.google.maps.Map(document.getElementById("map"), {
//             zoom: 15,
//             center: location,
//         });

//         // Use the PlacesService to find food banks near the user's location
        // const service = new window.google.maps.places.PlacesService(map);
        // service.nearbySearch({
        //   location: location,
        //   radius: 10000,
        //   keyword: 'food banks', // Add this line to include a keyword in your search
        // }, (results, status) => {
        //     if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        //         results.forEach((place) => {
        //             new window.google.maps.Marker({
        //                 position: place.geometry.location,
        //                 map: map,
        //                 title: place.name,
        //             });
        //         });
        //     }
        // });
//     };

//     return <div id="map" style={{ height: '100vh', width: '100%' }} />;
// };

// export default DonationMap;


import React, { useEffect, useState } from 'react';
import LoadingScreen from '../loading/LoadingScreen'; // Assuming you have this component created

const DonationMap = () => {
    const [userLocation, setUserLocation] = useState({ lat: -34.397, lng: 150.644 });
    const [isLoading, setIsLoading] = useState(true);

    // Define initMap directly on the window object to ensure it's in the global scope
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
                        displayMap(pos);
                    },
                    () => {
                        console.error("Error: The Geolocation service failed.");
                        displayMap(userLocation); // Fallback to default location
                    }
                );
            } else {
                console.error("Error: Your browser doesn't support geolocation.");
                displayMap(userLocation); // Fallback to default location
            }
        };

        const loadMapScript = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3Ln29m656hbllUAaQCcfINdvdHyZM0mM&callback=initMap&libraries=places`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            } else {
                window.initMap();
            }
        };

        loadMapScript();

        return () => {
            // Clean up the global function to avoid pollution
            delete window.initMap;
        };
    }, []);

    const displayMap = (location) => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: location,
        });

        window.google.maps.event.addListenerOnce(map, 'tilesloaded', () => {
            setIsLoading(false); // Hide loading screen once tiles are loaded
        });

        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: location,
          radius: 10000,
          keyword: 'food banks', // Add this line to include a keyword in your search
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
            {isLoading && <LoadingScreen />}
            <div id="map" style={{ height: '100vh', width: '100%' }}></div>
        </>
    );
};

export default DonationMap;

