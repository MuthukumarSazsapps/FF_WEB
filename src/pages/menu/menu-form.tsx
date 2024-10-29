import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import { menuFormDefaultValues, MenuFormFieldTypes, MenuFormSchema } from 'utils/types';
import useMenus from 'hooks/use-menu';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function MenuForm({ data }: { data?: any }) {
  const { handleSubmit, createMenuState } = useMenus({ create: true });
  const { handleDelete, deleteMenuState } = useMenus({ remove: true });
  const { handleUpdate, updateMenuState } = useMenus({ edit: true });
  const { loading } = useMenus({});
  const { openDrawer, closeDrawer } = useDrawer();
  const { statusOpt } = useSelectBoxOptions({ PageName: 'Admin' });

  useEffect(() => {
    if (createMenuState?.includes('Successfully')) {
      ToastSuccessMessage(createMenuState);
      closeDrawer();
    }
    if (createMenuState?.includes('Exists')) {
      ToastErrorMessage(createMenuState);
    }
    if (updateMenuState?.includes('Successfully')) {
      ToastSuccessMessage(updateMenuState);
      closeDrawer();
    }
    if (updateMenuState?.includes('Exists')) {
      ToastErrorMessage(updateMenuState);
    }
    if (deleteMenuState?.includes('Successfully')) {
      ToastSuccessMessage(deleteMenuState);
      closeDrawer();
    }
  }, [createMenuState, deleteMenuState, updateMenuState]);

  const onSubmit: SubmitHandler<MenuFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.MenuId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<MenuFormFieldTypes>
          validationSchema={MenuFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  IsActive: data.IsActive ? '1' : '0',
                }
              : menuFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input<MenuFormFieldTypes>
                      register={register}
                      label="Menu Name"
                      requiredfield="true"
                      placeholder="Enter Menu Name"
                      name="MenuName"
                      error={errors.MenuName?.message}
                    />
                    <Input
                      label="Icon"
                      register={register}
                      placeholder="Enter Icon Name"
                      name="Icon"
                      requiredfield="true"
                      error={errors.Icon?.message}
                    />
                    <Input
                      register={register}
                      label="Menu Order"
                      type="text"
                      numberonly
                      maxLength={2}
                      requiredfield="true"
                      placeholder="Enter MenuOrder"
                      name="MenuOrder"
                      error={errors.MenuOrder?.message}
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
                  handleDelBtn={() => handleDelete(data.MenuId)}
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
