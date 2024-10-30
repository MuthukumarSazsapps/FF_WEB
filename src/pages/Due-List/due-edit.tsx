import { Controller } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import { DueEntryFormSchema, DueEntryFormFieldTypes } from 'utils/types';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect, useState } from 'react';
import { Text } from 'rizzui';
import toast from 'react-hot-toast';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import Input from 'common/input';
import useDue from 'hooks/use-due';
import Button from 'common/button';
import { Modal } from 'rizzui';

export type renderProbs = (
  control: any,
  getValues: any,
  errors: any,
  register: any,
  setValue?: any,
) => JSX.Element;

export default function DueEdit({ data }: any) {
  const { dueDeleteState, updateLoading, currentDue, deleteLoading, deleteDue } = useDue();
  const { openDrawer, closeDrawer } = useDrawer();
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    if (dueDeleteState === 'Due Deleted Successfully') {
      toast.success(
        <Text as="b" className="font-semibold">
          Due Deleted Successfully
        </Text>,
        { duration: 3000 },
      );
      closeDrawer();
    }
  }, [dueDeleteState]);
  const paymentoptions = [
    {
      value: 'Cash Payment',
      label: 'Cash Payment',
    },
    {
      value: 'Online Payment',
      label: 'Online Payment',
    },
  ];
  const renderDueInfo: renderProbs = (control, getValues, errors, register) => {
    return (
      <FormGroup
        className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
        childrenclass="grid-cols-2 @2xl:grid-cols-3">
        <Input<DueEntryFormFieldTypes>
          label="Due No"
          disabled
          className="col-span-1"
          name="Installment"
          requiredfield="true"
          register={register}
          placeholder="Installment"
          error={errors.Installment?.message}
        />
        <Input
          label="EmiDate"
          name="EmiDate"
          disabled
          requiredfield="true"
          register={register}
          placeholder="EmiDate"
          error={errors.EmiDate?.message}
        />
        <Input
          type="number"
          disabled
          label="EmiAmount"
          requiredfield="true"
          placeholder="EmiAmount"
          name="EmiAmount"
          register={register}
          error={errors.EmiAmount?.message}
        />
        <Input
          label="LateDays"
          name="LateDays"
          requiredfield="true"
          register={register}
          disabled
          placeholder="LateDays"
          error={errors.LateDays?.message}
        />
        <Input
          label="LateFees"
          disabled
          name="LateFees"
          requiredfield="true"
          register={register}
          placeholder="LateFees"
          error={errors.LateFees?.message}
        />
        <Input
          label="TotalAmount"
          name="TotalAmount"
          requiredfield="true"
          disabled
          register={register}
          placeholder="TotalAmount"
          error={errors.TotalAmount?.message}
        />
        <Input
          label="BalanceAmount"
          name="BalanceAmount"
          requiredfield="true"
          disabled
          register={register}
          placeholder="BalanceAmount"
          error={errors.BalanceAmount?.message}
        />

        <Input
          label="Paying Amount"
          name="PaidAmount"
          requiredfield="true"
          type="number"
          disabled
          maxLength={5}
          helperText={`Outstanding DueAmount = ${currentDue.TotalPending || '0'}`}
          register={register}
          placeholder="Enter Amount"
          error={errors.PaidAmount?.message}
        />
      </FormGroup>
    );
  };
  const renderPaymentInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
        <Controller
          control={control}
          name="PaymentMethod"
          render={({ field: { onChange } }) => (
            <SazsSelect
              label="Payment Method"
              options={paymentoptions}
              defaultValue={paymentoptions.find(val => val.value === data.PaymentMethod)}
              isDisabled={true}
              placeholder="Select PaymentMethod"
              errors={errors.PaymentMethod?.message}
            />
          )}
        />
        <Input
          label="Remarks"
          name="Remarks"
          requiredfield="true"
          disabled
          register={register}
          placeholder="Remarks"
          error={errors.Remarks?.message}
        />
      </FormGroup>
    );
  };
  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<DueEntryFormFieldTypes>
          validationSchema={DueEntryFormSchema}
          onSubmit={() => {}}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: {
              ...data,
            },
          }}>
          {({ register, control, setValue, getValues, formState: { errors, isValid } }) => {
            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderDueInfo(control, getValues, errors, register)}
                  {renderPaymentInfo(control, getValues, errors, register, setValue)}
                </div>
                <div
                  className={
                    'sticky bottom-0 left-0 right-0 -mb-8 flex items-center gap-4 border-t justify-between bg-white py-4 dark:bg-gray-50'
                  }>
                  <Button
                    label={'Cancel'}
                    color="DEFAULT"
                    variant="outline"
                    className="w-1/4 self-start @xl:w-auto"
                    onClick={closeDrawer}
                  />
                  <Button
                    label={'Delete'}
                    color="danger"
                    className="w-1/4 self-end"
                    type="button"
                    onClick={() => setModalState(true)}
                  />
                </div>
              </>
            );
          }}
        </Form>
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <div className="m-auto flex flex-col justify-center items-center p-10 h-full">
            <h4>Are you sure you want to delete ?</h4>
            <div className="mt-6 flex gap-4">
              <Button label="Cancel" color="info" onClick={() => setModalState(false)} />
              <Button
                label="Delete"
                color="danger"
                onClick={() => {
                  deleteDue(data.LoanId, data.Installment);
                  setModalState(false);
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
      {(updateLoading || deleteLoading) && <CenterSpinner />}
    </SimpleBar>
  );
}
