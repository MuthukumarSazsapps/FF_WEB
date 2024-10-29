import { Controller, SubmitHandler } from 'react-hook-form';
import { PiFileLock } from 'react-icons/pi';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { BranchFormDefaultValues, BranchFormSchema, BranchFormFieldTypes } from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useBranches from 'hooks/use-branch';
import { renderProbs } from 'utils/types';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function BranchForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createBranchState } = useBranches({ create: true });
  const { handleDelete, deleteBranchState } = useBranches({ remove: true });
  const { handleUpdate, updateBranchState } = useBranches({ edit: true });
  const { loading } = useBranches();
  const { openDrawer, closeDrawer } = useDrawer();
  const { subCityOpt, statusOpt } = useSelectBoxOptions({ PageName: 'BranchForm' });

  useEffect(() => {
    if (createBranchState?.includes('Successfully')) {
      ToastSuccessMessage(createBranchState);
      closeDrawer();
    }
    if (createBranchState?.includes('Exists')) {
      ToastErrorMessage(createBranchState);
    }
    if (updateBranchState?.includes('Successfully')) {
      ToastSuccessMessage(updateBranchState);
      closeDrawer();
    }
    if (updateBranchState?.includes('Exists')) {
      ToastErrorMessage(updateBranchState);
    }
    if (deleteBranchState?.includes('Successfully')) {
      ToastSuccessMessage(deleteBranchState);
      closeDrawer();
    }
  }, [createBranchState, deleteBranchState, updateBranchState]);

  const onSubmit: SubmitHandler<BranchFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.BranchId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  const renderPersonalInfo: renderProbs = (
    control,
    getValues,
    errors,
    register,
    setValue,
    trigger,
  ) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4">
        <Input<BranchFormFieldTypes>
          label="Branch Name"
          name="BranchName"
          requiredfield="true"
          textonly={true}
          register={register}
          placeholder="Enter Branch Name"
          error={errors.BranchName?.message}
        />
        <Input
          type="text"
          label="Mobile No"
          phoneNoInput={true}
          requiredfield="true"
          placeholder="Enter Mobile No"
          name="MobileNo"
          register={register}
          error={errors.MobileNo?.message}
          maxLength={10}
        />
        <Input
          type="text"
          register={register}
          numberonly={true}
          label="LandLine No"
          className="col-span-half"
          placeholder="Enter LandLine No"
          name="LandLineNo"
          error={errors.LandLineNo?.message}
          maxLength={11}
        />
        <Input
          name="GstNo"
          type="text"
          register={register}
          label="GST No"
          maxLength={15}
          requiredfield="true"
          className="col-span-1"
          onChange={e => {
            let formattedValue = e.target.value.toUpperCase();
            formattedValue = formattedValue.replace(/[^A-Z0-9]/g, '');
            setValue('GstNo', formattedValue);
            if (errors.GstNo) {
              trigger();
            }
          }}
          placeholder="Enter Gst No"
          error={errors.GstNo?.message}
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
      <FormGroup
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-3">
        <Input
          register={register}
          label="Addtess1"
          className="col-span-full"
          requiredfield="true"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          placeholder="Enter Address"
          name="Address1"
          error={errors.Address1?.message}
        />
        <Input
          register={register}
          label="Addtess2"
          className="col-span-full"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          placeholder="Enter Address"
          name="Address2"
          error={errors.Address2?.message}
        />
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
          label="Land Mark"
          className="col-span-1 mb-0"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          textonly={true}
          register={register}
          placeholder="Enter LandMark"
          name="LandMark"
          error={errors.LandMark?.message}
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
        <Form<BranchFormFieldTypes>
          validationSchema={BranchFormSchema}
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
              : BranchFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderPersonalInfo(control, getValues, errors, register, setValue, trigger)}
                  {renderCommunicationInfo(control, getValues, errors, register, setValue, trigger)}
                </div>
                <FormFooter
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={closeDrawer}
                  handleDelBtn={() => handleDelete(data.BranchId)}
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
