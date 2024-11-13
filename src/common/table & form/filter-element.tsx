'use client';

import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from 'common/table & form/date-field';
import StatusField from './status-field';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { getDateRangeStateValues } from 'utils';
import SazsSelect from 'common/table & form/sazs-select';
import useStatusOptions from 'hooks/use-select-box-options';
import Button from 'common/button';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
  options: {
    CreatedOn?: boolean;
    ModifiedOn?: boolean;
    EndDate?: boolean;
    DueDate?: boolean;
    IsActive?: boolean;
    CityId?: boolean;
    SubscriberCity?: boolean;
    CustomerCity?: boolean;
    MenuId?: boolean;
  };
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
  options,
}: FilterElementProps) {
  const { statusOpt, cityOpt } = useStatusOptions({ PageName: 'Admin' });
  const { subCityOpt } = useStatusOptions({ PageName: 'BranchForm' });

  const statusOptions = statusOpt.map((value, index) => {
    return {
      name: value.name,
      value: value.value === '1' ? 'True' : 'false',
      label: (
        <div key={index} className="flex items-center">
          <Badge color={value.name === 'TRUE' ? 'success' : 'danger'} renderAsDot />
          <Text
            className={`ms-2 font-medium ${
              value.name === 'TRUE' ? ' text-green-dark' : 'text-red-dark'
            }`}>
            {value.name === 'TRUE' ? 'Active' : 'InActive'}
          </Text>
        </div>
      ),
    };
  });

  return (
    <>
      {options.CreatedOn && (
        <DateFiled
          label="Created Date"
          selected={getDateRangeStateValues(filters['CreatedOn'][0])}
          startDate={getDateRangeStateValues(filters['CreatedOn'][0])}
          endDate={getDateRangeStateValues(filters['CreatedOn'][1])}
          onChange={(date: any) => {
            console.log('datem', date);
            updateFilter('CreatedOn', date);
          }}
          placeholderText="Select Created date"
        />
      )}
      {options.ModifiedOn && (
        <DateFiled
          label="Modified Date"
          selected={getDateRangeStateValues(filters['ModifiedOn'][0])}
          startDate={getDateRangeStateValues(filters['ModifiedOn'][0])}
          endDate={getDateRangeStateValues(filters['ModifiedOn'][1])}
          onChange={(date: any) => {
            console.log('datem', date);

            updateFilter('ModifiedOn', date);
          }}
          placeholderText="Select Modified date"
        />
      )}
      {options.DueDate && (
        <DateFiled
          label="DueDate "
          selected={getDateRangeStateValues(filters['DueDate'][0])}
          startDate={getDateRangeStateValues(filters['DueDate'][0])}
          endDate={getDateRangeStateValues(filters['DueDate'][1])}
          onChange={(date: any) => {
            console.log('datedue', date);

            updateFilter('DueDate', date);
          }}
          placeholderText="Select DueDate date"
        />
      )}

      {options.EndDate && (
        <DateFiled
          label="End Date"
          selected={getDateRangeStateValues(filters['EndDate'][0])}
          startDate={getDateRangeStateValues(filters['EndDate'][0])}
          endDate={getDateRangeStateValues(filters['EndDate'][1])}
          onChange={(date: any) => {
            updateFilter('EndDate', date);
          }}
          placeholderText="Select End date"
        />
      )}
      {options.IsActive && (
        <StatusField
          label="Status"
          options={statusOptions}
          value={filters['IsActive']}
          onChange={(value: string) => {
            updateFilter('IsActive', value);
          }}
          getOptionValue={option => option.value}
          displayValue={(selected: string) =>
            statusOptions.find(option => option.value === selected)?.label ?? selected
          }
        />
      )}
      {options.CityId && (
        <SazsSelect
          label="City Name"
          className="col-span-1"
          height="40px"
          options={cityOpt}
          onChange={value => {
            updateFilter('CityId', value.value);
          }}
          defaultValue={{ value: '', label: '' }}
          placeholder="Select City"
          value={
            subCityOpt.find(val => val.value === filters['CityId']) || {
              value: 'Select City',
              label: 'Select City',
            }
          }
        />
      )}
      {options.CustomerCity && (
        <SazsSelect
          label="City Name"
          className="col-span-1"
          id="1234456"
          height="40px"
          options={subCityOpt}
          onChange={value => {
            updateFilter('CustomerCity', value.value);
          }}
          placeholder="Select City"
          value={
            subCityOpt.find(val => val.value === filters['CustomerCity']) || {
              value: 'Select City',
              label: 'Select City',
            }
          }
        />
      )}
      {options.SubscriberCity && (
        <SazsSelect
          label="City Name"
          className="col-span-1"
          id="SubscriberCity"
          height="40px"
          options={subCityOpt}
          onChange={value => {
            updateFilter('CityId', value.value);
          }}
          placeholder="Select City"
          value={
            subCityOpt.find(val => val.value === filters['CityId']) || {
              value: 'Select City',
              label: 'Select City',
            }
          }
        />
      )}
      {isFiltered ? (
        <Button
          label={
            <>
              <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
            </>
          }
          size="sm"
          onClick={handleReset}
          className="h-7 mt-9 w-20 bg-gray-200/70"
          variant="flat"
        />
      ) : null}
    </>
  );
}
