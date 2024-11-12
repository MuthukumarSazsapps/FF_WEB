import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import FormFooter from 'common/table & form/form-footer';
import { LoanFormDefaultValues, LoanFormSchema, LoanFormFieldTypes } from 'utils/types';
import SelectBox from 'common/select';
import SimpleBar from 'common/simplebar';
import { useDrawer } from 'hooks/use-drawer';
import { useEffect, useState } from 'react';
import { Checkbox, Title, Tooltip } from 'rizzui';
import SazsSelect from 'common/table & form/sazs-select';
import CenterSpinner from 'common/center-spinner';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import useLoans from 'hooks/use-loan';
import { PiEnvelopeSimple, PiFileLock } from 'react-icons/pi';
import { DatePicker } from 'common/datepicker';
import { useNavigate } from 'react-router-dom';
import useCustomers from 'hooks/use-customer';
import { actions, dispatch } from 'store';
import UploadZone from 'common/fileupload/upload-zone';
import { ToastSuccessMessage } from 'common/table & form/toastMessage';

export type renderProbs = (
  control: any,
  getValues: any,
  errors: any,
  register: any,
  setValue: any,
  trigger?: any,
) => JSX.Element;

export default function LoanForm({ data, isEdit = false }: { data?: any; isEdit?: boolean }) {
  const { handleSubmit, createLoanState } = useLoans({ create: true });
  const { handleDelete, deleteLoanState } = useLoans({ remove: true });
  const { handleUpdate, updateLoanState } = useLoans({ edit: true });
  const [emiCall, setEmiCall] = useState<{
    Principal: number;
    Interest: any;
  }>({ Principal: 0, Interest: 0 });
  const { getCustomer, getCustomerLoading, customerProfile } = useCustomers({ profile: true });
  const { loading } = useLoans();
  const { openDrawer, closeDrawer } = useDrawer();
  const { customerList, branchOpt, agentsList, vehicleList, showroomList, loanType } =
    useSelectBoxOptions({
      PageName: 'LoanForm',
    });
  const navigate = useNavigate();
  const calculateEMI = (principal: any, interestRate: any, tenureInMonths: any) => {
    if (principal && interestRate && tenureInMonths) {
      const monthlyPrincipalRate = principal / tenureInMonths;
      const monthlyInterestRate = (principal * interestRate) / 100;
      const emi = monthlyPrincipalRate + monthlyInterestRate;
      setEmiCall({
        Principal: parseFloat(parseFloat(monthlyPrincipalRate.toString()).toFixed(2)),
        Interest: parseFloat(parseFloat(monthlyInterestRate.toString()).toFixed(2)),
      });
      return emi;
    }
  };
  useEffect(() => {
    dispatch(actions.resetgetCustomers());
    if (data) {
      getCustomer(data.CustomerId);
    }
  }, []);

  useEffect(() => {
    if (createLoanState?.includes('Successfully')) {
      ToastSuccessMessage(createLoanState);
      navigate('/list/loans');
    }
    if (updateLoanState?.includes('Successfully')) {
      ToastSuccessMessage(updateLoanState);
      closeDrawer();
    }
    if (deleteLoanState?.includes('Successfully')) {
      ToastSuccessMessage(deleteLoanState);
      closeDrawer();
    }
  }, [createLoanState, updateLoanState, deleteLoanState]);

  const onSubmit: SubmitHandler<LoanFormFieldTypes> = obj => {
    if (data) {
      handleUpdate(data.LoanId, obj);
    } else {
      handleSubmit(obj);
    }
  };

  const renderVahicleInfo: renderProbs = (
    control,
    getValues,
    errors,
    register,
    setValue,
    trigger,
  ) => {
    useEffect(() => {
      setValue('LoanNo', customerProfile.LoanNo + 1);
    }, [customerProfile]);

    return (
      <FormGroup
        title="Vehicle Info"
        description="Fill the Loan Vehicle details here"
        className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
        childrenclass="@2xl:grid-cols-8 pb-5">
        <FormGroup
          className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2 col-span-5"
          childrenclass="@2xl:grid-cols-10">
          <Controller
            control={control}
            name="CustomerId"
            render={({ field: { onChange } }) => (
              <div className="col-span-10">
                <SazsSelect
                  label="Customer"
                  options={customerList}
                  onChange={value => {
                    setValue('CustomerId', value.value);
                    getCustomer(value.value);
                    if (errors.CustomerId) {
                      trigger();
                    }
                  }}
                  autoFocus
                  isDisabled={data ? true : false}
                  placeholder="Select Customer"
                  errors={errors.CustomerId?.message}
                  defaultValue={customerList.find(option => option.value === data?.CustomerId)}
                  value={customerList.find(value => value.value === getValues()?.CustomerId)}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="BranchId"
            render={({ field: { value, onChange } }) => (
              <div className="col-span-4">
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
            name="LoanType"
            render={({ field: { value, onChange } }) => (
              <div className="col-span-4">
                <SelectBox
                  label="LoanType"
                  placeholder="Select LoanType"
                  options={loanType}
                  onChange={onChange}
                  value={value}
                  getOptionValue={option => option.value}
                  displayValue={selected => loanType?.find(r => r.value === selected)?.name ?? ''}
                  error={errors?.BranchId?.message as string}
                />
              </div>
            )}
          />
          <Input<LoanFormFieldTypes>
            label="LoanNo"
            type="number"
            name="LoanNo"
            disabled
            requiredfield="true"
            className="col-span-2"
            register={register}
            placeholder="Enter Loan Number"
            error={errors.LoanNo?.message}
          />
          <Input
            label="Register Number"
            name="RegisterNumber"
            requiredfield="true"
            className="col-span-4"
            register={register}
            placeholder="Enter Register Number"
            error={errors.RegisterNumber?.message}
          />
          <Controller
            control={control}
            name="VehicleTypeId"
            render={({ field: { onChange } }) => (
              <div className="col-span-4">
                <SazsSelect
                  label="Vehicle Type"
                  options={vehicleList}
                  onChange={value => {
                    setValue('VehicleTypeId', value.value);
                    if (errors.VehicleTypeId) {
                      trigger();
                    }
                  }}
                  placeholder="Select Vehicle Type"
                  errors={errors.VehicleTypeId?.message}
                  defaultValue={vehicleList.find(option => option.value === data?.VehicleTypeId)}
                  value={vehicleList.find(value => value.value === getValues()?.VehicleTypeId)}
                />
              </div>
            )}
          />
          <Input
            label="Model Year"
            type="text"
            numberonly={true}
            maxLength={4}
            name="MadeYear"
            requiredfield="true"
            className="col-span-2"
            register={register}
            placeholder="Enter Made Year"
            error={errors.MadeYear?.message}
          />
          <Controller
            control={control}
            name="ShowRoomId"
            render={({ field: { onChange } }) => (
              <div className="col-span-4">
                <SazsSelect
                  label="ShowRoom Name"
                  options={showroomList}
                  onChange={value => {
                    setValue('ShowRoomId', value.value);
                    if (errors.ShowRoomId) {
                      trigger();
                    }
                  }}
                  placeholder="Select ShowRoom"
                  errors={errors.ShowRoomId?.message}
                  defaultValue={showroomList.find(option => option.value === data?.ShowRoomId)}
                  value={showroomList.find(value => value.value === getValues()?.ShowRoomId)}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="AgentId"
            render={({ field: { onChange } }) => (
              <div className="col-span-3">
                <SazsSelect
                  label="Agent Name"
                  options={agentsList}
                  onChange={value => {
                    setValue('AgentId', value.value);
                    if (errors.AgentId) {
                      trigger();
                    }
                  }}
                  placeholder="Select Agent"
                  errors={errors.AgentId?.message}
                  defaultValue={agentsList.find(option => option.value === data?.AgentId)}
                  value={agentsList.find(value => value.value === getValues()?.AgentId)}
                />
              </div>
            )}
          />
          <Input
            label="Agent Commission"
            className="col-span-3"
            type="text"
            numberonly={true}
            maxLength={6}
            name="AgentCommission"
            requiredfield="true"
            register={register}
            placeholder="Agent Commission"
            error={errors.AgentCommission?.message}
          />
        </FormGroup>
        <FormGroup className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2 col-span-3 px-5">
          <div className="px-5 border-blue-400 bg-slate-100 shadow-2xl border-4 flex-row col-span-3 rounded-3xl text-base w-full h-full justify-between">
            <h4 className="text-white mx-10 pb-3 rounded-b-3xl mb-3 bg-blue-400 text-center">
              Customer Details
            </h4>
            <div className="flex justify-center items-center">
              <img
                width={100}
                height={100}
                alt="Customer Photo"
                className="bg-white object-fill overflow-hidden rounded-full"
                src={`http://localhost:5000/customer/${customerProfile.CustomerPhotoURL}`}
              />
            </div>
            <div className="pt-2 flex text-base font-bold">
              <span className="pt-2 text-base w-28 font-medium">Name</span>
              <span className="pt-2 text-base font-medium">{customerProfile.CustomerName}</span>
            </div>

            <div className="pt-2 flex text-base font-bold">
              <span className="pt-2 text-base w-28 font-medium">Phone</span>
              <span className="pt-2 text-base font-medium">{customerProfile.CustomerPhoneNo}</span>
            </div>
            <div className="pt-2 flex text-base font-bold">
              <span className="pt-2 text-base w-28 font-medium">Address</span>
              <Tooltip content={() => customerProfile.CustomerAddress} color="info">
                <span className="pt-2 text-base basis-3/5 truncate font-medium">
                  {customerProfile.CustomerAddress}
                </span>
              </Tooltip>
            </div>
            <div className="pt-2 flex text-base font-bold">
              <span className="pt-2 text-base w-28 font-medium">City</span>
              <span className="pt-2 text-base font-medium">{customerProfile.CityName}</span>
            </div>
          </div>
        </FormGroup>
      </FormGroup>
    );
  };
  const renderDocumentInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Document Details"
        description="Enter the Loan Document details here"
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-10">
        <Controller
          control={control}
          name="FCDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col col-span-2">
              <DatePicker
                onChange={onChange}
                selected={value}
                popperPlacement="top-start"
                dateFormat={'d MMM yyyy'}
                minDate={new Date('2010-01-01')}
                maxDate={new Date('2100-01-01')}
                inputProps={{
                  label: 'FCDate',
                }}
              />
              {errors.FCDate && (
                <span className="text-xs text-red-500">{errors.FCDate.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="PermitDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col col-span-2">
              <DatePicker
                onChange={onChange}
                selected={value}
                popperPlacement="top-start"
                dateFormat={'d MMM yyyy'}
                minDate={new Date('2010-01-01')}
                maxDate={new Date('2100-01-01')}
                inputProps={{
                  label: 'PermitDate',
                }}
              />
              {errors.PermitDate && (
                <span className="text-xs text-red-500">{errors.PermitDate.message}</span>
              )}
            </div>
          )}
        />

        <Input
          label="DocumentCharges"
          className="col-span-2"
          type="text"
          maxLength={5}
          numberonly={true}
          name="DocumentCharges"
          requiredfield="true"
          register={register}
          placeholder="Enter Documnet Charges"
          error={errors.DocumentCharges?.message}
        />
        <Controller
          control={control}
          name="Insurance"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-2 h-11 flex mt-7 justify-start pl-5 p-2 items-end">
              <Checkbox
                variant="flat"
                color="info"
                label="Insurance Available "
                labelClassName="text-base font-medium"
                value={value}
                size="lg"
                checked={value}
                onChange={() => {
                  setValue('Insurance', !getValues().Insurance);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="InsuranceDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col col-span-2">
              <DatePicker
                onChange={onChange}
                popperPlacement="top-start"
                selected={value}
                dateFormat={'d MMM yyyy'}
                minDate={new Date('2010-01-01')}
                maxDate={new Date('2100-01-01')}
                inputProps={{
                  label: 'InsuranceDate',
                }}
                required
              />
              {errors.InsuranceDate && (
                <span className="text-red-500">{errors.InsuranceDate.message}</span>
              )}
            </div>
          )}
        />
      </FormGroup>
    );
  };
  const renderLoanInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="EMI Details"
        description="Enter the Loan details here"
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-10">
        <Input
          register={register}
          label="LoanAmount"
          className="col-span-2"
          disabled={data?.LoanAmount ? true : false}
          requiredfield="true"
          prefix={<PiFileLock className="h-6 w-6 text-gray-500" />}
          type="text"
          numberonly={true}
          placeholder="Enter LoanAmount"
          name="LoanAmount"
          error={errors.LoanAmount?.message}
        />
        <Input
          label="Tenure"
          className="col-span-2"
          register={register}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (getValues().LoanStartDate && e.target.value) {
              const endDate = new Date(getValues().LoanStartDate);
              endDate.setMonth(endDate.getMonth() + parseInt(e.target.value));
              setValue('Tenure', e.target.value);
              setValue('LoanEndDate', endDate);
            }
          }}
          maxLength={3}
          prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
          type="text"
          numberonly={true}
          placeholder="Enter Tenure"
          name="Tenure"
          error={errors.Tenure?.message}
        />
        <Input
          label="Interest"
          className="col-span-2"
          type="text"
          maxLength={5}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            let formattedValue = e.target.value.replace(/[^0-9.]/g, '');
            (e.target as HTMLInputElement).value = formattedValue;
          }}
          name="Interest"
          suffix="%"
          requiredfield="true"
          register={register}
          placeholder="Enter Interest"
          error={errors.Interest?.message}
        />
        <Input
          register={register}
          label="CalculatedEmiAmount"
          disabled
          className="col-span-2"
          type="number"
          requiredfield="true"
          placeholder="Monthly EmiAmount"
          name="CalculatedEmiAmount"
          helperText={`Principal=${emiCall?.Principal}   Interst=${emiCall?.Interest}`}
          error={errors.CalculatedEmiAmount?.message}
        />
        <Input
          register={register}
          label="ActualEmiAmount"
          className="col-span-2"
          type="text"
          requiredfield="true"
          numberonly={true}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value);
            const interest = emiCall?.Interest;
            if (!isNaN(val) && interest) {
              const principle = val - interest;
              if (principle > 0) {
                setValue('PrincipalAmount',Math.round(principle));
              }
            }
          }}
          placeholder="Monthly ActualEmiAmount"
          name="ActualEmiAmount"
          error={errors.ActualEmiAmount?.message}
        />
        <Input
          register={register}
          label="Principal Amount"
          className="col-span-2"
          type="number"
          disabled
          requiredfield="true"
          placeholder="Principal Amount"
          name="PrincipalAmount"
          error={errors.PrincipalAmount?.message}
        />
        <Input
          register={register}
          label="InterestAmount"
          className="col-span-2"
          // value={emiCall?.Interest}
          type="number"
          disabled
          requiredfield="true"
          placeholder="Interest Amount"
          name="InterestAmount"
          error={errors.InterestAmount?.message}
        />
        <Controller
          control={control}
          name="LoanStartDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col col-span-3">
              <DatePicker
                onChange={date => {
                  if (date instanceof Date) {
                    onChange;
                    setValue('LoanStartDate', date);
                    if (getValues().Tenure !== '' && date) {
                      const endDate = new Date(date);
                      endDate.setMonth(endDate.getMonth() + parseInt(getValues().Tenure));
                      setValue('LoanEndDate', endDate);
                    }
                  }
                }}
                minDate={new Date('2024-01-01')}
                maxDate={new Date('2100-01-01')}
                selected={value}
                dateFormat={'d MMM yyyy'}
                inputProps={{
                  label: 'Loan Start Date',
                }}
                required
              />
              {errors.LoanStartDate && (
                <span className="text-red-500">{errors.LoanStartDate.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="LoanEndDate"
          render={({ field: { onChange, value, name } }) => (
            <div className="flex flex-col col-span-3">
              <DatePicker
                inputProps={{
                  label: 'Loan End Date',
                }}
                disabled
                onChange={onChange}
                selectsStart={true}
                dateFormat={'d MMM yyyy'}
                selected={value}
                required
              />
              {errors.LoanEndDate && (
                <span className="text-xs text-red-500">{errors.LoanEndDate.message}</span>
              )}
            </div>
          )}
        />
      </FormGroup>
    );
  };
  const renderAccountInfo: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Account Settings"
        description="Enter the Account details here"
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-5">
        <Controller
          control={control}
          name="Endosement"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="Endosement ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('Endosement', !getValues().Endosement);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="OriginalRC"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="OriginalRC ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('OriginalRC', !getValues().OriginalRC);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="DuplicateKey"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="DuplicateKey ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('DuplicateKey', !getValues().DuplicateKey);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="OtherDocument"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="OtherDocuments ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('OtherDocument', !getValues().OtherDocument);
                }}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="IsActive"
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex pl-8 p-2 items-center">
              <Checkbox
                variant="flat"
                color="info"
                label="Loan IsActive ?"
                labelClassName="text-base font-medium"
                value={value}
                checked={value}
                onChange={() => {
                  setValue('IsActive', !getValues().IsActive);
                }}
              />
            </div>
          )}
        />
      </FormGroup>
    );
  };

  const renderFileUpLoad: renderProbs = (control, getValues, errors, register, setValue) => {
    return (
      <FormGroup
        title="Document File Uploader"
        description=""
        className="pt-1 @2xl:pt-1 @3xl:grid-cols-6 @3xl:pt-2"
        childrenclass="@2xl:grid-cols-5">
        {/* <ImportFileUploader label="Vehicle Document" /> */}
        <div className="@3xl:col-span-2">
          <UploadZone
            name="portfolios"
            getValues={getValues}
            label="Proof Document"
            setValue={setValue}
            error={errors?.portfolios?.message as string}
          />
        </div>
        <div className="@3xl:col-span-2">
          <UploadZone
            name="portfolios"
            getValues={getValues}
            setValue={setValue}
            label="Vehicle Document"
            error={errors?.portfolios?.message as string}
          />
        </div>
        {/* <ImportFileUploader label="Proof Document" /> */}
      </FormGroup>
    );
  };
  return (
    <SimpleBar className={data ? 'h-[calc(93%)]' : 'h-full'}>
      <div className="px-5">
        <Form<LoanFormFieldTypes>
          validationSchema={LoanFormSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
            defaultValues: isEdit
              ? {
                  ...data,
                  FCDate: data.FCDate ? new Date(data.FCDate) : null,
                  LoanStartDate: data.LoanStartDate ? new Date(data.LoanStartDate) : null,
                  LoanEndDate: data.LoanEndDate ? new Date(data.LoanEndDate) : null,
                  InsuranceDate: data.InsuranceDate ? new Date(data.InsuranceDate) : null,
                  PermitDate: data.PermitDate ? new Date(data.PermitDate) : null,
                }
              : LoanFormDefaultValues,
          }}>
          {({ register, control, setValue, getValues, trigger, formState: { errors } }) => {
            useEffect(() => {
              if (!data) {
                setValue('BranchId', branchOpt[0]?.value);
                setValue('LoanType', loanType[0]?.value);
              }
            }, [branchOpt, loanType]);
            useEffect(() => {
              if (emiCall?.Interest) {
                setValue('InterestAmount', Math.round(emiCall?.Interest));
              }
            }, [emiCall]);

            setInterval(() => {
              if (getValues().LoanAmount && getValues().Interest && getValues().Tenure) {
                const emi = calculateEMI(
                  getValues().LoanAmount,
                  getValues().Interest,
                  getValues().Tenure,
                );
                if (emi !== null && emi !== undefined) {
                  const truncatedEmi = parseFloat(parseFloat(emi.toString()).toFixed(2));
                  setValue('CalculatedEmiAmount', truncatedEmi);
                }
              }
            }, 300);
            return (
              <>
                {!data && (
                  <Title className="text-violet-700 text-center text-xl font-medium">
                    Create New Loan
                  </Title>
                )}
                <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                  {renderVahicleInfo(control, getValues, errors, register, setValue, trigger)}
                  {renderLoanInfo(control, getValues, errors, register, setValue)}
                  {renderDocumentInfo(control, getValues, errors, register, setValue)}
                  {renderAccountInfo(control, getValues, errors, register, setValue)}
                  {renderFileUpLoad(control, getValues, errors, register, setValue)}
                </div>
                <FormFooter
                  updateDisable={
                    data?.LoanStartDate
                      ? (Date.now() - new Date(data?.LoanStartDate).getTime()) /
                          (1000 * 60 * 60 * 24) >
                        48
                      : false
                  }
                  delBtnText={data ? 'Delete' : ''}
                  handleAltBtn={() => (data ? closeDrawer() : navigate(-1))}
                  handleDelBtn={() => handleDelete(data.LoanId)}
                  altBtnText={'Cancel'}
                  submitBtnText={data ? 'Update' : 'Create'}
                />
              </>
            );
          }}
        </Form>
        {(loading || getCustomerLoading) && <CenterSpinner />}
      </div>
    </SimpleBar>
  );
}
