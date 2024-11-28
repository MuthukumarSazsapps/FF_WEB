import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useCustomers from 'hooks/use-customer';
import Button from 'common/button';
import { useNavigate } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './customer-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
  CustomerCity: true,
};

const pageHeader = {
  title: 'Customers List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Customers',
    },
  ],
};

export default function CustomerListPage() {
  const { allCustomers, listLoading } = useCustomers({ list: true });
  const navigate = useNavigate();

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button
          label={
            <>
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create New Customer
            </>
          }
          className="dark:bg-blue-700"
          color="info"
          onClick={() => navigate('/customer/create')}
        />
      </TableLayout>
      {allCustomers.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1800}
          options={options}
          fileName="Customers List"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allCustomers}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
