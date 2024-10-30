import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from 'common/form';
import FormGroup from 'common/table & form/form-group';
import { PaymentsFormDefaultValues, PaymentsFormFieldTypes, PaymentsFormSchema } from 'utils/types';
import SazsSelect from 'common/table & form/sazs-select';
import useSelectBoxOptions from 'hooks/use-select-box-options';
import Input from 'common/input';
import { useEffect, useState } from 'react';
import { Title } from 'rizzui';
import Button from 'common/button';
import { DatePicker } from 'common/datepicker';
import usePayments from 'hooks/use-payments';
import { ToastSuccessMessage } from 'common/table & form/toastMessage';
import { useNavigate } from 'react-router-dom';
import Spinner from 'common/spinner';

export default function PaymentsForm({ data }: { data?: any }) {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const { nonDisbursedLoans, getReport, ledgers, loanInfo, customerInfo } = useSelectBoxOptions({
    PageName: 'PaymentScreen',
  });
  const [loading, setLoading] = useState(false);
  const { handleSubmit, disburseState, disburseLoading } = usePayments({ loanDisburse: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (disburseState?.includes('Successfully')) {
      ToastSuccessMessage(disburseState);
      navigate('/report/daybook');
    }
  }, [disburseState]);

  useEffect(() => {
    if (loanInfo.LoanAmount) {
      setLoading(false);
    }
  }, [customerInfo]);
  const onSubmit: SubmitHandler<PaymentsFormFieldTypes> = formData => {
    handleSubmit(formData);
  };
  return (
    <>
      <div className="flex items-end gap-3">
        <div className="basis-3/5">
          <SazsSelect
            options={nonDisbursedLoans}
            onChange={val => {
              setSelectedCustomer(val.value);
            }}
            placeholder="Select Customer"
          />
        </div>
        <div className="basis-1/5">
          <Button
            label="Validate"
            className="dark:bg-blue-700 self-end"
            color="info"
            onClick={() => {
              setLoading(true);
              getReport(selectedCustomer);
            }}
          />
        </div>
      </div>
      {!loading && selectedCustomer && loanInfo.LoanAmount && (
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
          <div className="shadow-md flex-col shadow-blue-500/50 flex gap-2 border-2 border-blue-500 flex-col flex gap-2 rounded-lg p-2 px-5 mt-6">
            <Form<PaymentsFormFieldTypes>
              validationSchema={PaymentsFormSchema}
              onSubmit={onSubmit}
              className="@container"
              useFormProps={{
                mode: 'onChange',
                defaultValues: PaymentsFormDefaultValues,
              }}>
              {({ register, control, setValue, getValues, formState: { errors } }) => {
                useEffect(() => {
                  setValue('LoanId', loanInfo.LoanId);
                  setValue('PayAmount', loanInfo.LoanAmount);
                }, [loanInfo]);
                return (
                  <>
                    <Title as="h3" className="text-center my-2">
                      Loan Disbursement
                    </Title>
                    <FormGroup
                      className="pt-1 @2xl:pt-3 @3xl:grid-cols-12 @3xl:pt-4"
                      childrenclass="@2xl:grid-cols-3">
                      <Input<PaymentsFormFieldTypes>
                        label="Pay Amount"
                        type="number"
                        disabled
                        maxLength={8}
                        register={register}
                        requiredfield="true"
                        placeholder="Enter Amount"
                        name="PayAmount"
                        error={errors.PayAmount?.message}
                      />

                      <Controller
                        control={control}
                        name="ByLedgerCode"
                        rules={{ required: 'CustomerName field is required' }} // Add required rule
                        render={({ field: { onChange } }) => {
                          return (
                            <SazsSelect
                              label="By Ledger"
                              className="col-span-1"
                              options={ledgers}
                              placeholder="Select Ledger"
                              defaultValue={ledgers.find(option => option.value === data?.StateId)}
                              onChange={value => {
                                setValue('ByLedgerCode', value.value);
                              }}
                              errors={errors.ByLedgerCode?.message}
                              value={ledgers.find(
                                value => value.value === getValues()?.ByLedgerCode,
                              )}
                            />
                          );
                        }}
                      />
                      <Controller
                        control={control}
                        name="PaymentDate"
                        render={({ field: { onChange, value, name } }) => (
                          <div className="flex flex-col col-span-1">
                            <DatePicker
                              inputProps={{
                                label: 'Payment Date',
                              }}
                              onChange={onChange}
                              selectsStart={true}
                              dateFormat={'d MMM yyyy'}
                              selected={value}
                              required
                            />
                            {errors.PaymentDate && (
                              <span className="text-xs text-red-500">
                                {errors.PaymentDate.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                      <Input
                        label="Particulars"
                        type="text"
                        disabled
                        className="col-span-1"
                        register={register}
                        requiredfield="true"
                        name="Particulars"
                        error={errors.Particulars?.message}
                      />
                      <Input
                        label="Remarks"
                        type="text"
                        className="col-span-2"
                        register={register}
                        requiredfield="true"
                        placeholder="Enter Remarks"
                        name="Remarks"
                        error={errors.Remarks?.message}
                      />
                    </FormGroup>
                    <div className="self-end col-start-6 col-span-1 justify-end gap-5 mt-2 flex">
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
                  </>
                );
              }}
            </Form>
          </div>
        </>
      )}
      {(loading || disburseLoading) && <Spinner />}
    </>
  );
}
