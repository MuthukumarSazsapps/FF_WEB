'use client';

import { SubmitHandler, Controller } from 'react-hook-form';
import { PiEnvelopeSimple, PiFileLock, PiSealCheckFill } from 'react-icons/pi';
import { Form } from 'common/form';
import { Title, Text } from 'rizzui';
import { Input } from 'rizzui';
import toast from 'react-hot-toast';
import { profileFormDefaultValues, profileFormSchema, ProfileFormTypes } from 'utils/types';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { cn } from 'utils';
import { useLayout } from 'hooks/use-layout';
import { useBerylliumSidebars } from 'layouts/BeryLlium/beryllium-utils';
import { LAYOUT_OPTIONS } from 'config/enums';
import useUsers from 'hooks/use-users';
import SazsSelect from 'common/table & form/sazs-select';
import useSelectBoxOptions from 'hooks/use-select-box-options';

export default function Profile() {
  const { cityOpt, statusOpt } = useSelectBoxOptions({ PageName: 'Admin' });
  const onSubmit: SubmitHandler<ProfileFormTypes> = data => {
    toast.success(<Text as="b">Profile successfully updated!</Text>);
    console.log('Profile settings data ->', data);
  };
  const { loginUser } = useUsers();
  return (
    <>
      <Form<ProfileFormTypes>
        validationSchema={profileFormSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues: loginUser
            ? { ...loginUser, UserName: loginUser.UserName.split('@')[0] }
            : profileFormDefaultValues,
        }}>
        {({ register, control, getValues, setValue, formState: { errors } }) => {
          return (
            <>
              <ProfileHeader
                title={loginUser.CompanyName || 'Admin'}
                description="Update Company Logo and details.">
                <div className="w-full sm:w-auto md:ms-auto"></div>
              </ProfileHeader>
              <>
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  <FormGroup className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4">
                    <Input
                      label="Full Name"
                      inputClassName="border-purple-500 active:border-blue"
                      labelClassName="text-base font-medium"
                      className="col-span-1"
                      placeholder="Enter Subscriber Full Name"
                      {...register('SubscriberName')}
                      error={errors.SubscriberName?.message}
                    />
                    <Input
                      label="Company Name"
                      inputClassName="border-purple-500"
                      labelClassName="text-base font-medium"
                      className="col-span-1"
                      placeholder="Enter Subscriber Short Name"
                      {...register('CompanyName')}
                      error={errors.CompanyName?.message}
                    />
                    <Input
                      label="Short Name"
                      inputClassName="border-purple-500"
                      labelClassName="text-base font-medium"
                      className="col-span-1"
                      placeholder="Enter Subscriber Short Name"
                      {...register('ShortName')}
                      error={errors.ShortName?.message}
                    />
                    <Input
                      label="Email"
                      inputClassName="border-purple-500"
                      labelClassName="text-base font-medium"
                      className="col-span-1"
                      prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
                      type="email"
                      placeholder="example@example.com"
                      {...register('Email')}
                      error={errors.Email?.message}
                    />
                    <Input
                      label="Point Of Contact"
                      labelClassName="text-base font-medium"
                      className="col-span-1"
                      type="text"
                      inputClassName="border-purple-500"
                      placeholder="Enter Point Of Contact"
                      {...register('PointOfContact')}
                      error={errors.PointOfContact?.message}
                    />
                    <Input
                      type="number"
                      pattern="[0-9]{10,12}"
                      label="Mobile No"
                      labelClassName="text-base font-medium"
                      inputClassName="border-purple-500"
                      className="col-span-1"
                      placeholder="Enter Your Mobile No"
                      {...register('MobileNo')}
                      error={errors.MobileNo?.message}
                      onChange={e => {
                        const maxLength = 12;
                        const inputValue = (e.target as HTMLInputElement).value;

                        if (inputValue.length > maxLength) {
                          (e.target as HTMLInputElement).value = inputValue.slice(0, maxLength);
                        }
                      }}
                    />
                    <Input
                      type="number"
                      pattern="[0-9]{10,12}"
                      label="LandLine No"
                      labelClassName="text-base font-medium"
                      inputClassName="border-purple-500"
                      className="col-span-half"
                      placeholder="Enter LandLine No"
                      {...register('LandLineNo')}
                      error={errors.LandLineNo?.message}
                      onChange={e => {
                        const maxLength = 12;
                        const inputValue = (e.target as HTMLInputElement).value;

                        if (inputValue.length > maxLength) {
                          (e.target as HTMLInputElement).value = inputValue.slice(0, maxLength);
                        }
                      }}
                    />
                  </FormGroup>
                  {/* <FormGroup
                    title="Subscriber Code"
                    className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
                    <Input
                      className="col-span-full"
                      inputClassName="border-purple-500"
                      prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
                      type="text"
                      placeholder="Enter Unique Id"
                      {...register('NoOfBranches')}
                      helperText={
                        getValues().NoOfBranches.length < 10 &&
                        'Your current Subscriber Is must be minimum 10 characters'
                      }
                      error={errors.NoOfBranches?.message}
                    />
                  </FormGroup> */}
                  <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
                    <Input
                      label="Addtess1"
                      labelClassName="text-base font-medium"
                      className="col-span-full"
                      inputClassName="border-purple-500"
                      prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
                      type="text"
                      placeholder="Enter Address"
                      {...register('Address1')}
                      error={errors.Address1?.message}
                    />
                    <Input
                      label="Addtess2"
                      labelClassName="text-base font-medium"
                      className="col-span-full"
                      prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
                      type="text"
                      placeholder="Enter Address"
                      {...register('Address2')}
                      error={errors.Address2?.message}
                    />
                  </FormGroup>
                  <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2 items-center">
                    <Controller
                      control={control}
                      name="CityId"
                      render={({ field: { onChange } }) => (
                        <SazsSelect
                          label="City Name"
                          className="col-span-1"
                          options={cityOpt}
                          onChange={value => {
                            setValue('CityId', value.value);
                          }}
                          placeholder="Select City"
                          errors={errors.CityId?.message}
                          defaultValue={cityOpt.find(option => option.value === loginUser?.CityId)}
                          value={cityOpt.find(value => value.value === getValues()?.CityId)}
                        />
                      )}
                    />
                    <Input
                      label="Land Mark"
                      labelClassName="text-base font-medium"
                      className="col-span-1 mb-0"
                      prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
                      type="text"
                      placeholder="Enter LandMark"
                      {...register('LandMark')}
                      error={errors.LandMark?.message}
                    />
                  </FormGroup>
                  <FormGroup
                    className="pt-1 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4"
                    childrenclass="@2xl:grid-cols-2">
                    <Input
                      type="text"
                      label="GST No"
                      maxLength={15}
                      inputClassName="border-purple-500"
                      labelClassName="text-base font-medium"
                      className="col-span-half"
                      placeholder="Enter Gst No"
                      {...register('GstNo')}
                      error={errors.GstNo?.message}
                    />
                  </FormGroup>
                  <FormGroup
                    // title="Validity"
                    className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4">
                    <Input
                      label="User Name"
                      labelClassName="text-base font-medium"
                      inputClassName="border-purple-500"
                      className="col-span-full"
                      placeholder="Enter UserName"
                      {...register('UserName')}
                      suffix={
                        getValues().ShortName?.length > 0 ? `@${getValues().ShortName}.com` : ''
                      }
                      error={errors.UserName?.message}
                    />
                  </FormGroup>
                  {/* {renderPasswordReset(control, getValues, errors, register)} */}
                  {/* <FormGroup
                    title="Upload Photo"
                    description="This will be displayed on your profile."
                    className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4">
                    <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                      <AvatarUpload
                        {...register('ImageUrl')}
                        name="ImageUrl"
                        setFile={data => {
                          setValue('ImageUrl', data);
                        }}
                        avatar={loginUser?.ImageUrl ?? ''}
                        getFile={key => getValues(key)}
                        error={errors?.ImageUrl?.message as string}
                      />
                    </div>
                  </FormGroup> */}
                </div>
              </>
              <FormFooter
                // isLoading={isLoading}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            </>
          );
        }}
      </Form>
    </>
  );
}

export function ProfileHeader({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
  const { layout } = useLayout();
  const { expandedLeft } = useBerylliumSidebars();
  const { loginUser } = useUsers();
  const avatarUrl = `${process.env.REACT_APP_API_URL}/subscriber/${loginUser.Logo}`;

  return (
    <div
      className={cn(
        'relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10',
        layout === LAYOUT_OPTIONS.BERYLLIUM && expandedLeft
          ? 'before:start-5 3xl:before:start-[25px]'
          : 'xl:before:w-[calc(100%_+_10px)]',
      )}>
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-gray-300 pb-10">
        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
          <img
            src={avatarUrl}
            alt="profile-pic"
            sizes="(max-width: 768px) 100vw"
            className="aspect-auto"
          />
        </div>
        <div>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900">
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Title>
          {description ? <Text className="text-sm text-gray-500">{description}</Text> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
