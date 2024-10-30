import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { ShowRoomFormDefaultValues, ShowRoomFormSchema, ShowRoomFormFieldTypes } from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useShowRooms from 'hooks/use-showroom';
import { renderProbs } from 'utils/types';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function ShowRoomForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createShowRoomState } = useShowRooms({ create: true });
  const { handleDelete, deleteShowRoomState } = useShowRooms({ remove: true });
  const { handleUpdate, updateShowRoomState } = useShowRooms({ edit: true });
  const { loading } = useShowRooms();
  const { openDrawer, closeDrawer } = useDrawer();
  const { subCityOpt, branchOpt, statusOpt } = useSelectBoxOptions({ PageName: 'ShowRoomForm' });

  useEffect(() => {
    if (createShowRoomState?.includes('Successfully')) {
      ToastSuccessMessage(createShowRoomState);
      closeDrawer();
    }
    if (createShowRoomState?.includes('Exists')) {
      ToastErrorMessage(createShowRoomState);
    }
    if (updateShowRoomState?.includes('Successfully')) {
      ToastSuccessMessage(updateShowRoomState);
      closeDrawer();
    }
    if (updateShowRoomState?.includes('Exists')) {
      ToastErrorMessage(updateShowRoomState);
    }
    if (deleteShowRoomState?.includes('Successfully')) {
      ToastSuccessMessage(deleteShowRoomState);
      closeDrawer();
    }
  }, [createShowRoomState, updateShowRoomState, deleteShowRoomState]);

  const onSubmit: SubmitHandler<ShowRoomFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.ShowRoomId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  const renderPersonalInfo: renderProbs = (control, getValues, errors, register) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4">
        <Input<ShowRoomFormFieldTypes>
          label="ShowRoom Name"
          name="ShowRoomName"
          requiredfield="true"
          textonly={true}
          register={register}
          placeholder="Enter ShowRoom Name"
          error={errors.ShowRoomName?.message}
        />
        <Input
          type="text"
          maxLength={10}
          label="ShowRoom Mobile No"
          requiredfield="true"
          placeholder="Enter Mobile No"
          name="ShowRoomPhoneNumber"
          register={register}
          error={errors.ShowRoomPhoneNumber?.message}
          phoneNoInput={true}
        />
      </FormGroup>
    );
  };
  const renderCommunicationInfo: renderProbs = (
    control,
    getValues,
    errors,
    register,
    setValue,
    trigger,
  ) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
        <Controller
          control={control}
          name="CityId"
          render={({ field: { onChange } }) => (
            <SazsSelect
              label="City Name"
              options={subCityOpt}
              onChange={value => {
                setValue('CityId', value.value);
                if (errors.CityId) {
                  trigger();
                }
              }}
              placeholder="Select City"
              errors={errors.CityId?.message}
              defaultValue={subCityOpt.find(option => option.value === data?.CityId)}
              value={subCityOpt.find(value => value.value === getValues()?.CityId)}
            />
          )}
        />
        <Input
          type="text"
          label="Account Number"
          requiredfield="true"
          placeholder="Enter Account Number"
          name="AccountNumber"
          numberonly={true}
          register={register}
          maxLength={16}
          error={errors.AccountNumber?.message}
        />
        <Input
          label="Account Holder Name"
          name="AccountHolderName"
          requiredfield="true"
          register={register}
          placeholder="Enter Account Holder Name"
          error={errors.AccountHolderName?.message}
        />
        <Input
          label="Bank Branch Name"
          name="BranchName"
          requiredfield="true"
          register={register}
          placeholder="Enter Branch Name"
          error={errors.BranchName?.message}
        />
        <Input
          label="IFSC Code"
          name="IFSCcode"
          requiredfield="true"
          register={register}
          placeholder="Enter IFSC Code"
          error={errors.IFSCcode?.message}
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
              displayValue={selected => branchOpt?.find(r => r.value === selected)?.name ?? ''}
              error={errors?.BranchId?.message as string}
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
              displayValue={selected => statusOpt?.find(r => r.value === selected)?.name ?? ''}
              error={errors?.IsActive?.message as string}
            />
          )}
        />
      </FormGroup>
    );
  };

  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<ShowRoomFormFieldTypes>
          validationSchema={ShowRoomFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: isEdit
              ? {
                  ...data,
                  LandLineNo: data.LandLineNo || '',
                  IsActive: data.IsActive ? '1' : '0',
                }
              : ShowRoomFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            useEffect(() => {
              if (!data) {
                setValue('BranchId', branchOpt[0]?.value);
              }
            }, [branchOpt]);
            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderPersonalInfo(control, getValues, errors, register, trigger)}
                  {renderCommunicationInfo(control, getValues, errors, register, setValue, trigger)}
                </div>
                <FormFooter
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={closeDrawer}
                  handleDelBtn={() => handleDelete(data.ShowRoomId)}
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
