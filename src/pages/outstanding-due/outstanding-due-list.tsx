import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import { useNavigate } from 'react-router-dom';
import useDue from 'hooks/use-due';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './outstanding-due-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'Outstanding Customer',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Outstanding Customers',
    },
  ],
};

export default function PendingDuesListPage() {
  const { pendingDues, listLoading } = useDue({ list: true });

  const navigate = useNavigate();
  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></TableLayout>
      {pendingDues && pendingDues.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          fileName="Loans"
          scrollx={1000}
          options={options}
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={pendingDues}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
