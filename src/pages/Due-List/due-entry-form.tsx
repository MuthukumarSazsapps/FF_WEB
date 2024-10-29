import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { DueEntryFormSchema, DueEntryFormFieldTypes, renderProbs } from 'utils/types';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useDue from 'hooks/use-due';
import { ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function DueEntryForm({ LoanId }: { LoanId: string }) {
  const { handleSubmit, dueEntryState } = useDue({ edit: true });
  const { getLoading, updateLoading, currentDue, getDue } = useDue();
  const { openDrawer, closeDrawer } = useDrawer();
  const { ledgerOpt } = useSelectBoxOptions({ PageName: 'DueEntryForm' });

  useEffect(() => {
    if (LoanId) {
      getDue(LoanId);
    }
  }, []);
  useEffect(() => {
    if (dueEntryState?.includes('Successfully')) {
      ToastSuccessMessage(dueEntryState);
      closeDrawer();
      getDue(LoanId);
    }
  }, [dueEntryState]);

  const onSubmit: SubmitHandler<DueEntryFormFieldTypes> = obj => {
    handleSubmit(LoanId, obj);
  };

  if (getLoading) {
    return <CenterSpinner />;
  }

  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<DueEntryFormFieldTypes>
          validationSchema={DueEntryFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: {
              ...currentDue,
              PaymentMethod: '',
              PaidLateFees: currentDue.LateFees,
              EmiDate: new Date(currentDue.EmiDate).toLocaleDateString('en-GB'),
              PaidAmount: currentDue.BalanceAmount,
              Remarks: 'Payment Success',
            },
          }}>
          {({
            register,
            control,
            setValue,
            getValues,
            trigger,
            formState: { errors, isValid },
          }) => {
            useEffect(() => {
              setValue('TotalLateFees', currentDue.TotalLateFees);
            }, [currentDue]);

            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup
                    className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
                    childrenclass="grid-cols-2 @2xl:grid-cols-3">
                    <Input<DueEntryFormFieldTypes>
                      label="Due No"
                      disabled
                      className="col-span-1"
                      name="Installment"
                      register={register}
                      placeholder="Installment"
                      error={errors.Installment?.message}
                    />
                    <Input
                      label="EmiDate"
                      name="EmiDate"
                      disabled
                      register={register}
                      placeholder="EmiDate"
                      error={errors.EmiDate?.message}
                    />
                    <Input
                      type="number"
                      disabled
                      label="EmiAmount"
                      placeholder="EmiAmount"
                      name="EmiAmount"
                      register={register}
                      error={errors.EmiAmount?.message}
                    />
                    <Input
                      label="BalanceAmount"
                      name="BalanceAmount"
                      disabled
                      register={register}
                      placeholder="BalanceAmount"
                      error={errors.BalanceAmount?.message}
                    />
                    <Input
                      label="Paid EmiAmount"
                      name="PaidAmount"
                      type="text"
                      inputClassName="border-blue-700"
                      className="col-span-2"
                      numberonly={true}
                      maxLength={10}
                      helperText={`Outstanding DueAmount = ${currentDue.TotalPending || '0'}`}
                      register={register}
                      placeholder="Enter Amount"
                      error={errors.PaidAmount?.message}
                    />
                    <Input
                      label="LateFees"
                      disabled
                      name="LateFees"
                      helperText={`LateDays = ${currentDue.LateDays || '0'}`}
                      register={register}
                      placeholder="LateFees"
                      error={errors.LateFees?.message}
                    />
                    <Input
                      label="Paid LateFees"
                      name="PaidLateFees"
                      type="text"
                      numberonly={true}
                      maxLength={6}
                      helperText={`Outstanding TotalLateFees = ${getValues().TotalLateFees || '0'}`}
                      register={register}
                      placeholder="PaidLateFees"
                      error={errors.PaidLateFees?.message}
                    />
                    <Controller
                      control={control}
                      name="PaymentMethod"
                      render={({ field: { onChange } }) => (
                        <SazsSelect
                          label="Payment Through"
                          options={ledgerOpt}
                          menuPlacement="top"
                          divclass="col-span-2"
                          onChange={value => {
                            setValue('PaymentMethod', value.value);
                            if (errors.PaymentMethod) {
                              trigger();
                            }
                          }}
                          placeholder="Select Payment Through"
                          errors={errors.PaymentMethod?.message}
                        />
                      )}
                    />
                    <Input
                      label="Remarks"
                      name="Remarks"
                      className="col-span-2"
                      register={register}
                      placeholder="Remarks"
                      error={errors.Remarks?.message}
                    />
                  </FormGroup>
                </div>
                <FormFooter handleAltBtn={closeDrawer} altBtnText="Cancel" submitBtnText={'Save'} />
              </>
            );
          }}
        </Form>
      </div>
      {updateLoading && <CenterSpinner />}
    </SimpleBar>
  );
}
