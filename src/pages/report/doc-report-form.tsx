import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import {
  LoanFormDefaultValues,
  LoanFormSchema,
  LoanFormFieldTypes,
  DocsFormFieldTypes,
  DocsFormSchema,
} from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect, useState } from 'react';
import { Checkbox, Title, Tooltip } from 'rizzui';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useLoans from 'hooks/use-loan';
import useCustomers from 'hooks/use-customer';
import { actions, dispatch } from 'store';
import UploadZone from 'common/fileupload/upload-zone';
import { ToastSuccessMessage } from 'common/table & form/toastMessage';
import usePendingListState from 'hooks/use-report';

export type renderProbs = (
  control: any,
  getValues: any,
  errors: any,
  register: any,
  setValue: any,
  trigger?: any,
) => JSX.Element;

export default function DocsUpdateForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, docUpdateLoanding, updatePendingDocs } = usePendingListState();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const { getReport, loanInfo, activeLoanList } = useSelectBoxOptions({
    PageName: 'CustomerStatement',
  });
  const { openDrawer, closeDrawer } = useDrawer();
  useEffect(() => {
    setSelectedCustomer('');
    if (data) {
      setSelectedCustomer(data.LoanId);
      setLoading(true);
      getReport(data.LoanId);
    }
  }, [data]);
  useEffect(() => {
    if (loanInfo.LoanId) {
      setLoading(false);
    }
  }, [loanInfo]);
  useEffect(() => {
    if (updatePendingDocs?.includes('Successfully')) {
      ToastSuccessMessage(updatePendingDocs);
      closeDrawer();
    }
  }, [updatePendingDocs]);

  const onSubmit: SubmitHandler<DocsFormFieldTypes> = obj => {
    handleSubmit(obj);
  };

  const renderAccountInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
        <Controller
          control={control}
          name="Insurance"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="Insurance ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('Insurance', !getValues().Insurance);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="OriginalRC"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="OriginalRC ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('OriginalRC', !getValues().OriginalRC);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="DuplicateKey"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="DuplicateKey ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('DuplicateKey', !getValues().DuplicateKey);
                }}
              />
            </div>
          )}
        />
      </FormGroup>
    );
  };

  return (
    <SimpleBar className={data ? 'h-[calc(93%)]' : 'h-full'}>
      <div className="px-5">
        <Form<DocsFormFieldTypes>
          validationSchema={DocsFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: {
              LoanId: '',
              OriginalRC: false,
              Insurance: false,
              DuplicateKey: false,
            },
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            useEffect(() => {
              if (data) {
                setValue('LoanId', data.LoanId);
              }
            }, [data]);
            useEffect(() => {
              setValue('OriginalRC', loanInfo.OriginalRC);
              setValue('Insurance', loanInfo.Insurance);
              setValue('DuplicateKey', loanInfo.DuplicateKey);
            }, [loanInfo]);
            return (
              <>
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 pt-5 @3xl:pt-2">
                    <Controller
                      control={control}
                      name="LoanId"
                      render={({ field: { onChange } }) => (
                        <SazsSelect
                          divclass="col-span-5"
                          label="Select Customer"
                          value={activeLoanList.find(value => value.value === getValues()?.LoanId)}
                          isDisabled={data ? true : false}
                          onChange={value => {
                            setValue('LoanId', value.value);
                            setSelectedCustomer(value.value);
                            setLoading(true);
                            getReport(value.value);
                          }}
                          options={activeLoanList}
                          placeholder="Select Customer"
                          errors={errors.LoanId?.message}
                        />
                      )}
                    />
                  </FormGroup>

                  {renderAccountInfo(control, getValues, errors, register, setValue)}
                </div>
                <FormFooter
                  handleAltBtn={() => closeDrawer()}
                  altBtnText={'Cancel'}
                  submitBtnText={'Save'}
                />
              </>
            );
          }}
        </Form>
        {(loading || docUpdateLoanding) && <CenterSpinner />}
      </div>
    </SimpleBar>
  );
}
