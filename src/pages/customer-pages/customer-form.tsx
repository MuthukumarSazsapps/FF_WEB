import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { CustomerFormDefaultValues, CustomerFormSchema, CustomerFormFieldTypes } from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect, useRef } from 'react';
import { Checkbox, Title } from 'rizzui';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useCustomers from 'hooks/use-customer';
import { PiEnvelopeSimple, PiFileLock } from 'react-icons/pi';
import { DatePicker } from 'common/datepicker';
import AvatarUpload from 'common/avatar-upload';
import Rate from 'common/table & form/rating';
import { useNavigate } from 'react-router-dom';
import { ToastErrorMessage, ToastSuccessMessage } from 'common/table & form/toastMessage';

export type renderProbs = (
  control: any,
  getValues: any,
  errors: any,
  register: any,
  setValue: any,
  trigger?: any,
) => JSX.Element;

export default function CustomerForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createCustomerState } = useCustomers({ create: true });
  const { handleDelete, deleteCustomerState } = useCustomers({ remove: true });
  const { handleUpdate, updateCustomerState } = useCustomers({ edit: true });
  const { loading } = useCustomers();
  const { openDrawer, closeDrawer } = useDrawer();
  const { subCityOpt, branchOpt, genderOpt } = useSelectBoxOptions({
    PageName: 'CustomerForm',
  });
  const innerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (createCustomerState?.includes('Successfully')) {
      ToastSuccessMessage(createCustomerState);
      navigate('/list/customers');
    }
    if (createCustomerState?.includes('Exists')) {
      ToastErrorMessage(createCustomerState);
    }
    if (updateCustomerState?.includes('Successfully')) {
      ToastSuccessMessage(updateCustomerState);
      closeDrawer();
    }
    if (updateCustomerState?.includes('Exists')) {
      ToastErrorMessage(updateCustomerState);
    }
    if (deleteCustomerState?.includes('Successfully')) {
      ToastSuccessMessage(deleteCustomerState);
      closeDrawer();
    }
  }, [createCustomerState, updateCustomerState, deleteCustomerState]);

  const onSubmit: SubmitHandler<CustomerFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.CustomerId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  const renderPersonalInfo: renderProbs = (
    control,
    getValues,
    errors,
    register,
    setValue,
    triger,
  ) => {
    return (
      <FormGroup
        title="Personel Info"
        description="Fill the Customer Personel details here"
        className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
        childrenclass="@2xl:grid-cols-8 items-start">
        <Input<CustomerFormFieldTypes>
          label="Customer Name"
          name="CustomerName"
          requiredfield="true"
          className="col-span-3"
          autoFocus
          textonly={true}
          register={register}
          placeholder="Enter Name"
          error={errors.CustomerName?.message}
        />
        <Input
          label="Customer Father Name"
          className="col-span-3"
          name="CustomerFatherName"
          textonly={true}
          requiredfield="true"
          register={register}
          placeholder="Enter Father Name"
          error={errors.CustomerFatherName?.message}
        />
        <Controller
          control={control}
          name="CustomerDOB"
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col col-span-2">
              <DatePicker
                yearDropdownItemNumber={60}
                maxDate={new Date()}
                onChange={onChange}
                selected={value}
                minDate={new Date('1930-01-01')}
                dateFormat={'d MMM yyyy'}
                inputProps={{
                  label: 'Customer DOB',
                }}
              />
              {errors.CustomerDOB && (
                <span className="text-xs text-red-500">{errors.CustomerDOB.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="CustomerGender"
          render={({ field: { value, onChange } }) => (
            <SelectBox
              label="Customer Gender"
              placeholder="Select Gender"
              className="col-span-2"
              options={genderOpt}
              onChange={onChange}
              value={value}
              getOptionValue={option => option.value}
              displayValue={selected => genderOpt?.find(r => r.value === selected)?.name ?? ''}
              error={errors?.CustomerGender?.message as string}
            />
          )}
        />

        <Input
          type="text"
          label="Customer Mobile No"
          className="col-span-2"
          requiredfield="true"
          maxLength={10}
          phoneNoInput={true}
          placeholder="Enter Mobile No"
          name="CustomerPhoneNo"
          register={register}
          error={errors.CustomerPhoneNo?.message}
        />
        <Input
          type="text"
          label="Alternate Mobile No"
          className="col-span-2"
          requiredfield="true"
          maxLength={10}
          phoneNoInput={true}
          placeholder="Enter Mobile No"
          name="CustomerAlternatePhoneNo"
          register={register}
          error={errors.CustomerAlternatePhoneNo?.message}
        />
        <Input
          label="Email"
          className="col-span-2"
          register={register}
          prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
          type="email"
          placeholder="example@example.com"
          name="CustomerEmail"
          error={errors.CustomerEmail?.message}
        />
        <Input
          register={register}
          label="Customer Address"
          className="col-span-4"
          requiredfield="true"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          placeholder="Enter Address"
          name="CustomerAddress"
          error={errors.CustomerAddress?.message}
        />
        <Input
          type="text"
          label="Customer Profession"
          className="col-span-2"
          requiredfield="true"
          placeholder="Customer Profession"
          name="CustomerProfession"
          register={register}
        />
        <Controller
          control={control}
          name="CustomerCity"
          render={({ field: { onChange } }) => (
            <div className="col-span-2">
              <SazsSelect
                label="Customer City Name"
                options={subCityOpt}
                onChange={value => {
                  setValue('CustomerCity', value.value);
                  if (errors.CustomerCity) {
                    triger();
                  }
                }}
                placeholder="Select City"
                errors={errors.CustomerCity?.message}
                defaultValue={subCityOpt.find(option => option.value === data?.CustomerCity)}
                value={subCityOpt.find(value => value.value === getValues()?.CustomerCity)}
              />
            </div>
          )}
        />
      </FormGroup>
    );
  };
  const renderCommunicationInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Document Details"
        description="Enter the Customer Document details here"
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2">
        <Input
          type="text"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            let formattedValue = e.target.value.replace(/[^0-9-]/g, '').slice(0, 14);

            if (formattedValue.length > 5) {
              formattedValue = formattedValue.replace(/(\d{4})(\d{4})/, '$1-$2');
            } else if (formattedValue.length > 9) {
              formattedValue = formattedValue.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
            }
            setValue('CustomerAADHAAR', formattedValue);
          }}
          label="Customer AADHAAR No"
          requiredfield="true"
          placeholder="Enter AADHAAR No"
          name="CustomerAADHAAR"
          register={register}
          error={errors.CustomerAADHAAR?.message}
        />
        <Input
          type="text"
          label="Customer PAN No"
          placeholder="Enter PAN No"
          name="CustomerPAN"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            let formattedValue = e.target.value.toUpperCase();
            if (formattedValue.length < 6) {
              formattedValue = formattedValue.replace(/[^A-Z]/g, '');
            }
            if (formattedValue.length === 6 && !formattedValue.includes('-')) {
              formattedValue = formattedValue.replace(/(.{5})(.{1})(?!-)/, '$1-$2');
            }
            if (formattedValue.length > 6 && formattedValue.length < 11) {
              const lastChar = formattedValue.slice(-1);
              if (!/^\d$/.test(lastChar)) {
                formattedValue = formattedValue.slice(0, -1);
              }
            } else if (formattedValue.length === 11) {
              const lastChar = formattedValue.slice(-1);
              if (!/^[A-Z]$/.test(lastChar)) {
                formattedValue = formattedValue.slice(0, -1);
              }
            }
            setValue('CustomerPAN', formattedValue);
          }}
          register={register}
          maxLength={11}
          error={errors.CustomerPAN?.message}
        />
        <Input
          register={register}
          type="text"
          label="Customer Driving License No"
          maxLength={16}
          className="col-span-half"
          placeholder="Enter Driving License No"
          name="CustomerDrivingLicenseNo"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            let formattedValue = e.target.value.toUpperCase();
            if (formattedValue.length === 3 && !formattedValue.includes('-')) {
              formattedValue = formattedValue.replace(/^(.{2})(?!-)/, '$1-');
            }
            if (formattedValue.length > 3) {
              const lastChar = formattedValue.slice(-1);
              if (!/^\d$/.test(lastChar)) {
                formattedValue = formattedValue.slice(0, -1);
              }
            }
            setValue('CustomerDrivingLicenseNo', formattedValue);
          }}
          error={errors.CustomerDrivingLicenseNo?.message}
        />
        <Controller
          control={control}
          name="CustomerDrivingLicenseExpiryDate"
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col">
              <DatePicker
                onChange={onChange}
                selected={value}
                dateFormat={'d MMM yyyy'}
                minDate={new Date('2010-01-01')}
                maxDate={new Date('2100-01-01')}
                inputProps={{
                  label: 'Customer DrivingLicense ExpiryDate',
                }}
              />
              {errors.CustomerDrivingLicenseExpiryDate && (
                <span className="text-xs text-red-500">
                  {errors.CustomerDrivingLicenseExpiryDate.message}
                </span>
              )}
            </div>
          )}
        />
      </FormGroup>
    );
  };
  const renderGuarandeeInfo: renderProbs = (
    control,
    getValues,
    errors,
    register,
    setValue,
    trigger,
  ) => {
    return (
      <FormGroup
        className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
        title="Guarantor Info"
        description="Fill The Guarantor Details Here"
        childrenclass="@2xl:grid-cols-6">
        <Input<CustomerFormFieldTypes>
          label="Guarantor Name"
          name="GuarantorName"
          className="col-span-3"
          requiredfield="true"
          register={register}
          textonly={true}
          placeholder="Enter Name"
          error={errors.GuarantorName?.message}
        />
        <Input
          label="Guarantor Father Name"
          name="GuarantorFatherName"
          requiredfield="true"
          className="col-span-3"
          register={register}
          textonly={true}
          placeholder="Enter Father Name"
          error={errors.GuarantorFatherName?.message}
        />
        <Controller
          control={control}
          name="GuarantorGender"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-2">
              <SelectBox
                label="Guarantor Gender"
                placeholder="Select Gender"
                options={genderOpt}
                onChange={onChange}
                value={value}
                getOptionValue={option => option.value}
                displayValue={selected => genderOpt?.find(r => r.value === selected)?.name ?? ''}
                error={errors?.GuarantorGender?.message as string}
              />
            </div>
          )}
        />

        <Input
          type="text"
          label="Guarantor Mobile No"
          requiredfield="true"
          className="col-span-2"
          placeholder="Enter Mobile No"
          name="GuarantorPhoneNo"
          maxLength={10}
          register={register}
          error={errors.GuarantorPhoneNo?.message}
          phoneNoInput={true}
        />
        <Controller
          control={control}
          name="GuarantorCity"
          render={({ field: { onChange } }) => (
            <div className="col-span-2">
              <SazsSelect
                label="Guarantor City Name"
                options={subCityOpt}
                onChange={value => {
                  setValue('GuarantorCity', value.value);
                  if (errors.GuarantorCity) {
                    trigger();
                  }
                }}
                placeholder="Select City"
                errors={errors.GuarantorCity?.message}
                defaultValue={subCityOpt.find(option => option.value === data?.GuarantorCity)}
                value={subCityOpt.find(value => value.value === getValues()?.GuarantorCity)}
              />
            </div>
          )}
        />
        <Input
          register={register}
          label="Guarantor Address"
          className="col-span-full"
          requiredfield="true"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          placeholder="Enter Address"
          name="GuarantorAddress"
          error={errors.GuarantorAddress?.message}
        />
      </FormGroup>
    );
  };
  const renderCustomerInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Account Settings"
        description="Enter the Customer Account details here"
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-4 items-center">
        <Controller
          control={control}
          name="BranchId"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1">
              <SelectBox
                label="Branch"
                placeholder="Select Branch"
                options={branchOpt}
                onChange={onChange}
                value={value}
                getOptionValue={option => option.value}
                displayValue={selected => branchOpt?.find(r => r.value === selected)?.name ?? ''}
                error={errors?.BranchId?.message as string}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="CustomerIsCurrent"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 mt-3">
              <Checkbox
                variant="flat"
                color="info"
                label="Customer Is Current ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('CustomerIsCurrent', !getValues().CustomerIsCurrent);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="CustomerIsBlocked"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 mt-3">
              <Checkbox
                variant="flat"
                color="info"
                label="Customer Is Blocked ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('CustomerIsBlocked', !getValues().CustomerIsBlocked);
                }}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="CustomerRating"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 ">
              <Rate
                label="Customer Rating"
                size="xl"
                value={value as string}
                onChange={onChange}
                tooltips={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
                error={errors?.CustomerRating?.message as string}
              />
            </div>
          )}
        />
      </FormGroup>
    );
  };

  return (
    <SimpleBar className={data ? 'h-[calc(93%)]' : 'h-full'}>
      <div className="px-5">
        <Form<CustomerFormFieldTypes>
          validationSchema={CustomerFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: isEdit
              ? {
                  ...data,
                  CustomerDOB: data.CustomerDOB ? new Date(data.CustomerDOB) : null,
                  CustomerDrivingLicenseExpiryDate: data.CustomerDrivingLicenseExpiryDate
                    ? new Date(data.CustomerDrivingLicenseExpiryDate)
                    : null,
                }
              : CustomerFormDefaultValues,
          }}>
          {({
            register,
            control,
            setValue,
            getValues,
            trigger,
            formState: { errors, isValid },
          }) => {
            useEffect(() => {
              if (!data) {
                setValue('BranchId', branchOpt[0]?.value);
              }
            }, [branchOpt]);
            return (
              <>
                {!data && (
                  <Title className="text-violet-700 text-center text-xl font-medium">
                    Create New Customer
                  </Title>
                )}
                <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-12 @3xl:pt-2" />
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderPersonalInfo(control, getValues, errors, register, setValue, trigger)}
                  {renderCommunicationInfo(control, getValues, errors, register, setValue)}
                  {renderGuarandeeInfo(control, getValues, errors, register, setValue, trigger)}
                  {renderCustomerInfo(control, getValues, errors, register, setValue)}

                  <FormGroup
                    title="Customer Photo"
                    description="Upload Customer Photo Here."
                    className="pt-2 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4">
                    <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                      <AvatarUpload
                        {...register('CustomerPhotoURL' as const)}
                        ref={innerRef}
                        name="CustomerPhotoURL"
                        setFile={data => {
                          setValue('CustomerPhotoURL', data);
                        }}
                        role="customer"
                        avatar={data?.CustomerPhotoURL ?? ''}
                        getFile={() => {
                          const value = getValues('CustomerPhotoURL');
                          return value !== undefined ? String(value) : '';
                        }}
                        error={errors?.CustomerPhotoURL?.message as string}
                      />
                    </div>
                  </FormGroup>
                </div>
                <FormFooter
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={() => (data ? closeDrawer() : navigate(-1))}
                  handleDelBtn={() => handleDelete(data.CustomerId)}
                  altBtnText={'Cancel'}
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
