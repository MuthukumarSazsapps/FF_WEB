import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { AgentFormDefaultValues, AgentFormSchema, AgentFormFieldTypes } from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useAgents from 'hooks/use-agent';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function AgentForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createAgentState } = useAgents({ create: true });
  const { handleDelete, deleteAgentState } = useAgents({ remove: true });
  const { handleUpdate, updateAgentState } = useAgents({ edit: true });
  const { loading } = useAgents();
  const { openDrawer, closeDrawer } = useDrawer();
  const { subCityOpt, branchOpt, statusOpt } = useSelectBoxOptions({ PageName: 'AgentForm' });

  useEffect(() => {
    if (createAgentState?.includes('Successfully')) {
      ToastSuccessMessage(createAgentState);
      closeDrawer();
    }
    if (createAgentState?.includes('Exists')) {
      ToastErrorMessage(createAgentState);
    }
    if (updateAgentState?.includes('Successfully')) {
      ToastSuccessMessage(updateAgentState);
      closeDrawer();
    }
    if (updateAgentState?.includes('Exists')) {
      ToastErrorMessage(updateAgentState);
    }
    if (deleteAgentState?.includes('Successfully')) {
      ToastSuccessMessage(deleteAgentState);
      closeDrawer();
    }
  }, [createAgentState, deleteAgentState, updateAgentState]);

  const onSubmit: SubmitHandler<AgentFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.AgentId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<AgentFormFieldTypes>
          validationSchema={AgentFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: isEdit
              ? {
                  ...data,
                  IsActive: data.IsActive ? '1' : '0',
                }
              : AgentFormDefaultValues,
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
                  <FormGroup className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input<AgentFormFieldTypes>
                      label="Agent Name"
                      name="AgentName"
                      requiredfield="true"
                      textonly={true}
                      register={register}
                      placeholder="Enter Name"
                      error={errors.AgentName?.message}
                    />
                    <Input
                      type="text"
                      label="Mobile No"
                      requiredfield="true"
                      placeholder="Enter Mobile No"
                      name="AgentPhoneNumber"
                      register={register}
                      error={errors.AgentPhoneNumber?.message}
                      maxLength={10}
                      phoneNoInput={true}
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
                  handleDelBtn={() => handleDelete(data.AgentId)}
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
