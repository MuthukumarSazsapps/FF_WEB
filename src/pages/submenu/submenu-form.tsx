import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect } from 'react';
import { subMenuFormDefaultValues, SubMenuFormFieldTypes, SubMenuFormSchema } from 'utils/types';
import useSubMenus from 'hooks/use-submenu';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export default function SubMenuForm({ data }: { data?: any }) {
  const { handleSubmit, createSubMenuState } = useSubMenus({ create: true });
  const { handleDelete, deleteSubMenuState } = useSubMenus({ remove: true });
  const { handleUpdate, updateSubMenuState } = useSubMenus({ edit: true });
  const { loading } = useSubMenus();
  const { openDrawer, closeDrawer } = useDrawer();
  const { menuList, statusOpt } = useSelectBoxOptions({ PageName: 'Admin' });

  useEffect(() => {
    if (createSubMenuState?.includes('Successfully')) {
      ToastSuccessMessage(createSubMenuState);
      closeDrawer();
    }
    if (createSubMenuState?.includes('Exists')) {
      ToastErrorMessage(createSubMenuState);
    }
    if (updateSubMenuState?.includes('Successfully')) {
      ToastSuccessMessage(updateSubMenuState);
      closeDrawer();
    }
    if (updateSubMenuState?.includes('Exists')) {
      ToastErrorMessage(updateSubMenuState);
    }
    if (deleteSubMenuState?.includes('Successfully')) {
      ToastSuccessMessage(deleteSubMenuState);
      closeDrawer();
    }
  }, [createSubMenuState, updateSubMenuState, deleteSubMenuState]);

  const onSubmit: SubmitHandler<SubMenuFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.SubMenuId, obj);
    } else {
      handleSubmit(obj);
    }
  };
  return (
    <SimpleBar className="h-[calc(93%)]">
      <div className="px-5">
        <Form<SubMenuFormFieldTypes>
          validationSchema={SubMenuFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  SubMenuOrder: data.SubMenuOrder.toString(),
                  IsActive: data.IsActive ? '1' : '0',
                }
              : subMenuFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input<SubMenuFormFieldTypes>
                      register={register}
                      requiredfield="true"
                      label="SubMenu Name"
                      placeholder="Enter SubMenu Name"
                      name="SubMenuName"
                      error={errors.SubMenuName?.message}
                    />
                    <Input
                      register={register}
                      requiredfield="true"
                      label="Path"
                      placeholder="Enter Path"
                      name="Path"
                      error={errors.Path?.message}
                    />
                    <Input
                      register={register}
                      requiredfield="true"
                      label="Icon"
                      placeholder="Enter Icon Name"
                      name="Icon"
                      error={errors.Icon?.message}
                    />
                    <Controller
                      control={control}
                      name="MenuId"
                      render={({ field: { onChange } }) => (
                        <SazsSelect
                          label="Menu Name"
                          className="col-span-1"
                          options={menuList}
                          onChange={value => {
                            setValue('MenuId', value.value);
                            if (errors.MenuId) {
                              trigger();
                            }
                          }}
                          errors={errors.MenuId?.message}
                          defaultValue={menuList.find(option => option.value === data?.MenuId)}
                          value={menuList.find(value => value.value === getValues()?.MenuId)}
                          placeholder="Select Menu"
                        />
                      )}
                    />
                    <Input
                      register={register}
                      label="SubMenu Order"
                      requiredfield="true"
                      placeholder="Enter Order No"
                      name="SubMenuOrder"
                      numberonly={true}
                      maxLength={1}
                      error={errors.SubMenuOrder?.message}
                    />
                    <Controller
                      control={control}
                      name="IsActive"
                      render={({ field: { value, onChange } }) => (
                        <SelectBox
                          label="IsActive"
                          placeholder="Select Status"
                          options={statusOpt}
                          onChange={onChange}
                          value={value}
                          getOptionValue={option => option.value}
                          displayValue={selected =>
                            statusOpt.find(r => r.value === selected)?.name ?? ''
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
                  handleDelBtn={() => {
                    handleDelete(data.SubMenuId);
                  }}
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
