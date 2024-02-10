import { createTheme } from '@mui/material/styles';
import '../App.css';

// Function to get CSS variable values
const getCssVariableValue = (variableName) => getComputedStyle(document.documentElement).getPropertyValue(variableName);

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: getCssVariableValue('--secondary-color').trim() || '#1976d2', // Fallback color if CSS variable is not found
    },
    // Add other theme customizations as needed
  },
});

export default theme;
