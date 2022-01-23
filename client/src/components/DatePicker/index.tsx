import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import './styles.scss';
interface Props {
  setDate: React.Dispatch<React.SetStateAction<any>>;
}

const theme = createTheme({
  components: {
    // Name of the component ⚛️
  },
});

const ResponsiveDatePicker: React.FC<Props> = ({ setDate }) => {
  const [value, setValue] = useState<number | null>(Date.now());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <div style={{ marginBottom: '0.5rem' }}>
          <MobileDatePicker
            disableFuture
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setDate(value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default ResponsiveDatePicker;
