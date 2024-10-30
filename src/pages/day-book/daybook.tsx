import Button from 'common/button';
import { DatePicker } from 'common/datepicker';
import Spinner from 'common/spinner';
import useDue from 'hooks/use-due';
import { useEffect, useState } from 'react';
import { getColumns } from './daybook-columns';
import CommonTable from 'common/table & form/common-table';
import { actions, dispatch } from 'store';

const options = {
  CreatedOn: true,
  IsActive: true,
  CityId: true,
};

export default function DaybookPage() {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date(Date.now() + 86400000));
  const { getDayReportLoading, dayReportData, getDayReport } = useDue();
  const handleSubmit = () => {
    getDayReport({ startDate, endDate });
  };

  useEffect(() => {
    dispatch(actions.resetDayReportData());
  }, []);

  const TotalCapital = () => {
    // Calculate total capital
    const totalCapital = dayReportData.reduce((acc: number, val: any) => {
      return acc + (val.Capital && val.PaidIndicator === 'P' ? val.Capital : 0);
    }, 0);

    // Calculate total interest
    const totalInterest = dayReportData.reduce((acc: number, val: any) => {
      return acc + (val.Interest && val.PaidIndicator === 'P' ? val.Interest : 0);
    }, 0);

    const partialPaymentInterest = dayReportData.reduce((acc: number, val: any) => {
      return (
        acc +
        (val.PaidIndicator === 'PNP'
          ? val.PaidAmount >= val.Interest
            ? val.Interest
            : val.PaidAmount
          : 0)
      );
    }, 0);

    const partialPaymentCapital = dayReportData.reduce((acc: number, val: any) => {
      return (
        acc +
        (val.PaidIndicator === 'PNP'
          ? val.PaidAmount >= val.Interest
            ? val.PaidAmount - val.Interest
            : 0
          : 0)
      );
    }, 0);

    const totalPaidAmount = dayReportData.reduce((acc: number, val: any) => {
      return acc + (val.PaidAmount ? val.PaidAmount : 0);
    }, 0);

    const totalLateFees = dayReportData.reduce((acc: number, val: any) => {
      return acc + (val.PaidLateFees ? val.PaidLateFees : 0);
    }, 0);

    return (
      <div className="flex flex-row p-4 font-medium justify-end">
        <div className="flex flex-col basis-1/6 gap-3">
          <p className="flex justify-end">
            <span className="basis-4/5">Total Capital</span>
            <span className="text-blue basis-1/5">{totalCapital + partialPaymentCapital}</span>
          </p>
          <p className="flex justify-end">
            <span className="basis-4/5">Total Interest</span>
            <span className="text-blue basis-1/5">{totalInterest + partialPaymentInterest}</span>
          </p>
          <p className="flex justify-end">
            <span className="basis-4/5">Total Collection</span>
            <span className="text-blue basis-1/5">{totalPaidAmount}</span>
          </p>
          <p className="flex justify-end">
            <span className="basis-4/5">Total Late Fees</span>
            <span className="text-blue basis-1/5">{totalLateFees}</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row mb-5 w-full gap-2 items-end">
        <div className="basis-3/12">
          <DatePicker
            onChange={value => setStartDate(value)}
            selected={startDate}
            dateFormat={'dd/MM/yyyy'}
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            inputProps={{
              label: 'From',
            }}
          />
        </div>
        <div className="basis-3/12">
          <DatePicker
            onChange={value => setEndDate(value)}
            selected={endDate}
            dateFormat={'dd/MM/yyyy'}
            minDate={new Date(startDate)}
            // maxDate={new Date()}
            inputProps={{
              label: 'To',
            }}
          />
        </div>

        <div className="basis-1/12">
          <Button className="basis-1/5" type="submit" onClick={handleSubmit} label="Submit" />
        </div>
      </div>
      {getDayReportLoading && <Spinner />}
      {!getDayReportLoading && dayReportData.length > 0 && (
        <CommonTable
          rowCount={24}
          getColumns={getColumns}
          scrollx={1500}
          // styleRow={true}
          options={options}
          fileName="Loans"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={dayReportData}
        />
      )}
      {/* {!getDayReportLoading && dayReportData.length > 0 && TotalCapital()} */}
    </>
  );
}
