import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './doc-pendings-columns';
import usePendingListState from 'hooks/use-report';
import DrawerButton from 'common/drawer-button';
import DocsUpdateForm from './doc-report-form';

export const metadata = {
  ...metaObject('Document Pending Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'Document Pending Report',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Document Pending',
    },
  ],
};

export default function DocumentPendingListPage() {
  const { pendingDocsList, DocsListLoading, docUpdateLoanding } = usePendingListState({
    docsList: true,
  });

  if (DocsListLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton customSize="540px" title="Add New Issue">
          <DocsUpdateForm />
        </DrawerButton>
      </TableLayout>
      {pendingDocsList.length > 0 ? (
        <div>
          <CommonTable
            getColumns={getColumns}
            scrollx={1600}
            options={options}
            fileName="Documnet Pending"
            header="CUSTOMERID,CUSTOMER NAME
            ,DUE DATE
            ,DUE AMOUNT
            ,PENDING DUE
            ,DUE.NO,TENURE,LOANTYPE,REGISTER NO,VEHICLENAME,CONTACT,REMARKS,ISACTIVE"
            data={pendingDocsList}
          />
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
