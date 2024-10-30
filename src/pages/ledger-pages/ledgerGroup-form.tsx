import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import useLedgerGroup from 'hooks/use-ledgerGroup';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { useEffect } from 'react';
import { Textarea } from 'rizzui';
import {
  LedgerGroupFormFieldTypes,
  LedgerGroupFormSchema,
  LedgerGroupFormDefaultValues,
} from 'utils/types';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function LedgerGroupForm({ data }: { data?: any }) {
  const { handleSubmit } = useLedgerGroup({ create: true });
  const { handleDelete } = useLedgerGroup({ remove: true });
  const { handleUpdate } = useLedgerGroup({ edit: true });
  const { loading } = useLedgerGroup();
  const { openDrawer, closeDrawer } = useDrawer();
  const { statusOpt, branchOpt } = useSelectBoxOptions({ PageName: 'LedgerGroupForm' });
  const { updateLedgerGroup, createLedgerGroup, deleteLedgerGroup } = useLedgerGroup();

  useEffect(() => {
    if (createLedgerGroup?.includes('Successfully')) {
      ToastSuccessMessage(createLedgerGroup);
      closeDrawer();
    }
    if (createLedgerGroup?.includes('Exists')) {
      ToastErrorMessage(createLedgerGroup);
    }
    if (updateLedgerGroup?.includes('Successfully')) {
      ToastSuccessMessage(updateLedgerGroup);
      closeDrawer();
    }
    if (updateLedgerGroup?.includes('Exists')) {
      ToastErrorMessage(updateLedgerGroup);
    }
    if (deleteLedgerGroup?.includes('Successfully')) {
      ToastSuccessMessage(deleteLedgerGroup);
      closeDrawer();
    }
  }, [createLedgerGroup, updateLedgerGroup, deleteLedgerGroup]);

  const onSubmit: SubmitHandler<LedgerGroupFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.LedgerGroupId, obj);
    } else {
      handleSubmit(obj);
    }
  };
  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<LedgerGroupFormFieldTypes>
          validationSchema={LedgerGroupFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  LedgerGroupName: data.LedgerName,
                  IsActive: data.IsActive ? '1' : '0',
                }
              : LedgerGroupFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, formState: { errors } }) => {
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
                    <Input<LedgerGroupFormFieldTypes>
                      label="Ledger Group Name"
                      register={register}
                      requiredfield="true"
                      placeholder="Enter Ledger Name"
                      name="LedgerGroupName"
                      error={errors.LedgerGroupName?.message}
                    />
                  </FormGroup>
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
                  <FormGroup
                    className="pt-1 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4"
                    childrenclass="@2xl:grid-cols-2">
                    <Controller
                      control={control}
                      name="Description"
                      render={({ field: { value, onChange } }) => (
                        <Textarea
                          label="Description"
                          textareaClassName="input-box-styles"
                          rows={3}
                          labelClassName="input-label-styles"
                          onChange={onChange}
                          value={value}
                          aria-multiline={true}
                          placeholder="Enter Description"
                          name="Description"
                          error={errors.Description?.message}
                        />
                      )}
                    />
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
                  handleDelBtn={() => handleDelete(data.LedgerGroupId)}
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
