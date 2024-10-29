import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
// import { CityFormDefaultValues, CityFormFieldTypes, CityFormSchema } from 'utils/types';

import {
  PendingRemarksFormDefaultValues,
  PendingRemarksFormFieldTypes,
  PendingremarksFormSchema,
} from 'utils/types';
import useCityState from 'hooks/use-city';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Text } from 'rizzui';
import usePendingListState from 'hooks/use-report';

export default function PendingForm({ data }: { data?: any }) {
  const { handleUpdate } = usePendingListState({ update: true });
  const { loading, updateLoading } = usePendingListState();
  const { updatePendingRemarks } = usePendingListState();
  const { closeDrawer } = useDrawer();

  useEffect(() => {
    if (updatePendingRemarks === 'Pending Remarks updated successfully') {
      toast.success(
        <Text as="b" className="font-semibold">
          PendingRemarks Updated Succesfully
        </Text>,
        { duration: 3000 },
      );
      closeDrawer();
    }
  }, [updatePendingRemarks]);

  const onSubmit: SubmitHandler<PendingRemarksFormFieldTypes> = obj => {
    if (data) {
      const updateData = { ...data, obj };
      handleUpdate(updateData);
    }
  };
  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<PendingRemarksFormFieldTypes>
          validationSchema={PendingremarksFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                }
              : PendingRemarksFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input<PendingRemarksFormFieldTypes>
                      label="Remarks"
                      register={register}
                      requiredfield="true"
                      placeholder="Enter your Comments"
                      name="Remarks"
                      error={errors.Remarks?.message}
                    />
                  </FormGroup>
                </div>
                <FormFooter
                  handleAltBtn={closeDrawer}
                  altBtnText="Cancel"
                  submitBtnText={data ? 'Update' : 'Submit'}
                />
              </>
            );
          }}
        </Form>
      </div>
      {updateLoading && <CenterSpinner />}
    </SimpleBar>
  );
}
