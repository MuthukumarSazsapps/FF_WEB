import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { CityFormDefaultValues, CityFormFieldTypes, CityFormSchema } from 'utils/types';
import useCityState from 'hooks/use-city';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { useEffect } from 'react';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function CityForm({ data }: { data?: any }) {
  const { handleSubmit } = useCityState({ create: true });
  const { handleDelete } = useCityState({ remove: true });
  const { handleUpdate } = useCityState({ edit: true });
  const { loading } = useCityState();
  const { updateCity, createCity, deleteCity } = useCityState();
  const { openDrawer, closeDrawer } = useDrawer();
  const { stateOpt, statusOpt } = useSelectBoxOptions({ PageName: 'Admin' });

  useEffect(() => {
    if (createCity?.includes('Successfully')) {
      ToastSuccessMessage(createCity);
      closeDrawer();
    }
    if (createCity?.includes('Exists')) {
      ToastErrorMessage(createCity);
    }
    if (updateCity?.includes('Successfully')) {
      ToastSuccessMessage(updateCity);
      closeDrawer();
    }
    if (updateCity?.includes('Exists')) {
      ToastErrorMessage(updateCity);
    }
    if (deleteCity?.includes('Successfully')) {
      ToastSuccessMessage(deleteCity);
      closeDrawer();
    }
  }, [createCity, updateCity, deleteCity]);

  const onSubmit: SubmitHandler<CityFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.CityId, obj);
    } else {
      handleSubmit(obj);
    }
  };
  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<CityFormFieldTypes>
          validationSchema={CityFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  StateId: data.StateId,
                  IsActive: data.IsActive ? '1' : '0',
                }
              : CityFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input<CityFormFieldTypes>
                      label="City Name"
                      register={register}
                      requiredfield="true"
                      placeholder="Enter City Name"
                      name="CityName"
                      textonly={true}
                      error={errors.CityName?.message}
                    />
                    <Input
                      label="Pincode"
                      type="text"
                      maxLength={6}
                      numberonly={true}
                      register={register}
                      requiredfield="true"
                      placeholder="Enter Pincode"
                      name="Pincode"
                      error={errors.Pincode?.message}
                    />
                    <Controller
                      control={control}
                      name="StateId"
                      rules={{ required: 'StateId field is required' }} // Add required rule
                      render={({ field: { onChange } }) => {
                        return (
                          <SazsSelect
                            label="State Name"
                            className="col-span-1"
                            options={stateOpt}
                            placeholder="Select State"
                            defaultValue={stateOpt.find(option => option.value === data?.StateId)}
                            onChange={value => {
                              setValue('StateId', value.value);
                              if (errors.StateId) {
                                trigger();
                              }
                            }}
                            errors={errors.StateId?.message}
                            value={stateOpt.find(value => value.value === getValues()?.StateId)}
                          />
                        );
                      }}
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
                  handleDelBtn={() => handleDelete(data.CityId)}
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
