import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import usePendingListState from 'hooks/use-report';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './pending-table-column';

export const metadata = {
  ...metaObject('City Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
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

export default function PendingListPage() {
  const { allPendingList, loading } = usePendingListState({ list: true });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></TableLayout>
      {allPendingList.length > 0 ? (
        <div>
          <CommonTable
            getColumns={getColumns}
            scrollx={1700}
            options={options}
            fileName="Pending List"
            header="CUSTOMERID,CUSTOMER NAME
            ,DUE DATE
            ,DUE AMOUNT
            ,PENDING DUE
            ,DUE.NO,TENURE,LOANTYPE,REGISTER NO,VEHICLENAME,CONTACT,REMARKS,ISACTIVE
            "
            data={allPendingList}
          />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
