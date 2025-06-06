export const messages = {
  //Common Error Messages
  NoSpecialChars: 'Special Characters Not Allowed',
  userNameRequired: 'UserName required',
  mobileNoRequired: 'Mobile No required',
  mobileNoLengthMin: 'Enter Valid Mobile Numbar',
  cityIdRequired: 'City Name required',
  branchRequired: 'Branch is required',
  pincodeRequired: 'Pincode Required',
  pincodelengthRequired: 'Pincode must be 6 Digits',
  addressIsRequired: 'Address required',
  addressIsLengthMin: 'Address must be atleast 20 characters',
  firstNameRequired: 'First name is required',
  validnumber: 'Enter Vaild Number',
  //Subscriber Form Messages
  NoOfBranchesRequired: 'Branches Count is required',
  shortNameRequired: 'Short Name required',
  companyNameRequired: 'Company Name required',
  companyNameLengthMin: 'Company Name must be at least 3 characters',
  shortNameLengthMin: 'Short Name must be at least 5 characters',
  NoOfBranchesLengthMin: 'NoOfBranches must be at least 10 characters',
  gstNoRequired: 'Gst No Required',
  gstNoLength: 'GstNo must have 15 characters',
  pointOfContactRequired: 'Point Of Contact Required',
  pointOfContactLengthMin: 'Point Of Contact must be at least 6 characters',
  endDateCondition: 'End date cannot be same or earlier than start date.',
  //account details
  accountholderName: 'Accountholder name is required.',
  accountnumberrequired: 'Account number is required',
  ifsccoderequired: 'Ifsc code is required',
  branchNamerequired: 'branch name is required',
  //Menu changes
  menunameIsRequired: 'Menu Name is Required.',
  pathIsRequired: 'Path is Required.',

  //Due Entry Messages
  latedaysRequired: 'Late Days Required',
  latefeesRequired: 'Late Fees Required',
  paidamountRequired: 'Paid Amount Required',
  paymethodRequired: 'Payment Method Required',
  receiptNORequired: 'Receipt Number Required',
  receiptdateRequired: 'Receipt Date Required',
  entervalidPrecloseAmount: 'Preclose amount cannot be less the precloseCapital',
  //state messages
  stateCodeIsRequired: 'State Code is Required.',

  //Customer Form Messages
  customerNameIsRequired: 'Customer name is required',
  emailIsRequired: 'Email address required',
  customerDOBIsRequired: 'Date of Birth Required',
  invalidEmail: 'Invalid email address',
  stateIsRequired: 'State is required',
  statusIsRequired: 'Status is required',
  emailSentSuccessfully: 'Your email has been sent successfully.',
  aadhaarRequired: 'Enter Valid AADHAAR Number',
  //loan messages
  registerNumberRequired: 'Vehicle Register Number Is Required',
  Required: 'Is Required',
  showroomRequired: 'ShowRoom Is Required',
  vehicleTypeRequired: 'VehicleType Is Required',
  vehicleNameRequired: 'VehicleName Is Required',
  vehicleVariantRequired: 'VehicleType Variant Is Required',
  MadeYearRequired: 'MadeYear Is Required',
  LoanNoRequired: 'LoanNo Is Required',
  FCDateRequired: 'FCDate Is Required',
  InsuranceRequired: 'Insurance Is Required',
  PermitDateRequired: 'PermitDate Is Required',
  OriginalRCRequired: 'OriginalRC Received ?',
  DuplicateKeyRequired: 'DuplicateKey Received ?',
  EndosementRequired: 'Endosement Is Received ?',
  LoanAmountRequired: 'LoanAmount Is Required',
  InterestRequired: 'Interest of Loan Is Required',
  TenureRequired: 'Tenure Is Required',
  EmiAmountRequired: 'EmiAmount Is Required',
  LoanStartDateRequired: 'LoanStartDate Is Required',
  LoanEndDateRequired: 'LoanEndDate Is Required',
  DocumentChargesRequired: 'DocumentCharges Is Required',
  AgentIdRequired: 'Agent Is Required',
  AgentCommissionRequired: 'AgentCommission Is Required',

  // Password error Messages
  nameIsRequired: 'Name required',
  fathernameIsRequired: 'Father Name required',
  genderIsRequired: 'Gender required',

  passwordOneUppercase: `The Password must contain at least one uppercase character`,
  passwordOneLowercase: `The Password must contain at least one lowercase character`,
  passwordOneNumeric: `The password must contain at least one numerical character.`,
  passwordOneSpecialCharacter: `The password must contain at least one special character.`,
  passwordRequired: 'Password is required',
  passwordLengthMin: 'Password must be at least 6 characters',
  passwordLengthMax: `Password can't be more than 32 characters`,
  newPasswordRequired: 'New Password is required',
  newPasswordLength: 'New Password must be at least 6 characters',
  confirmPasswordRequired: 'Confirm Password is required',
  passwordsDidNotMatch: "Passwords don't match",

  //api error messages
  listSubscriberAPIFailed: 'Subscribers fetching failed',
  listSubscriberSagaFailed: 'Subscribers fetching failed',
  createSubscriberAPIFailed: 'Create Subscriber failed',
  getSubscriberAPIFailed: 'Subscriber fetching failed',
  getSubscriberSagaFailed: 'Subscriber fetching failed',
  deleteSubscriberAPIFailed: 'Subscriber Deleting Failed',
  deleteSubscriberSagaFailed: 'Subscriber Deleting Failed',

  listMenuAPIFailed: 'Menu fetching failed',
  listMenuSagaFailed: 'Menu fetching failed',
  getMenuAPIFailed: 'Subscriber fetching failed',
  getMenuSagaFailed: 'Subscriber fetching failed',
  deleteMenuAPIFailed: 'Subscriber Deleting Failed',
  deleteMenuSagaFailed: 'Subscriber Deleting Failed',

  //report Messages ---------
  pendingListAPIFailed: 'Pending List Fetching Failed...',
  pendinglistSagaFailed: 'Pending List Fetching Failed...',
  pendingCapitalListAPIFailed: 'Pending Capital List Fetching Failed...',
  pendingCapitallistSagaFailed: 'Pending Capital List Fetching Failed...',

  //Ledger---------
  ledgerGroupNameRequired: 'Ledger Group Name Required',
  selectLedgerGroupNameRequired: 'Ledger Group is Required',
  ledgerNameRequired: 'Ledger Name Required ',
  ledgerDescriptionRequired: 'Description Required',
  ledgerOpeningBalance: 'Opening Balance Required',
};
