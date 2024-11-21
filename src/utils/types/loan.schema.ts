import { z } from 'zod';
import { messages } from 'config/messages';

export const LoanFormSchema = z
  .object({
    BranchId: z.string().min(1, { message: messages.branchRequired }),
    CustomerId: z.string().min(1, { message: messages.customerNameIsRequired }),
    RegisterNumber: z.string().optional(),
    ShowRoomId: z.string().min(1, { message: messages.showroomRequired }),
    VehicleTypeId: z.string().min(1, { message: messages.vehicleTypeRequired }),
    MadeYear: z.coerce.number().min(1, { message: messages.MadeYearRequired }),
    LoanNo: z.coerce.number().min(1, { message: messages.LoanNoRequired }),
    LoanType: z.string(),
    Insurance: z.boolean(),
    InsuranceDate: z.coerce.string().optional(),
    FCDate: z.coerce.string().optional(),
    PermitDate: z.coerce.string().optional(),
    OriginalRC: z.boolean(),
    DuplicateKey: z.boolean(),
    Endosement: z.boolean(),
    OtherDocument: z.boolean(),
    LoanAmount: z.coerce.number().min(1, { message: messages.LoanAmountRequired }),
    Interest: z.coerce.number().min(0, { message: messages.InterestRequired }),
    Tenure: z.coerce.number().min(1, { message: messages.TenureRequired }),
    CalculatedEmiAmount: z.coerce.number(),
    ActualEmiAmount: z.coerce.number().min(1, { message: messages.EmiAmountRequired }),
    PrincipalAmount: z.coerce.number(),
    InterestAmount: z.coerce.number(),
    LoanStartDate: z.coerce.string().min(10, { message: messages.LoanStartDateRequired }),
    LoanEndDate: z.coerce.string(),
    DocumentCharges: z.coerce.number().min(1, { message: messages.DocumentChargesRequired }),
    AgentId: z.string().optional(),
    AgentCommission: z.coerce.number().optional(),
    IsActive: z.boolean(),
  })
  .refine(
    data => {
      const minActualEmiAmount = data.CalculatedEmiAmount - 3;
      const maxActualEmiAmount = data.CalculatedEmiAmount + 3;
      return (
        data.ActualEmiAmount >= minActualEmiAmount && data.ActualEmiAmount <= maxActualEmiAmount
      );
    },
    {
      message: 'Actual EMI amount must be within 3 units of the calculated EMI amount',
      path: ['ActualEmiAmount'],
    },
  );

export type LoanFormFieldTypes = z.infer<typeof LoanFormSchema>;

export interface Loan extends LoanFormFieldTypes {
  Id?: string;
}

export const LoanFormDefaultValues = {
  BranchId: '',
  CustomerId: '',
  LoanNo: null,
  RegisterNumber: '',
  ShowRoomId: '',
  VehicleTypeId: '',
  LoanType: '',
  MadeYear: null,
  Insurance: false,
  InsuranceDate: '',
  FCDate: '',
  PermitDate: '',
  OriginalRC: false,
  DuplicateKey: false,
  Endosement: false,
  OtherDocument: false,
  LoanAmount: null,
  Interest: null,
  Tenure: null,
  CalculatedEmiAmount: null,
  ActualEmiAmount: null,
  PrincipalAmount: null,
  InterestAmount: null,
  LoanStartDate: new Date(),
  LoanEndDate: '',
  DocumentCharges: null,
  AgentId: '',
  AgentCommission: null,
  IsActive: true,
};
