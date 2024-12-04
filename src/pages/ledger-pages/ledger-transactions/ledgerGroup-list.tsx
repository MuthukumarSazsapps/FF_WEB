import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useLedger from 'hooks/use-ledger';
import useLedgerGroup from 'hooks/use-ledgerGroup';
import DrawerButton from 'common/drawer-button';
import LedgerForm from './ledger-form';
import LedgerGroupForm from './ledgerGroup-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './ledgerTransaction-table-columns';

export const metadata = {
  ...metaObject('City Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'Ledger Transactions',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Ledger',
    },
    {
      name: 'Transactions',
    },
  ],
};

export default function LedgerTransactionPage() {
  const { allLedger, listLedgerLoading } = useLedger({ list: true });
  const { allLedgerGroup, listLoading } = useLedgerGroup({ list: true });

  if (listLoading || listLedgerLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="pdfd">
        <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></TableLayout>
        {allLedger.length > 0 ? (
          <CommonTable
            getColumns={getColumns}
            scrollx={1500}
            options={options}
            fileName="Ledger_List"
            header="Type,LedgerId,LedgerName,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn,IsActive"
            data={allLedger[1]}
          />
        ) : (
          <WelcomePage />
        )}
      </div>
    </>
  );
}
