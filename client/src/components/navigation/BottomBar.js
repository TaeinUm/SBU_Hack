import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// export default function BottomBar() {
//   const [value, setValue] = React.useState(0);
//   const navigate = useNavigate();

//   // Define navigation items
//   const navItems = [
//     { label: 'Main', icon: <RestoreIcon />, path: '/' },
//     { label: 'Favorites', icon: <FavoriteIcon />, path: '/' },
//     { label: 'Donation Map', icon: <LocationOnIcon />, path: '/donationMap' },
//   ];

//   return (
//     <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//           navigate(navItems[newValue].path);
//         }}
//       >
//         {navItems.map((item, index) => (
//           <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
//         ))}
//       </BottomNavigation>
//     </Box>
//   );
// }

const BottomBar = () => {
  const navigate = useNavigate();

  // Example click handler
  const handleClickHome = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleClickDonationMap = () => {
    navigate("/donationMap"); // Navigate to the donation map page
  };

  return (
    <div className="navigation-card">
      <a href="#" className="tab" onClick={handleClickHome}>
        <svg
          className="svgIcon"
          viewBox="0 0 104 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z"
            stroke="black"
            strokeWidth="7"
          ></path>
        </svg>
      </a>

      {/* Second icon */}
      <a href="#" className="tab" onClick={handleClickHome}>
        <svg
          width="104"
          height="100"
          viewBox="0 0 104 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="21.5"
            y="3.5"
            width="60"
            height="60"
            rx="30"
            stroke="black"
            strokeWidth="7"
          ></rect>
          {/* Additional paths or shapes here */}
        </svg>
      </a>

      {/* Third icon */}
      <a href="#" className="tab" onClick={handleClickDonationMap}>
        <svg
          width="101"
          height="114"
          viewBox="0 0 101 114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="46.1726"
            cy="46.1727"
            r="29.5497"
            transform="rotate(36.0692 46.1726 46.1727)"
            stroke="black"
            strokeWidth="7"
          ></circle>
          <line
            x1="61.7089"
            y1="67.7837"
            x2="97.7088"
            y2="111.784"
            stroke="black"
            strokeWidth="7"
          ></line>
        </svg>
      </a>
    </div>
  );
};

export default BottomBar;
