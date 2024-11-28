import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import Button from 'common/button';
import SazsSelect from 'common/table & form/sazs-select';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import { useEffect, useState } from 'react';
import { useDrawer } from 'hooks/use-drawer';
import DrawerHeader from 'components/settings/drawer-header';
import DueEntryForm from './due-entry-form';
import useDue from 'hooks/use-due';
import { useParams } from 'react-router-dom';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './due-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
  CityId: true,
};

const pageHeader = {
  title: 'Loans List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Loans',
    },
  ],
};

export default function CustomerReportPage() {
  const { LoanId } = useParams<{ LoanId: string }>();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const { loanList, getReport, loanInfo, customerInfo, transactions } = useSelectBoxOptions({
    PageName: 'CustomerStatement',
  });
  const { dueEntryState, dueDeleteState } = useDue();
  const { openDrawer, closeDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedCustomer('');
    if (LoanId) {
      setSelectedCustomer(LoanId);
      setLoading(true);
      getReport(LoanId);
    }
  }, [LoanId]);

  useEffect(() => {
    if (customerInfo.CustomerName) {
      setLoading(false);
    }
  }, [customerInfo]);

  useEffect(() => {
    if (dueEntryState?.includes('Successfully') || dueDeleteState?.includes('Successfully')) {
      setLoading(true);
      getReport(loanInfo.LoanId);
    }
  }, [dueEntryState, dueDeleteState]);
  return (
    <>
      {!LoanId && (
        <div>
          <SazsSelect
            options={loanList}
            onChange={val => {
              setSelectedCustomer(val.value);
              setLoading(true);
              getReport(val.value);
            }}
            placeholder="Select Customer"
          />
        </div>
      )}

      {loading && <Spinner />}
      {!loading && selectedCustomer && customerInfo.CustomerName && (
        <>
          <div className="flex items-center mb-2 gap-5 bg-slate-100 shadow-md shadow-blue-500/50 flex gap-5 border-2 border-blue-500 rounded-lg p-2 my-2">
            <div className="w-10/12">
              <div className="flex">
                <h3 className="w-1/2">{loanInfo.LoanId}</h3>
                <h3 className="w-1/2">{customerInfo.CustomerName}</h3>
              </div>
            </div>
            <div className="w-2/12">
              <Button
                label={loanInfo.RemainingDue ? '₹ PAY DUE' : 'Loan Closed'}
                className="dark:bg-blue-700 w-full"
                disabled={!loanInfo.RemainingDue}
                color="success"
                onClick={() =>
                  openDrawer({
                    view: (
                      <>
                        <DrawerHeader title={'Due Entry'} onClose={closeDrawer} />
                        <DueEntryForm LoanId={loanInfo.LoanId} />
                      </>
                    ),
                    placement: 'right',
                    customSize: '540px',
                  })
                }
              />
            </div>
          </div>
          <div className="bg-slate-100 shadow-md font-mono shadow-blue-500/50 flex gap-5 border-2 border-blue-500 rounded-lg p-2 my-2">
            <div className="flex flex-col gap-6 text-center w-2/12 justify-center">
              <img
                width={120}
                height={120}
                alt="Customer Photo"
                className="bg-white object-contain self-center overflow-hidden rounded-full"
                src={`http://localhost:5000/customer/${customerInfo.CustomerPhotoURL}`}
              />
              <h2 className="text-blue-700">{customerInfo.CustomerId}</h2>
            </div>
            <div className="flex flex-col  w-3/12 gap-2 w-1/5">
              <h3 className="self-center mb-3">Customer Details</h3>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Name</p>
                <p>{customerInfo.CustomerName}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Father Name</p>
                <p>{customerInfo.CustomerFatherName}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">PhoneNo</p>
                <p>{customerInfo.CustomerPhoneNo}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">AltPhoneNo</p>
                <p>{customerInfo.CustomerAlternatePhoneNo || 'NA'}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Aadhaar</p>
                <p className="text-blue">{customerInfo.CustomerAADHAAR}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Address</p>
                <p>{customerInfo.CustomerAddress}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">City</p>
                <p>{customerInfo.CustomerCityName}</p>
              </div>
            </div>
            <div className="flex flex-col w-3/12 gap-2 w-1/5">
              <h3 className="self-center mb-3">Guarantor Details</h3>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Name</p>
                <p>{customerInfo.GuarantorName}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">PhoneNo</p>
                <p>{customerInfo.GuarantorPhoneNo}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">City</p>
                <p>{customerInfo.GuarantorCityName || 'NA'}</p>
              </div>
              <h3 className="self-center mb-3">Agent Details</h3>
              <div className="flex gap-3">
                <p className="w-2/4 font-bold">AgentName</p>
                <p>{loanInfo.AgentName}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-2/4 font-bold">AgentCommission</p>
                <p>{loanInfo.AgentCommission}</p>
              </div>
            </div>
            {loanInfo && (
              <div className="flex flex-col w-3/12 gap-2 w-1/5">
                <h3 className="self-center mb-3">Loan Details</h3>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">VehicleName</p>
                  <p>{loanInfo.VehicleName}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">RegisterNumber</p>
                  <p className="text-blue">{loanInfo.RegisterNumber}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">LoanAmount</p>
                  <p>{loanInfo.LoanAmount}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">DocumnetCharges</p>
                  <p>{loanInfo.DocumentCharges || 'NA'}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">Loan Opening Date</p>
                  <p>{new Date(loanInfo.CreatedOn).toLocaleDateString('en-GB')}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">Interest</p>
                  <p>{`${loanInfo.Interest} %`}</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-100 shadow-md flex-col font-mono shadow-blue-500/50 flex gap-2 border-2 border-blue-500 rounded-lg p-2 px-5 my-2">
            <div className="flex gap-2 text-center text-base justify-around w-full">
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Total Due</p>
                <p>{loanInfo.Tenure}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Paid Due</p>
                <p>{loanInfo.PaidDue}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Remaining Due</p>
                <p>{loanInfo.RemainingDue}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Pending Capital</p>
                <p>{loanInfo.PendingCapital}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Pending Interest</p>
                <p>{loanInfo.PendingInterest}</p>
              </div>
            </div>
            <div className="flex gap-2 text-center text-base border-t p-2 justify-around w-full">
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Total LateDays</p>
                <p className="text-blue">{loanInfo.TotalLateDays}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Total LateFees</p>
                <p>{loanInfo.TotalLateFees}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Total LF Paid</p>
                <p>{loanInfo.PaidLateFees}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Total PaidAmount</p>
                <p>{loanInfo.TotalPaidAmount}</p>
              </div>
              <div className="flex-col basis-1/5 gap-3">
                <p className="font-bold">Total PendingAmount</p>
                <p>{loanInfo.TotalPendingAmount}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {!loading && selectedCustomer && transactions.length > 0 && (
        <CommonTable
          rowCount={24}
          getColumns={getColumns}
          scrollx={1300}
          styleRow={true}
          options={options}
          fileName="Loans"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={transactions}
        />
      )}
    </>
  );
}
