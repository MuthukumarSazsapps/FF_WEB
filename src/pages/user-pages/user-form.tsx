import { Controller, SubmitHandler } from 'react-hook-form';
import { PiEnvelopeSimple, PiFileLock } from 'react-icons/pi';
import { Form } from 'common/form';
import { PinCode, Button } from 'rizzui';
import FormGroup from 'common/table & form/form-group';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect, useState } from 'react';
import { userFormDefaultValues, UserFormSchema, UserFormFieldTypes } from 'utils/types';
import useUsers from 'hooks/use-users';
import FormFooter from 'common/table & form/form-footer';
import { Menu } from 'utils/types';
import axiosInstance from 'store/api/axios';
import MenuSelect from './menu-select';
import useMenus from 'hooks/use-menu';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { renderProbs } from 'utils/types';
import Password from 'common/password';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

const fetchUserMenus = async (userId: string) => {
  try {
    const response = await axiosInstance.post('/menu/user-menu-list', { userId });
    const menus = response.data;
    return menus ?? [];
  } catch (error) {
    console.error('Error fetching user menus:', error);
  }
};
export default function UserForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createUserState } = useUsers({ create: true });
  const { handleDelete, deleteUserState } = useUsers({ remove: true });
  const { handleUpdate, updateUserState } = useUsers({ edit: true });
  const { loading } = useUsers();
  const [currentStep, setCurrentStep] = useState(1);
  const { loginUser } = useUsers();
  const { openDrawer, closeDrawer } = useDrawer();
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [resetOTP, setResetOTP] = useState('');
  const [menus, setMenus] = useState<Menu[]>([]);
  const { allMenus } = useMenus({ list: true });
  const { branchOpt, subCityOpt, statusOpt } = useSelectBoxOptions({ PageName: 'UserForm' });
  const branchOptions = [...branchOpt, { name: 'All Branches', value: '0' }];

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const userMenus = await fetchUserMenus(data.UserId);
        setMenus(userMenus);
      }
    };
    fetchData();
  }, [data, allMenus]);

  useEffect(() => {
    if (createUserState?.includes('Successfully')) {
      ToastSuccessMessage(createUserState);
      closeDrawer();
    }
    if (createUserState?.includes('Exists')) {
      ToastErrorMessage(createUserState);
    }
    if (updateUserState?.includes('Successfully')) {
      ToastSuccessMessage(updateUserState);
      closeDrawer();
    }
    if (updateUserState?.includes('Exists')) {
      ToastErrorMessage(updateUserState);
    }
    if (deleteUserState?.includes('Successfully')) {
      ToastSuccessMessage(deleteUserState);
      closeDrawer();
    }
  }, [createUserState, updateUserState, deleteUserState]);

  const onSubmit: SubmitHandler<UserFormFieldTypes> = obj => {
    const UserName = obj.UserName.trim() + '@' + loginUser?.UserName.split('@')[1];
    const userData = {
      ...obj,
      UserName: UserName,
    };
    if (data) {
      handleUpdate(data.UserId, userData, isPasswordResetVisible, menus);
    } else {
      handleSubmit(userData, menus);
    }
  };
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const onOTPSubmit = () => {
    if (resetOTP === '9320') {
      setShowOTPForm(false);
      setIsPasswordResetVisible(true);
    } else {
      ToastErrorMessage('Please Enter Valid OTP');
    }
  };

  const renderPasswordReset: renderProbs = (control, getValues, errors, register) => {
    if (showOTPForm && isEdit)
      return (
        <Form<{
          otp: string;
        }>
          onSubmit={onOTPSubmit}
          className="w-full">
          {({ setValue }) => (
            <>
              <h4 className="text-base font-medium pb-5">
                We have sent you One Time Password to your email. Please enter your OTP - 9320
              </h4>
              <div className="flex space-x-2 items-center">
                <PinCode
                  variant="outline"
                  setValue={value => setResetOTP(String(value))}
                  size="lg"
                />
                <div className="">
                  <Button
                    className="w-fit text-nowrap"
                    type="submit"
                    rounded="pill"
                    variant="outline">
                    Resend OTP
                  </Button>
                </div>
                <Button className="w-fit text-nowrap" onClick={onOTPSubmit} rounded="pill">
                  Verify OTP
                </Button>
              </div>
            </>
          )}
        </Form>
      );
    if (isPasswordResetVisible || !isEdit)
      return (
        <FormGroup title="Password" className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11">
          <Controller
            control={control}
            name="Password"
            render={({ field: { onChange, value } }) => (
              <Password<UserFormFieldTypes>
                name="Password"
                placeholder="Enter your password"
                helperText={
                  getValues().Password.length < 8 &&
                  'Your current password must be more than 8 characters'
                }
                onChange={onChange}
                register={register}
                error={errors.Password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="ConfirmPassword"
            render={({ field: { onChange, value } }) => (
              <Password
                name="ConfirmPassword"
                placeholder="Confirm password"
                register={register}
                onChange={onChange}
                error={errors.ConfirmPassword?.message}
              />
            )}
          />
        </FormGroup>
      );
    return (
      <Button color="info" type="submit" onClick={() => setShowOTPForm(true)} className="w-fit">
        Reset Password
      </Button>
    );
  };
  const renderPersonelInfo: renderProbs = (
    control,
    getValues,
    errors,
    register,
    setValue,
    trigger,
  ) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-2 @3xl:grid-cols-16 @3xl:pt-4">
        <Input<UserFormFieldTypes>
          register={register}
          requiredfield="true"
          label="Display Name"
          textonly={true}
          placeholder="Enter Display Name"
          name="DisplayName"
          error={errors.DisplayName?.message}
        />
        <Input
          register={register}
          requiredfield="true"
          label="Email"
          prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
          type="email"
          placeholder="example@example.com"
          name="Email"
          error={errors.Email?.message}
        />
        <Input
          register={register}
          requiredfield="true"
          type="text"
          phoneNoInput={true}
          label="Mobile No"
          placeholder="Enter Your Mobile No"
          name="MobileNo"
          error={errors.MobileNo?.message}
          maxLength={10}
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
      </FormGroup>
    );
  };
  const renderCommunicationInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
        <Input
          register={register}
          requiredfield="true"
          label="Address1"
          className="col-span-full"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          placeholder="Enter Address"
          name="Address1"
          error={errors.Address1?.message}
        />
        <Input
          register={register}
          label="Address2"
          className="col-span-full"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          placeholder="Enter Address"
          name="Address2"
          error={errors.Address2?.message}
        />
        <Input
          register={register}
          label="Land Mark"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          placeholder="Enter LandMark"
          name="LandMark"
          error={errors.LandMark?.message}
        />
        <Controller
          control={control}
          name="BranchId"
          render={({ field: { value, onChange } }) => (
            <SelectBox
              label="Branch"
              placeholder="Select Branch"
              options={branchOptions}
              onChange={onChange}
              value={value}
              getOptionValue={option => option.value}
              displayValue={selected => branchOptions?.find(r => r.value === selected)?.name ?? ''}
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
        <Form<UserFormFieldTypes>
          validationSchema={UserFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: data
              ? {
                  ...data,
                  LandMark: data.LandMark ? data.LandMark : '',
                  UserName: data.UserName.split('@')[0],
                  IsActive: data.IsActive ? '1' : '0',
                  Password: 'Password@1',
                  ConfirmPassword: 'Password@1',
                }
              : userFormDefaultValues,
          }}>
          {({
            register,
            control,
            setValue,
            trigger,
            getValues,
            formState: { errors, isValid },
          }) => {
            useEffect(() => {
              if (!data) {
                setValue('BranchId', branchOpt[0]?.value);
              }
            }, [branchOpt]);
            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-4" />
                {currentStep === 1 && (
                  <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                    {renderPersonelInfo(control, getValues, errors, register, setValue, trigger)}
                    {renderCommunicationInfo(
                      control,
                      getValues,
                      errors,
                      register,
                      setValue,
                      trigger,
                    )}
                    <FormGroup className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4">
                      <Input
                        requiredfield="true"
                        register={register}
                        label="User Name"
                        autoComplete="on"
                        className="col-span-full"
                        placeholder="Enter UserName"
                        name="UserName"
                        suffix={loginUser ? `@${loginUser?.UserName.split('@')[1]}` : ''}
                        error={errors.UserName?.message}
                      />
                    </FormGroup>
                    {renderPasswordReset(control, getValues, errors, register)}
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="flex flex-col h-full divide-y divide-dashed divide-gray-200">
                    <MenuSelect menus={menus} setMenus={setMenus} isEdit={isEdit} />
                  </div>
                )}
                <FormFooter
                  isLoading={loading}
                  handleNextBtn={() => (isValid ? handleNextStep() : trigger())}
                  handlePrevBtn={handlePreviousStep}
                  currentStep={currentStep}
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={closeDrawer}
                  handleDelBtn={() => handleDelete(data.UserId)}
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
