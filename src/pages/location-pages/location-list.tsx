import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useLocationState from 'hooks/use-LocationState';
import DrawerButton from 'common/drawer-button';
import LocationForm from './location-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './location-table-columns';

export const metadata = {
  ...metaObject('States Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'States List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'States',
    },
  ],
};

export default function StateListPage() {
  const { allStates, listLoading } = useLocationState({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton title="Create New State" customSize="540px">
          <LocationForm />
        </DrawerButton>
      </TableLayout>
      {allStates.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1400}
          options={options}
          fileName="SubMenu_List"
          header="Id,StateName,StateCode,StateId,IsActive,CreatedOn"
          data={allStates}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
