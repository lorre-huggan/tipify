import React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import './styles.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const theme = createTheme({
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#ffffff70',
          borderRadius: '8px',
        },
      },
    },
  },
});

interface Props {
  dateRange: DateRange<Date>;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
}

const BasicDateRangePicker: React.FC<Props> = ({ dateRange, setDateRange }) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  const handleReset = () => {
    setDateRange([null, null]);
  };

  return (
    <div className="date-range-picker">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <DateRangePicker
            className="range-picker"
            startText="Start Date"
            endText="End Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setDateRange(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </ThemeProvider>
      </LocalizationProvider>
      <button onClick={handleReset} className="date-range-picker-reset">
        <AiOutlineCloseCircle />
      </button>
    </div>
  );
};
export default BasicDateRangePicker;
