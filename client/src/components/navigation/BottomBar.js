import * as React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore'; // Assuming this is for the MainPage
import FavoriteIcon from '@mui/icons-material/Favorite'; // Assuming this is for another page
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Assuming this is for DonationMap

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate(); // Use the useNavigate hook

  // Function to handle navigation
  const handleNavigate = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/"); // Navigate to MainPage
        break;
      case 1:
        navigate("/"); // Replace with your actual route
        break;
      case 2:
        navigate("/donationMap"); // Navigate to DonationMap
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => handleNavigate(newValue)}
      >
        <BottomNavigationAction label="Main" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} /> {/* Update label as needed */}
        <BottomNavigationAction label="Donation Map" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
