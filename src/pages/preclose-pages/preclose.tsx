import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import Button from 'common/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import SazsSelect from 'common/table & form/sazs-select';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import { useEffect, useState } from 'react';
import useDue from 'hooks/use-due';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PrecloseFormDefaultValues,
  PrecloseFormFieldTypes,
  PrecloseFormSchema,
  PrecloseLoanFormDefaultValues,
  PrecloseLoanFormFieldTypes,
  PrecloseLoanFormSchema,
} from 'utils/types';
import FormGroup from 'common/table & form/form-group';
import Input from 'common/input';
import { actions, dispatch } from 'store';
import { Text, Title } from 'rizzui';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const paymentoptions = [
  {
    value: 'Cash Payment',
    label: 'Cash Payment',
  },
  {
    value: 'Online Payment',
    label: 'Online Payment',
  },
];
export default function LoanPreclosePage() {
  const { LoanId } = useParams<{ LoanId: string }>();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const { getReport, loanInfo, customerInfo, activeLoanList, loanList } = useSelectBoxOptions({
    PageName: 'CustomerStatement',
  });
  const { ledgers } = useSelectBoxOptions({ PageName: 'PaymentScreen' });
  const { dueEntryState } = useDue();
  const { precloseDetails, getPrecloseLoading, precloseLoanLoading, getPrecloseAmount } = useDue({
    preclose: true,
  });
  const { precloseState, precloseLoan } = useDue({ loanPreclose: true });
  const naviagate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedCustomer('');
    if (LoanId) {
      setSelectedCustomer(LoanId);
      setLoading(true);
      getReport(LoanId);
    }
  }, [LoanId]);

  useEffect(() => {
    if (customerInfo.CustomerName || loanInfo.LoanAmount) {
      setLoading(false);
    }
  }, [customerInfo, precloseDetails]);
  useEffect(() => {
    if (precloseState === 'Loan Closed Successfully') {
      toast.success(
        <Text as="b" className="font-semibold">
          Loan Closed Succesfully
        </Text>,
        { duration: 3000 },
      );
      naviagate('/customer/report');
    }
  }, [precloseState]);
  useEffect(() => {
    if (dueEntryState === 'Due Entry Success') {
      setLoading(true);
      getReport(loanInfo.LoanId);
    }
  }, [dueEntryState]);
  const onSubmit: SubmitHandler<PrecloseFormFieldTypes> = obj => {
    setLoading(true);
    getPrecloseAmount(obj);
  };
  const preclose: SubmitHandler<PrecloseLoanFormFieldTypes> = obj => {
    precloseLoan(obj);
  };
  return (
    <>
      <Form<PrecloseFormFieldTypes>
        validationSchema={PrecloseFormSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues: PrecloseFormDefaultValues,
        }}>
        {({ register, control, setValue, getValues, formState: { errors } }) => {
          return (
            <>
              <FormGroup
                className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
                childrenclass="grid-cols-10 items-start @2xl:grid-cols-10">
                <Controller
                  control={control}
                  name="LoanId"
                  render={({ field: { onChange } }) => (
                    <SazsSelect
                      divclass="col-span-5"
                      label="Select Customer"
                      onChange={value => {
                        setValue('LoanId', value.value);
                        setSelectedCustomer(value.value);
                        setLoading(true);
                        dispatch(actions.resetPrecloseControl());
                        getReport(value.value);
                      }}
                      options={loanList}
                      placeholder="Select Customer"
                      errors={errors.LoanId?.message}
                    />
                  )}
                />
                <Input<PrecloseFormFieldTypes>
                  label="Interest"
                  className="col-span-2"
                  type="number"
                  onChange={e => {
                    const maxLength = 5;
                    const inputValue = (e.target as HTMLInputElement).value;

                    if (inputValue.length > maxLength) {
                      (e.target as HTMLInputElement).value = inputValue.slice(0, maxLength);
                    }
                  }}
                  name="Interest"
                  suffix="%"
                  requiredfield="true"
                  register={register}
                  placeholder="Enter Interest"
                  error={errors.Interest?.message}
                />
                <Button
                  label="Validate"
                  className="dark:bg-blue-700 self-start col-span-2 mt-7"
                  color="info"
                  type="submit"
                />
              </FormGroup>
            </>
          );
        }}
      </Form>
      {!loading && selectedCustomer && customerInfo.CustomerName && (
        <>
          <div className="bg-slate-100 shadow-md font-mono shadow-blue-500/50 flex gap-5 border-2 border-blue-500 rounded-lg p-2 my-2">
            <div className="flex flex-col gap-6 text-center w-2/12 justify-center">
              <img
                width={120}
                height={120}
                alt="Customer Photo"
                className="bg-white object-contain self-center overflow-hidden rounded-full"
                src={require('../../images/profile.jpg')}
              />
              <h2 className="text-blue-700">{customerInfo.CustomerId}</h2>
            </div>
            <div className="flex flex-col  w-3/12 gap-2 w-1/5">
              <h3 className="self-center mb-3">Customer Details</h3>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Name</p>
                <p>{customerInfo.CustomerName}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">PhoneNo</p>
                <p>{customerInfo.CustomerPhoneNo}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">AltPhoneNo</p>
                <p>{customerInfo.CustomerAlternatePhoneNo || 'NA'}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Aadhaar</p>
                <p className="text-blue">{customerInfo.CustomerAADHAAR}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Address</p>
                <p>{customerInfo.CustomerAddress}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">City</p>
                <p>{customerInfo.CustomerCityName}</p>
              </div>
            </div>
            <div className="flex flex-col w-3/12 gap-2 w-1/5">
              <h3 className="self-center mb-3">Guarantor Details</h3>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">Name</p>
                <p>{customerInfo.GuarantorName}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">PhoneNo</p>
                <p>{customerInfo.GuarantorPhoneNo}</p>
              </div>
              <div className="flex gap-3">
                <p className="w-1/3 font-bold">City</p>
                <p>{customerInfo.GuarantorCityName || 'NA'}</p>
              </div>
            </div>
            {loanInfo && (
              <div className="flex flex-col w-3/12 gap-2 w-1/5">
                <h3 className="self-center mb-3">Loan Details</h3>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">VehicleName</p>
                  <p>{loanInfo.VehicleName}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">RegisterNumber</p>
                  <p className="text-blue">{loanInfo.RegisterNumber}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">LoanAmount</p>
                  <p>{loanInfo.LoanAmount}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">DocumnetCharges</p>
                  <p>{loanInfo.DocumentCharges || 'NA'}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">LoanStartDate</p>
                  <p>{new Date(loanInfo.LoanStartDate).toLocaleDateString('en-GB')}</p>
                </div>
                <div className="flex gap-3">
                  <p className="w-2/4 font-bold">Interest</p>
                  <p>{`${loanInfo.Interest} %`}</p>
                </div>
              </div>
            )}
          </div>
          {precloseDetails.PendingCapital && (
            <div className="bg-slate-100 shadow-md flex-col font-mono shadow-blue-500/50 flex gap-2 border-2 border-blue-500 rounded-lg p-2 px-5 my-2">
              <div className="flex gap-2 text-center text-base justify-around w-full">
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">LoanStartDate</p>
                  <p>{new Date(loanInfo.LoanStartDate).toLocaleDateString('en-GB')}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">TotalDays</p>
                  <p>{precloseDetails.TotalDays}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">LoanAmount</p>
                  <p>{loanInfo.LoanAmount}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">Remaining Due</p>
                  <p>{loanInfo.RemainingDue}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">Tenure</p>
                  <p>{loanInfo.Tenure}</p>
                </div>
              </div>
              <div className="flex gap-2 text-center text-base border-t p-2 justify-around w-full">
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">EmiAmount</p>
                  <p>{loanInfo.ActualEmiAmount}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">PendingEmi</p>
                  <p>{loanInfo.TotalPendingAmount}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">PaidEmiAmount</p>
                  <p>{precloseDetails.PaidEmiAmount}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">Total EmiAmount</p>
                  <p>{loanInfo.ActualEmiAmount * parseInt(loanInfo.Tenure)}</p>
                </div>
                <div className="flex-col basis-1/5 gap-3">
                  <p className="font-bold">AnyPartialEmi</p>
                  <p>{precloseDetails.AnyPartialEmi}</p>
                </div>
              </div>
            </div>
          )}
          {precloseDetails.PendingCapital && (
            <div className="shadow-md flex-col shadow-blue-500/50 flex gap-2 border-2 border-blue-500 rounded-lg p-2 px-5 my-2">
              <Form<PrecloseLoanFormFieldTypes>
                validationSchema={PrecloseLoanFormSchema}
                onSubmit={preclose}
                className="@container"
                useFormProps={{
                  mode: 'onChange',
                  defaultValues: PrecloseLoanFormDefaultValues,
                }}>
                {({ register, control, setValue, getValues, formState: { errors } }) => {
                  useEffect(() => {
                    setValue('LoanId', loanInfo.LoanId);
                    setValue('PendingCapital', parseInt(precloseDetails.PendingCapital.toString()));
                    setValue('LoanAmount', parseInt(precloseDetails.LoanAmount.toString()));
                    setValue('PendingEmi', parseInt(loanInfo.TotalPendingAmount.toString()));
                    // setValue(
                    //   'PrecloseCapital',
                    //   parseInt(precloseDetails.PrecloseCapital.toString()),
                    // );
                    // setValue(
                    //   'PrecloseInterest',
                    //   parseInt(precloseDetails.PrecloseInterest.toString()),
                    // );
                    setValue('PrecloseAmount', parseInt(precloseDetails.PrecloseAmount.toString()));
                    setValue('PaidAmount', parseInt(precloseDetails.PrecloseAmount.toString()));
                    setValue('Savings', parseInt(precloseDetails.Savings.toString()));
                  }, [precloseDetails]);
                  return (
                    <>
                      <Title className="text-center ">Payment Informations</Title>
                      <FormGroup
                        className="pt-1 @2xl:pt-3 @3xl:grid-cols-16 @3xl:pt-4"
                        childrenclass="grid-cols-6 items-start @2xl:grid-cols-6">
                        <Input<PrecloseLoanFormFieldTypes>
                          label="LoanAmount"
                          className="col-span-2"
                          type="number"
                          name="LoanAmount"
                          disabled
                          requiredfield="true"
                          register={register}
                          placeholder="Enter LoanAmount"
                          error={errors.LoanAmount?.message}
                        />
                        <Input
                          label="OutstandingCapital"
                          className="col-span-2"
                          type="number"
                          name="PendingCapital"
                          disabled
                          requiredfield="true"
                          register={register}
                          placeholder="Enter PendingCapital"
                          error={errors.PendingCapital?.message}
                        />
                        <Input
                          label="PendingEmi"
                          className="col-span-2"
                          type="number"
                          name="PendingEmi"
                          disabled
                          requiredfield="true"
                          register={register}
                          placeholder="Enter PendingEmi"
                          error={errors.PendingEmi?.message}
                        />
                        <Input
                          label="PrecloseAmount"
                          className="col-span-2"
                          type="number"
                          name="PrecloseAmount"
                          disabled
                          requiredfield="true"
                          register={register}
                          placeholder="Enter PrecloseAmount"
                          error={errors.PrecloseAmount?.message}
                        />
                        <Input
                          label="Savings"
                          className="col-span-2"
                          type="number"
                          name="Savings"
                          disabled
                          requiredfield="true"
                          register={register}
                          placeholder="Enter Savings"
                          error={errors.Savings?.message}
                        />
                        <Input
                          label="Paid Amount"
                          className="col-span-2"
                          type="number"
                          name="PaidAmount"
                          requiredfield="true"
                          register={register}
                          placeholder="Enter Paid Amount"
                          error={errors.PaidAmount?.message}
                        />
                        <Controller
                          control={control}
                          name="PaymentMethod"
                          render={({ field: { onChange } }) => (
                            <SazsSelect
                              divclass="col-span-2"
                              label="Payment Method"
                              options={ledgers}
                              onChange={value => {
                                setValue('PaymentMethod', value.value);
                              }}
                              placeholder="Select PaymentMethod"
                              errors={errors.PaymentMethod?.message}
                            />
                          )}
                        />
                        <Input
                          label="Remarks"
                          className="col-span-4"
                          type="text"
                          name="Remarks"
                          requiredfield="true"
                          register={register}
                          placeholder="Enter Remarks"
                          error={errors.Remarks?.message}
                        />
                        <div className="self-end col-start-6 col-span-1 justify-between flex gab-2">
                          <Button
                            label="Cancel"
                            className="dark:bg-blue-700 self-center"
                            color="DEFAULT"
                          />
                          <Button
                            label="Save"
                            className="dark:bg-blue-700 self-end"
                            color="info"
                            type="submit"
                          />
                        </div>
                      </FormGroup>
                    </>
                  );
                }}
              </Form>
            </div>
          )}
        </>
      )}
      {(loading || getPrecloseLoading || precloseLoanLoading) && <Spinner />}
    </>
  );
}
