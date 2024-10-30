import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import useSubscribers from 'hooks/use-subscribers';
import WelcomePage from 'pages/welcom-page';
import DrawerButton from 'common/drawer-button';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './log-columns';
import { useEffect, useState } from 'react';
import { DatePicker } from 'common/datepicker';
import Button from 'common/button';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import SazsSelect from 'common/table & form/sazs-select';
import useLocalData from 'hooks/use-localData';
import { actions, dispatch } from 'store';
import { useModal } from 'hooks/use-modal';
import { ActionIcon, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import ModelView from './log-view-modal';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const pageHeader = {
  title: 'Logs List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Logs',
    },
  ],
};

const options = {
  CreatedOn: true,
};

export default function LogsListPage() {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date(Date.now() + 86400000));
  const [subscriberId, setSubscriberId] = useState<any>();
  const { subs } = useSelectBoxOptions({ PageName: 'SubscriberLogs' });
  const { allLogs, logsLoading, getLogs } = useSubscribers();
  useEffect(() => {
    if (!subscriberId) {
      setSubscriberId(subs[0].value);
    }
  }, [subs]);

  useEffect(() => {
    dispatch(actions.resetLogsList());
  }, []);
  const { openModal } = useModal();

  const handleSubmit = () => {
    getLogs({ startDate, endDate, SubscriberId: subscriberId });
  };
  return (
    <>
      <div className="flex flex-row mb-5 w-full gap-2 items-end">
        <div className="basis-3/12">
          <DatePicker
            onChange={value => setStartDate(value)}
            selected={startDate}
            dateFormat={'dd/MM/yyyy'}
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            inputProps={{
              label: 'From',
            }}
          />
        </div>
        <div className="basis-3/12">
          <DatePicker
            onChange={value => setEndDate(value)}
            selected={endDate}
            dateFormat={'dd/MM/yyyy'}
            minDate={new Date(startDate)}
            // maxDate={new Date()}
            inputProps={{
              label: 'To',
            }}
          />
        </div>
        <div className="basis-3/12">
          <SazsSelect
            label="Subscriber"
            options={subs}
            onChange={value => {
              setSubscriberId(value.value);
            }}
            className=""
            placeholder="Select Subscriber"
            defaultValue={subs.find(option => option.value === subscriberId)}
            value={subs.find(value => value.value === subscriberId)}
          />
        </div>

        <div className="basis-1/12">
          <Button className="basis-1/5" type="submit" onClick={handleSubmit} label="Submit" />
        </div>
      </div>
      {logsLoading && <Spinner />}
      {!logsLoading && allLogs.length > 0 && (
        <CommonTable
          getColumns={getColumns}
          options={options}
          onRowClick={(row: any) =>
            openModal({ view: <ModelView data={row} />, customSize: '700px' })
          }
          scrollx={2000}
          fileName="Logs_List"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allLogs}
        />
      )}
    </>
  );
}
