import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { LedgerFormFieldTypes, LedgerFormSchema, LedgerFormDefaultValues } from 'utils/types';
import useLedger from 'hooks/use-ledger';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { useEffect } from 'react';
import { Textarea } from 'rizzui';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function LedgerForm({ data }: { data?: any }) {
  const { handleSubmit } = useLedger({ create: true });
  const { handleDelete } = useLedger({ remove: true });
  const { handleUpdate } = useLedger({ edit: true });
  const { loading } = useLedger();
  const { openDrawer, closeDrawer } = useDrawer();
  const { updateLedger, createLedger, deleteLedger } = useLedger();
  const { ledgerGroupOpt, branchOpt, statusOpt, ledgerTypeOpt } = useSelectBoxOptions({
    PageName: 'LedgerForm',
  });

  useEffect(() => {
    if (createLedger?.includes('Successfully')) {
      ToastSuccessMessage(createLedger);
      closeDrawer();
    }
    if (createLedger?.includes('Exists')) {
      ToastErrorMessage(createLedger);
    }
    if (updateLedger?.includes('Successfully')) {
      ToastSuccessMessage(updateLedger);
      closeDrawer();
    }
    if (updateLedger?.includes('Exists')) {
      ToastErrorMessage(updateLedger);
    }
    if (deleteLedger?.includes('Successfully')) {
      ToastSuccessMessage(deleteLedger);
      closeDrawer();
    }
  }, [createLedger, updateLedger, deleteLedger]);

  const onSubmit: SubmitHandler<LedgerFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.LedgerId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<LedgerFormFieldTypes>
          validationSchema={LedgerFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  IsActive: data.IsActive ? '1' : '0',
                  BalanceAmount: data.BalanceAmount.toString(),
                }
              : LedgerFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            useEffect(() => {
              if (!data) {
                setValue('BranchId', branchOpt[0]?.value);
              }
            }, [branchOpt]);
            return (
              <>
                <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
                    <Controller
                      control={control}
                      name="LedgerGroupId"
                      render={({ field: { onChange } }) => {
                        return (
                          <SazsSelect
                            label="Ledger Group"
                            className="col-span-1"
                            options={ledgerGroupOpt}
                            placeholder="Select Ledger group"
                            defaultValue={ledgerGroupOpt.find(
                              option => option.value === data?.LedgerGroupId,
                            )}
                            onChange={value => {
                              setValue('LedgerGroupId', value.value);
                              if (errors.LedgerGroupId) {
                                trigger();
                              }
                            }}
                            errors={errors.LedgerGroupId?.message}
                            value={ledgerGroupOpt.find(
                              value => value.value === getValues()?.LedgerGroupId,
                            )}
                          />
                        );
                      }}
                    />

                    <Controller
                      control={control}
                      name="LedgerType"
                      render={({ field: { value, onChange } }) => (
                        <SelectBox
                          label="LedgerType"
                          placeholder="Select LedgerType"
                          options={ledgerTypeOpt}
                          onChange={onChange}
                          value={value}
                          getOptionValue={option => option.value}
                          displayValue={selected =>
                            ledgerTypeOpt?.find(r => r.value === selected)?.name ?? ''
                          }
                          error={errors?.LedgerType?.message as string}
                        />
                      )}
                    />
                    <Input<LedgerFormFieldTypes>
                      label="Ledger Name"
                      register={register}
                      requiredfield="true"
                      placeholder="Enter City Name"
                      name="LedgerName"
                      error={errors.LedgerName?.message}
                    />
                    <Input<LedgerFormFieldTypes>
                      label="Opening Balance"
                      register={register}
                      disabled={data ? true : false}
                      requiredfield="true"
                      placeholder="Enter Opening Balance"
                      name="BalanceAmount"
                      error={errors.BalanceAmount?.message}
                    />
                    <Controller
                      control={control}
                      name="BranchId"
                      render={({ field: { value, onChange } }) => (
                        <SelectBox
                          label="Branch"
                          placeholder="Select Branch"
                          options={branchOpt}
                          onChange={onChange}
                          value={value}
                          getOptionValue={option => option.value}
                          displayValue={selected =>
                            branchOpt?.find(r => r.value === selected)?.name ?? ''
                          }
                          error={errors?.BranchId?.message as string}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="Description"
                      render={({ field: { value, onChange } }) => (
                        <Textarea
                          label="Description"
                          textareaClassName="input-box-styles"
                          rows={3}
                          value={value}
                          labelClassName="input-label-styles"
                          onChange={onChange}
                          aria-multiline={true}
                          placeholder="Enter Description"
                          name="Description"
                          error={errors.Description?.message}
                        />
                      )}
                    />
                  </FormGroup>
                  <FormGroup
                    className="pt-1 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4"
                    childrenclass="@2xl:grid-cols-2">
                    <Controller
                      control={control}
                      name="IsActive"
                      render={({ field: { value, onChange } }) => (
                        <SelectBox
                          label="Status"
                          placeholder="Select Status"
                          options={statusOpt}
                          onChange={onChange}
                          value={value}
                          getOptionValue={option => option.value}
                          displayValue={selected =>
                            statusOpt?.find(r => r.value === selected)?.name ?? ''
                          }
                          error={errors?.IsActive?.message as string}
                        />
                      )}
                    />
                  </FormGroup>
                </div>
                <FormFooter
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={closeDrawer}
                  handleDelBtn={() => handleDelete(data.LedgerId)}
                  altBtnText="Cancel"
                  submitBtnText={data ? 'Update' : 'Create'}
                />
              </>
            );
          }}
        </Form>
      </div>
      {loading && <CenterSpinner />}
    </SimpleBar>
  );
}
