import { compareDesc, getUnixTime } from 'date-fns';
import React from 'react';
import { UseAuth } from '../../../hooks/useAuth';
import { UserJobs, Wage } from '../../../types/job-types';
import { AuthUser } from '../../../types/user-types';
import ShiftCard from '../ShiftCard';
import { DateRange } from '@mui/lab/DateRangePicker';

type Props = {
  data: UserJobs | undefined;
  dateRange: DateRange<Date>;
};

const ShiftGrid: React.FC<Props> = ({ dateRange, data }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();

  const shifts: Wage[] = [];

  data?.UserJobs.map((wage) => {
    return wage.wages.map((w) => {
      shifts.push(w);
      return w;
    });
  });

  const sortedShifts = shifts.sort((a, b) =>
    compareDesc(Number(a.date), Number(b.date))
  );

  let mainShifts: Wage[] = [];

  const date1 = getUnixTime(dateRange[0]!);
  const date2 = getUnixTime(dateRange[1]!);

  if (date1 && date2) {
    sortedShifts.forEach((shift) => {
      if (shift.date > date1 && shift.date < date2) {
        mainShifts.push(shift);
      }
    });
  } else {
    mainShifts = sortedShifts;
  }

  if (sortedShifts.length === 0) {
    return (
      <div>
        <h1>No Shifts </h1>
      </div>
    );
  }

  return (
    <div className="dashboard-shift-grid">
      {mainShifts &&
        mainShifts.map((shift, i) => {
          return (
            <ShiftCard
              key={i}
              user={authUser}
              job={data?.UserJobs[0]!}
              data={shift}
            />
          );
        })}
    </div>
  );
};

export default ShiftGrid;
