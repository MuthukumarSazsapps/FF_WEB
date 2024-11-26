import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import usePendingListState from 'hooks/use-report';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './pendingCapital-table-column';
import { useState, useEffect } from 'react';

export const metadata = {
  ...metaObject('Pending Report Table'),
};

const options = {
  DueDate: false,
  IsActive: false,
};

const pageHeader = {
  title: 'Pending Report',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Pending',
    },
  ],
};

type PendingCapitalItem = {
  PendingCapital?: number; // Ensure PendingCapital is optional
  [key: string]: any; // Allow other properties to exist
};
export default function PendingCapitalListPage() {
  const { allPendingCapitalList, loading } = usePendingListState({ pendingCapitalList: true });
  const [pendingCapitalAmount, setPendingCapitalAmount] = useState<number>(0);

  useEffect(() => {
    if (Array.isArray(allPendingCapitalList) && allPendingCapitalList.length > 0) {
      const total = allPendingCapitalList.reduce((sum: number, item: PendingCapitalItem) => {
        return sum + (item.PendingCapital || 0);
      }, 0);
      setPendingCapitalAmount(total);
    }
  }, [allPendingCapitalList]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {allPendingCapitalList.length > 0 ? (
        <>
          <div>
            <CommonTable
              getColumns={getColumns}
              scrollx={1500}
              options={options}
              fileName="Pending List"
              header="CUSTOMERID,CUSTOMER NAME
            ,DueDate
            ,DUE AMOUNT
            ,PENDING DUE
            ,DUE.NO,TENURE,LOANTYPE,REGISTER NO,VEHICLENAME,CONTACT,REMARKS,ISACTIVE
            "
              data={allPendingCapitalList}
            />
          </div>
          <div className="flex justify-end items-center mt-4">
            <span className="mr-4 text-lg font-semibold mt-3">Total Pending Amount :</span>
            <span className="p-2 bg-green-500 text-white text-4xl mt-5 rounded-lg">
              ₹ {pendingCapitalAmount}
            </span>
          </div>
        </>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
