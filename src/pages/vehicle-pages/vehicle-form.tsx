import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { VehicleFormDefaultValues, VehicleFormSchema, VehicleFormFieldTypes } from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useVehicles from 'hooks/use-vehicle';
import { renderProbs } from 'utils/types';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function VehicleForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createVehicleState } = useVehicles({ create: true });
  const { handleDelete, deleteVehicleState } = useVehicles({ remove: true });
  const { handleUpdate, updateVehicleState } = useVehicles({ edit: true });
  const { loading } = useVehicles();
  const { openDrawer, closeDrawer } = useDrawer();
  const { branchOpt, statusOpt, vehicleOpt, wheelOpt, brandOpt } = useSelectBoxOptions({
    PageName: 'VehicleForm',
  });

  useEffect(() => {
    if (createVehicleState?.includes('Successfully')) {
      ToastSuccessMessage(createVehicleState);
      closeDrawer();
    }
    if (createVehicleState?.includes('Exists')) {
      ToastErrorMessage(createVehicleState);
    }
    if (updateVehicleState?.includes('Successfully')) {
      ToastSuccessMessage(updateVehicleState);
      closeDrawer();
    }
    if (updateVehicleState?.includes('Exists')) {
      ToastErrorMessage(updateVehicleState);
    }
    if (deleteVehicleState?.includes('Successfully')) {
      ToastSuccessMessage(deleteVehicleState);
      closeDrawer();
    }
  }, [createVehicleState, updateVehicleState, deleteVehicleState]);

  const onSubmit: SubmitHandler<VehicleFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.VehicleTypeId, obj);
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
        <Controller
          control={control}
          name="VehicleType"
          render={({ field: { onChange } }) => (
            <SazsSelect
              label="Vehicle Type"
              options={vehicleOpt}
              onChange={value => {
                setValue('VehicleType', value.value);
                if (errors.VehicleType) {
                  trigger();
                }
              }}
              placeholder="Select Vehicle Type"
              errors={errors.VehicleType?.message}
              defaultValue={vehicleOpt.find(option => option.value === data?.VehicleType)}
              value={vehicleOpt.find(value => value.value === getValues()?.VehicleType)}
            />
          )}
        />
        <Controller
          control={control}
          name="Brand"
          render={({ field: { onChange } }) => (
            <SazsSelect
              label="Brand Name"
              options={brandOpt}
              onChange={value => {
                setValue('Brand', value.value);
                if (errors.Brand) {
                  trigger();
                }
              }}
              placeholder="Select Brand Name"
              errors={errors.Brand?.message}
              defaultValue={brandOpt.find(option => option.value === data?.Brand)}
              value={brandOpt.find(value => value.value === getValues()?.Brand)}
            />
          )}
        />
        <Controller
          control={control}
          name="WheelBase"
          render={({ field: { value, onChange } }) => (
            <SelectBox
              label="WheelBase"
              placeholder="Select WheelBase"
              options={wheelOpt}
              onChange={onChange}
              value={value}
              getOptionValue={option => option.value}
              displayValue={selected => wheelOpt?.find(r => r.value === selected)?.name ?? ''}
              error={errors?.WheelBase?.message}
            />
          )}
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
        <Input
          label="Variant"
          name="Variant"
          requiredfield="true"
          register={register}
          placeholder="Enter Variant"
          error={errors.Variant?.message}
        />
        <Input<VehicleFormFieldTypes>
          label="Vehicle Name"
          name="VehicleName"
          requiredfield="true"
          register={register}
          placeholder="Enter Vehicle Full Name"
          error={errors.VehicleName?.message}
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
        <Form<VehicleFormFieldTypes>
          validationSchema={VehicleFormSchema}
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
              : VehicleFormDefaultValues,
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
                  {renderPersonalInfo(control, getValues, errors, register, setValue, trigger)}
                  {renderCommunicationInfo(control, getValues, errors, register, setValue, trigger)}
                </div>
                <FormFooter
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={closeDrawer}
                  handleDelBtn={() => handleDelete(data.VehicleTypeId)}
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
