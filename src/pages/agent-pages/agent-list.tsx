import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import DrawerButton from 'common/drawer-button';
import AgentForm from './agent-form';
import useAgents from 'hooks/use-agent';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './agent-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
  SubscriberCity: true,
};

const pageHeader = {
  title: 'Agents List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Agents',
    },
  ],
};

export default function AgentListPage() {
  const { allAgents, listLoading } = useAgents({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton customSize="540px" title="Create New Agent">
          <AgentForm />
        </DrawerButton>
      </TableLayout>
      {allAgents.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          options={options}
          scrollx={1600}
          fileName="Agents"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allAgents}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
