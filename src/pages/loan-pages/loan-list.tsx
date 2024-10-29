import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useLoans from 'hooks/use-loan';
import { PiPlusBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import Button from 'common/button';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './loan-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
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

const options = {
  CreatedOn: true,
  IsActive: true,
};
export default function LoanListPage() {
  const { allLoans, listLoading } = useLoans({ list: true });
  const navigate = useNavigate();

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="pdf">
        <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <Button
            label={
              <>
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Create New Loan
              </>
            }
            className="dark:bg-blue-700"
            color="info"
            onClick={() => navigate('/loan/create')}
          />
        </TableLayout>
        {allLoans.length > 0 ? (
          <CommonTable
            getColumns={getColumns}
            options={options}
            scrollx={2200}
            fileName="Loans"
            header="NO,CustomerName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
            data={allLoans}
          />
        ) : (
          <WelcomePage />
        )}
      </div>
    </>
  );
}
