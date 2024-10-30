import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useCityState from 'hooks/use-city';
import DrawerButton from 'common/drawer-button';
import CityForm from './city-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './city-table-columns';

export const metadata = {
  ...metaObject('City Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'City List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'City',
    },
  ],
};

export default function CityListPage() {
  const { allCities, listLoading } = useCityState({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton title="Create New City" customSize="540px">
          <CityForm />
        </DrawerButton>
      </TableLayout>
      {allCities.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1400}
          options={options}
          fileName="City_List"
          header="Id,CityId,CityName,StateId,IsActive,CreatedOn"
          data={allCities}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
