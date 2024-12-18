import { Label } from '@headlessui/react/dist/components/label/label';

const SUBSCRIBERS = '/subscribers';
const USERS = '/users';
const USERINFO = '/userinfo';
const MENUS = '/menu';
const SUBMENUS = '/submenu';
const STATE = '/state';
const CITY = '/city';
const SUBCITY = '/subcity';
const CREATE = '/create';
const LIST = '/list';
const AVATAR = '/avatar';
const UPLOAD = '/upload';
const CHECKEMAIL = '/check-email';
const DELETE = '/remove';
const UPDATE = '/update';
const GET = '/check';
const INFO = '/details';
const BRANCH = '/branch';
const AGENT = '/agent';
const SHOWROOM = '/showroom';
const CUSTOMER = '/customer';
const VEHICLE = '/vehicle';
const LOAN = '/loan';
const LEDGERGROUP = '/ledgerGroup';
const LEDGER = '/ledger';
const GETDUE = '/currentdue';
const DUEENTRY = '/due-entry';
const DUEDELETE = '/due-delete';
const REPORT = '/report';
const PENDING = '/pendingreport';
const PENDINGCAPITAL = '/pendingCapitalReport';
const DEFAULT = '/defaultreport';
const PENDINGDUE = '/pending-dues';
const PRECLOSECAL = '/preclose/calculation';
const PRECLOSE = '/preclose';
const DOCUMENTS = '/documents';
const DOCUPDATE = '/doc-update';
const LOGS = '/logs';
const DAYBOOK = '/day-report';
const GETT = '/get';
const DISBURSE = '/disburse';
const EnumMaster = '/enumMaster';

export const APIRoutes = {
  //reportss---------------
  pendingReport: REPORT + PENDING,
  pendingCapitalReport: REPORT + PENDINGCAPITAL,
  defaultReport: REPORT + DEFAULT,
  documentPendings: REPORT + DOCUMENTS,
  pendingDocsUpdate: REPORT + DOCUPDATE,
  updatePending: REPORT + UPDATE + PENDING,
  subscriberCreate: SUBSCRIBERS + CREATE,
  avatarUpload: AVATAR + UPLOAD,
  emailCheck: SUBSCRIBERS + CHECKEMAIL,
  subscribersList: SUBSCRIBERS + LIST,
  logsList: SUBSCRIBERS + LOGS,
  subscriberDelete: SUBSCRIBERS + DELETE,
  subscriberUpdate: SUBSCRIBERS + UPDATE,
  getSubscriber: SUBSCRIBERS + GET,
  userCreate: USERS + CREATE,
  userEmailCheck: USERS + CHECKEMAIL,
  usersList: USERS + LIST,
  userDelete: USERS + DELETE,
  userUpdate: USERS + UPDATE,
  getUser: USERINFO + INFO,
  menuList: MENUS + LIST,
  menuCreate: MENUS + CREATE,
  menuDelete: MENUS + DELETE,
  menuUpdate: MENUS + UPDATE,
  getMenu: MENUS + GET,
  subMenuList: SUBMENUS + LIST,
  subMenuCreate: SUBMENUS + CREATE,
  subMenuDelete: SUBMENUS + DELETE,
  subMenuUpdate: SUBMENUS + UPDATE,
  getSubMenu: SUBMENUS + GET,
  stateList: STATE + LIST,
  stateCreate: STATE + CREATE,
  stateDelete: STATE + DELETE,
  stateUpdate: STATE + UPDATE,
  getState: STATE + GET,
  //ledger group creation..........
  ledgerGroupList: LEDGERGROUP + LIST,
  LedgerGroupCreate: LEDGERGROUP + CREATE,
  getLedgerGroup: LEDGERGROUP + GET,
  ledgerGroupDelete: LEDGERGROUP + DELETE,
  ledgerGroupUpdate: LEDGERGROUP + UPDATE,
  //ledger Creation-----------
  ledgerList: LEDGER + LIST,
  LedgerCreate: LEDGER + CREATE,
  getLedger: LEDGER + GET,
  ledgerDelete: LEDGER + DELETE,
  ledgerUpdate: LEDGER + UPDATE,
  //city api callss-----------------
  cityList: CITY + LIST,
  cityCreate: CITY + CREATE,
  cityDelete: CITY + DELETE,
  cityUpdate: CITY + UPDATE,
  getCity: CITY + GET,
  citySubscriberList: SUBCITY + LIST,
  citySubscriberCreate: SUBCITY + CREATE,
  citySubscriberDelete: SUBCITY + DELETE,
  citySubscriberUpdate: SUBCITY + UPDATE,
  branchList: BRANCH + LIST,
  branchCreate: BRANCH + CREATE,
  branchDelete: BRANCH + DELETE,
  branchUpdate: BRANCH + UPDATE,
  agentList: AGENT + LIST,
  agentCreate: AGENT + CREATE,
  agentDelete: AGENT + DELETE,
  agentUpdate: AGENT + UPDATE,
  showroomList: SHOWROOM + LIST,
  showroomCreate: SHOWROOM + CREATE,
  showroomDelete: SHOWROOM + DELETE,
  showroomUpdate: SHOWROOM + UPDATE,
  customerList: CUSTOMER + LIST,
  customerGet: CUSTOMER + GETT,
  customerCreate: CUSTOMER + CREATE,
  customerDelete: CUSTOMER + DELETE,
  customerUpdate: CUSTOMER + UPDATE,
  vehicleList: VEHICLE + LIST,
  vehicleCreate: VEHICLE + CREATE,
  vehicleDelete: VEHICLE + DELETE,
  vehicleUpdate: VEHICLE + UPDATE,
  loanList: LOAN + LIST,
  loanCreate: LOAN + CREATE,
  loanDelete: LOAN + DELETE,
  loanUpdate: LOAN + UPDATE,
  currentDue: LOAN + GETDUE,
  dueEntry: LOAN + DUEENTRY,
  dueDelete: LOAN + DUEDELETE,
  pendingdueList: LOAN + PENDINGDUE,
  dayReport: LOAN + DAYBOOK,
  preclosecal: LOAN + PRECLOSECAL,
  preclose: LOAN + PRECLOSE,
  loanDisburse: LOAN + DISBURSE,
  enumMasterCreate: EnumMaster + CREATE,
};

// export const EnumMaster={
//   genderType:'Gender Type',
//   vehicleType:'Vehicle Type',
//   wheelType:'WheelType',
//   brandType:"Brand Type",
//   loanType:'loan Type',
//   ledgerGroupType:'Ledger Group Type',
//   ledgerType:'Ledger Type',
//   paymentType:'Payment Type',
// }

export const EnumMasterr = [
  {
    name: 'Gender Type',
    value: 'GenderFlags',
  },
  {
    name: 'Vehicle Type',
    value: 'VehicleFlags',
  },
  {
    name: 'Wheel Type',
    value: 'WheelFlags',
  },
  {
    name: 'Brand Type',
    value: 'BrandFlags',
  },
  {
    name: 'Ledger Group Type',
    value: 'LedgerGroupFlags',
  },
  {
    name: 'Payment Type',
    value: 'PaymentTypeFlags',
  },
  {
    name: 'Ledger Type',
    value: 'LedgerTypeFlags',
  },
  {
    name: 'Loan Type',
    value: 'LoanTypeFlags',
  },
];
