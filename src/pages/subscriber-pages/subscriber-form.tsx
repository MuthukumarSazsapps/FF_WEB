import { Controller, SubmitHandler } from 'react-hook-form';
import { PiEnvelopeSimple, PiFileLock } from 'react-icons/pi';
import { Form } from 'common/form';
import { PinCode } from 'rizzui';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import {
  subscriberFormDefaultValues,
  SubscriberFormSchema,
  SubscriberFormFieldTypes,
} from 'utils/types';
import SelectBox from 'common/select';
import useSubscribers from 'hooks/use-subscribers';
import { DatePicker } from 'common/datepicker';
import AvatarUpload from 'common/avatar-upload';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'rizzui';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import Password from 'common/password';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export type renderProbs = (
  control: any,
  getValues: any,
  errors: any,
  register: any,
  setValue?: any,
) => JSX.Element;

export default function SubscriberForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createSubscriberState } = useSubscribers({ create: true });
  const { handleDelete, deleteSubscriberState } = useSubscribers({ remove: true });
  const { handleUpdate, updateSubscriberState } = useSubscribers({ edit: true });
  const { loading } = useSubscribers();
  const { openDrawer, closeDrawer } = useDrawer();
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [resetOTP, setResetOTP] = useState('');
  const { cityOpt, statusOpt } = useSelectBoxOptions({ PageName: 'Admin' });
  const innerRef = useRef(null);

  useEffect(() => {
    if (createSubscriberState?.includes('Successfully')) {
      ToastSuccessMessage(createSubscriberState);
      closeDrawer();
    }
    if (createSubscriberState?.includes('Exists')) {
      ToastErrorMessage(createSubscriberState);
    }
    if (updateSubscriberState?.includes('Successfully')) {
      ToastSuccessMessage(updateSubscriberState);
      closeDrawer();
    }
    if (updateSubscriberState?.includes('Exists')) {
      ToastErrorMessage(updateSubscriberState);
    }
    if (deleteSubscriberState?.includes('Successfully')) {
      ToastSuccessMessage(deleteSubscriberState);
      closeDrawer();
    }
  }, [createSubscriberState, updateSubscriberState, deleteSubscriberState]);

  const onSubmit: SubmitHandler<SubscriberFormFieldTypes> = obj => {
    const subscriberData = {
      ...obj,
      UserName: obj.UserName.trim() + '@' + obj.ShortName.trim() + '.com',
    };
    if (data) {
      handleUpdate(data.SubscriberId, subscriberData, isPasswordResetVisible);
    } else {
      handleSubmit(subscriberData);
    }
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
              <Password<SubscriberFormFieldTypes>
                name="Password"
                placeholder="Enter your password"
                requiredfield="true"
                helperText={
                  getValues().Password?.length < 8 &&
                  'Your current password must be minimum 8 characters'
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
                color="primary"
                placeholder="Confirm password"
                requiredfield="true"
                onChange={onChange}
                register={register}
                error={errors.ConfirmPassword?.message}
              />
            )}
          />
        </FormGroup>
      );
    return (
      <Button color="info" type="button" onClick={() => setShowOTPForm(true)} className="w-fit">
        Reset Password
      </Button>
    );
  };

  const renderPersonalInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Personel Info"
        description="Fill the personel details here."
        className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
        childrenclass="@2xl:grid-cols-8">
        <Input<SubscriberFormFieldTypes>
          label="Full Name"
          name="SubscriberName"
          requiredfield="true"
          className="col-span-3"
          register={register}
          placeholder="Enter Full Name"
          error={errors.SubscriberName?.message}
        />
        <Input
          className="col-span-3"
          label="Company Name"
          requiredfield="true"
          placeholder="Enter Company Name"
          register={register}
          name="CompanyName"
          error={errors.CompanyName?.message}
        />
        <Input
          disabled={data ? true : false}
          label="Short Name"
          className="col-span-2"
          requiredfield="true"
          placeholder="Enter Short Name"
          name="ShortName"
          register={register}
          error={errors.ShortName?.message}
        />
        <Input
          label="Email"
          register={register}
          className="col-span-3"
          requiredfield="true"
          prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
          type="email"
          placeholder="example@example.com"
          name="Email"
          error={errors.Email?.message}
        />

        <Input
          type="text"
          label="Mobile No"
          phoneNoInput={true}
          maxLength={10}
          className="col-span-3"
          requiredfield="true"
          placeholder="Enter Mobile No"
          name="MobileNo"
          register={register}
          error={errors.MobileNo?.message}
        />
        <Input
          maxLength={11}
          numberonly={true}
          type="text"
          register={register}
          label="LandLine No"
          className="col-span-2"
          placeholder="Enter LandLine No"
          name="LandLineNo"
          error={errors.LandLineNo?.message}
        />
        <Input
          label="Point Of Contact"
          type="text"
          className="col-span-4"
          register={register}
          requiredfield="true"
          placeholder="Enter Point Of Contact"
          name="PointOfContact"
          error={errors.PointOfContact?.message}
        />
        <Input
          register={register}
          type="text"
          className="col-span-4"
          label="GST No"
          maxLength={15}
          onChange={e => {
            let formattedValue = e.target.value.toUpperCase();
            formattedValue = formattedValue.replace(/[^A-Z0-9]/g, '');
            setValue('GstNo', formattedValue);
          }}
          requiredfield="true"
          placeholder="Enter Gst No"
          name="GstNo"
          error={errors.GstNo?.message}
        />
      </FormGroup>
    );
  };
  const renderCommunicationInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Communication Details"
        description="Fill the subscriber communication details here."
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-3">
        <Input
          register={register}
          step={2}
          label="Address1"
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
          label="Address2"
          className="col-span-full"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          placeholder="Enter Address"
          name="Address2"
          error={errors.Address2?.message}
        />

        <Input
          label="Land Mark"
          className="col-span-1 mb-0"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          register={register}
          placeholder="Enter LandMark"
          name="LandMark"
          error={errors.LandMark?.message}
        />
        <Controller
          control={control}
          name="CityId"
          render={({ field: { onChange } }) => (
            <SazsSelect
              label="City Name"
              options={cityOpt}
              onChange={value => {
                setValue('CityId', value.value);
              }}
              placeholder="Select City"
              errors={errors.CityId?.message}
              defaultValue={cityOpt.find(option => option.value === data?.CityId)}
              value={cityOpt.find(value => value.value === getValues()?.CityId)}
            />
          )}
        />
        <Input
          label="No of Branches"
          register={register}
          className="col-span-1"
          requiredfield="true"
          type="text"
          numberonly={true}
          maxLength={1}
          placeholder="Enter Branch Count"
          name="NoOfBranches"
          error={errors.NoOfBranches?.message}
        />
      </FormGroup>
    );
  };
  const renderValidityInfo: renderProbs = (control, getValues, errors, register) => {
    return (
      <FormGroup
        title="Account Settings"
        className="pt-1 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4"
        childrenclass="@2xl:grid-cols-3">
        <Input
          disabled={data ? true : false}
          label="User Name"
          requiredfield="true"
          className="col-span-full"
          placeholder="Enter UserName"
          register={register}
          name="UserName"
          suffix={getValues().ShortName?.length > 0 ? `@${getValues().ShortName}.com` : ''}
          error={errors.UserName?.message}
        />
        <Controller
          control={control}
          name="StartDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col">
              <DatePicker
                onChange={onChange}
                selected={value}
                dateFormat={'d MMM yyyy'}
                inputProps={{
                  label: 'Start Date',
                }}
                required
              />
              {errors.StartDate && <span className="text-red-500">{errors.StartDate.message}</span>}
            </div>
          )}
        />
        <Controller
          control={control}
          name="EndDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col">
              <DatePicker
                inputProps={{
                  label: 'End Date',
                }}
                onChange={onChange}
                selectsStart={true}
                dateFormat={'d MMM yyyy'}
                selected={value}
                required
              />
              {errors.EndDate && <span className="text-red-500">{errors.EndDate.message}</span>}
            </div>
          )}
        />
        <Controller
          control={control}
          name="IsActive"
          render={({ field: { value, onChange } }) => (
            <SelectBox
              label="Subscriber IsActive"
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
        <Form<SubscriberFormFieldTypes>
          validationSchema={SubscriberFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: isEdit
              ? {
                  ...data,
                  NoOfBranches: data.NoOfBranches ? data.NoOfBranches.toString() : '',
                  Address2: data.Address2 ? data.Address2.toString() : '',
                  LandMark: data.LandMark ? data.LandMark.toString() : '',
                  LandLineNo: data.LandLineNo || '',
                  UserName: data.UserName.split('@')[0],
                  IsActive: data.IsActive ? '1' : '0',
                  StartDate: data.StartDate ? new Date(data.StartDate) : null,
                  EndDate: data.EndDate ? new Date(data.EndDate) : null,
                  Password: 'Password@1',
                  ConfirmPassword: 'Password@1',
                }
              : subscriberFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, formState: { errors } }) => {
            return (
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderPersonalInfo(control, getValues, errors, register, setValue)}
                  {renderCommunicationInfo(control, getValues, errors, register, setValue)}
                  {renderValidityInfo(control, getValues, errors, register, setValue)}
                  {renderPasswordReset(control, getValues, errors, register, setValue)}
                  <FormGroup
                    title="Subscriber Photo"
                    description="This will be displayed on your profile."
                    className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4">
                    <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                      <AvatarUpload
                        {...register('Logo' as const)}
                        ref={innerRef}
                        name="Logo"
                        setFile={data => {
                          setValue('Logo', data);
                        }}
                        avatar={data?.Logo ?? ''}
                        getFile={() => {
                          const value = getValues('Logo');
                          return value !== undefined ? String(value) : '';
                        }}
                        error={errors?.Logo?.message as string}
                      />
                    </div>
                  </FormGroup>
                </div>
                <FormFooter
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={closeDrawer}
                  handleDelBtn={() => handleDelete(data.SubscriberId)}
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
