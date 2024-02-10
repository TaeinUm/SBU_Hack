import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  // Define navigation items
  const navItems = [
    { label: 'Main', icon: <RestoreIcon />, path: '/' },
    { label: 'Favorites', icon: <FavoriteIcon />, path: '/' },
    { label: 'Donation Map', icon: <LocationOnIcon />, path: '/donationMap' },
  ];

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(navItems[newValue].path);
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Box>
  );
}
