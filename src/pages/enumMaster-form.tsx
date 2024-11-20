import React, { useEffect } from 'react';
import { ActionIcon, Modal } from 'rizzui';
import { renderProbs } from 'utils/types';
import Input from 'common/input';
import FormGroup from 'common/table & form/form-group';
import { Controller, SubmitHandler } from 'react-hook-form';
import SelectBox from 'common/select';
import { EnumMasterr } from 'utils';
import { Form } from 'common/form';
import {
  EnumMasterFormDefaultValues,
  EnumMasterFormFieldTypes,
  EnumMasterFormSchema,
} from 'utils/types';
import Button from 'common/button';
import { HiOutlineXMark } from 'react-icons/hi2';
import useEnumMaster from 'hooks/use-enumMaster';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

interface EnumMasterFormProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

const EnumMasterForm: React.FC<EnumMasterFormProps> = ({ modalState, setModalState }) => {
  const { handleSubmit, createEnumMasterState } = useEnumMaster({ create: true });
  const { loading } = useEnumMaster();
  useEffect(() => {
    if (createEnumMasterState?.includes('Successfully')) {
      ToastSuccessMessage(createEnumMasterState);
      setModalState(false);
    }
    if (createEnumMasterState?.includes('Exists')) {
      ToastErrorMessage(createEnumMasterState);
    }
  }, [createEnumMasterState]);

  const onSubmit: SubmitHandler<EnumMasterFormFieldTypes> = obj => {
    console.log(obj);

    handleSubmit(obj);
  };

  const renderEnumMasterInfo: renderProbs = (
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
          name="FlagType"
          render={({ field: { value, onChange } }) => (
            <SelectBox
              label="Type"
              placeholder="Select Type"
              options={EnumMasterr}
              onChange={onChange}
              value={value}
              getOptionValue={option => option.value}
              displayValue={selected => EnumMasterr?.find(r => r.value === selected)?.name ?? ''}
              error={errors?.BranchId?.message as string}
            />
          )}
        />

        <Input
          label="Type Name"
          name="TypeName"
          requiredfield="true"
          register={register}
          placeholder="Enter Type Name"
          error={errors.Variant?.message}
        />
      </FormGroup>
    );
  };

  return (
    <Modal isOpen={modalState} onClose={() => setModalState(false)}>
      <div className="m-auto px-7 pt-6 pb-8">
        <div className=" flex justify-end">
          <ActionIcon size="sm" variant="text" onClick={() => setModalState(false)}>
            <HiOutlineXMark className="h-auto w-6 flex justify-end" strokeWidth={1.8} />
          </ActionIcon>
        </div>
        <Form<EnumMasterFormFieldTypes>
          validationSchema={EnumMasterFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: EnumMasterFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderEnumMasterInfo(control, getValues, errors, register, setValue, trigger)}
                </div>
                <div>
                  <Button
                    label="create"
                    type="submit"
                    color="success"
                    className="flex items-center w-20"
                    isLoading={loading}
                  />
                </div>
              </>
            );
          }}
        </Form>
      </div>
    </Modal>
  );
};

export default EnumMasterForm;
