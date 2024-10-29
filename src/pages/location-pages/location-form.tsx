import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import {
  LocationFormSchema,
  LocationFormDefaultValues,
  LocationFormFieldTypes,
} from 'utils/types/state.schema';
import useLocationState from 'hooks/use-LocationState';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { useEffect } from 'react';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function LocationForm({ data }: { data?: any }) {
  const { handleSubmit } = useLocationState({ create: true });
  const { handleDelete } = useLocationState({ remove: true });
  const { handleUpdate } = useLocationState({ edit: true });
  const { loading } = useLocationState();
  const { openDrawer, closeDrawer } = useDrawer();
  const { statusOpt } = useSelectBoxOptions({ PageName: 'Admin' });
  const { updateState, createState, deleteState } = useLocationState();

  useEffect(() => {
    if (createState?.includes('Successfully')) {
      ToastSuccessMessage(createState);
      closeDrawer();
    }
    if (createState?.includes('Exists')) {
      ToastErrorMessage(createState);
    }
    if (updateState?.includes('Successfully')) {
      ToastSuccessMessage(updateState);
      closeDrawer();
    }
    if (updateState?.includes('Exists')) {
      ToastErrorMessage(updateState);
    }
    if (deleteState?.includes('Successfully')) {
      ToastSuccessMessage(deleteState);
      closeDrawer();
    }
  }, [createState, updateState, deleteState]);

  const onSubmit: SubmitHandler<LocationFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.StateId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<LocationFormFieldTypes>
          validationSchema={LocationFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  IsActive: data.IsActive ? '1' : '0',
                }
              : LocationFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input<LocationFormFieldTypes>
                      label="State Name"
                      register={register}
                      requiredfield="true"
                      textonly={true}
                      placeholder="Enter Menu Name"
                      name="StateName"
                      error={errors.StateName?.message}
                    />
                    <Input
                      register={register}
                      label="State Code"
                      requiredfield="true"
                      textonly={true}
                      maxLength={2}
                      placeholder="Enter State Code"
                      name="StateCode"
                      error={errors.StateCode?.message}
                    />
                  </FormGroup>
                  <FormGroup>
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
                  handleDelBtn={() => handleDelete(data.StateId)}
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
