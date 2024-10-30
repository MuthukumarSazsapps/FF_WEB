import { useEffect, useState } from 'react';
import { branchesCompoBox, reportCompoBox } from 'store/api/pageCompoBox';
import { searchOpt, selectOpt } from 'utils/types';
import useLocalData from './use-localData';

type UseReturn = {
  loanType: selectOpt[];
  branchOpt: selectOpt[];
  statusOpt: selectOpt[];
  genderOpt: selectOpt[];
  wheelOpt: selectOpt[];
  ledgerGroupOpt: searchOpt[];
  ledgerOpt: searchOpt[];
  ledgerTypeOpt: selectOpt[];
  cityOpt: searchOpt[];
  subCityOpt: searchOpt[];
  menuList: searchOpt[];
  stateOpt: searchOpt[];
  brandOpt: searchOpt[];
  vehicleOpt: searchOpt[];
  agentsList: searchOpt[];
  vehicleList: searchOpt[];
  showroomList: searchOpt[];
  customerList: searchOpt[];
  ledgers: searchOpt[];
  nonDisbursedLoans: searchOpt[];
  loanList: searchOpt[];
  activeLoanList: searchOpt[];
  subs: searchOpt[];
  getReport: (LoanId: string) => void;
  loanInfo: any;
  customerInfo: any;
  transactions: any;
};

interface APIFlags {
  PageName: string;
  ledgerGroup?: boolean;
}

const defaultAPIFlags: APIFlags = {
  PageName: 'Admin',
  ledgerGroup: false,
};

const useSelectBoxOptions = (apiFlags = defaultAPIFlags): UseReturn => {
  const [ledgerGroupOpt, setLedgerGroupOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [ledgerOpt, setLedgerOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);

  const [ledgerTypeOpt, setLedgerTypeOpt] = useState<selectOpt[]>([
    {
      name: '',
      value: '',
    },
  ]);

  const [statusOpt, setStatusOpt] = useState<selectOpt[]>([
    {
      name: '',
      value: '',
    },
  ]);
  const [branchOpt, setBranchOpt] = useState<selectOpt[]>([
    {
      name: '',
      value: '',
    },
  ]);
  const [genderOpt, setGenderOpt] = useState<selectOpt[]>([
    {
      name: '',
      value: '',
    },
  ]);
  const [wheelOpt, setWheelOpt] = useState<selectOpt[]>([
    {
      name: '',
      value: '',
    },
  ]);
  const [cityOpt, setCityOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [menuList, setMenuList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [stateOpt, setStateOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);

  const [subCityOpt, setSubCityOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [brandOpt, setBrandOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [vehicleOpt, setVehicleOpt] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [agentsList, setAgentsList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [vehicleList, setVehicleList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [showroomList, setShowroomList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [customerList, setCustomerList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [loanList, setLoanList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [activeLoanList, setactiveLoanList] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [loanType, setLoanType] = useState<selectOpt[]>([
    {
      name: '',
      value: '',
    },
  ]);
  const [subs, setSubs] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [nonDisbursedLoans, setNonDisbursedLoans] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [ledgers, setledgers] = useState<searchOpt[]>([
    {
      label: '',
      value: '',
    },
  ]);
  const [loanInfo, setLoanInfo] = useState<any>({});
  const [customerInfo, setCustomerInfo] = useState<any>({});
  const [transactions, setTransactions] = useState<any>([]);
  const { subscriber, branch } = useLocalData();

  useEffect(() => {
    if (apiFlags.PageName) {
      if (apiFlags.PageName === 'Admin') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox('Admin', '0', apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setCityOpt(CompoBoxOptions[1]);
          setMenuList(CompoBoxOptions[2]);
          setStateOpt(CompoBoxOptions[3]);
        })();
      }
      if (apiFlags.PageName === 'VehicleForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setBranchOpt(CompoBoxOptions[1]);
          setVehicleOpt(CompoBoxOptions[2]);
          setBrandOpt(CompoBoxOptions[3]);
          setWheelOpt(CompoBoxOptions[4]);
        })();
      }
      if (
        apiFlags.PageName === 'AgentForm' ||
        apiFlags.PageName === 'ShowRoomForm' ||
        apiFlags.PageName === 'UserForm'
      ) {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setBranchOpt(CompoBoxOptions[1]);
          setSubCityOpt(CompoBoxOptions[2]);
        })();
      }
      if (apiFlags.PageName === 'SubCityForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setBranchOpt(CompoBoxOptions[1]);
          setStateOpt(CompoBoxOptions[2]);
        })();
      }
      if (apiFlags.PageName === 'BranchForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setSubCityOpt(CompoBoxOptions[1]);
        })();
      }
      if (apiFlags.PageName === 'CustomerForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setBranchOpt(CompoBoxOptions[1]);
          setGenderOpt(CompoBoxOptions[2]);
          setSubCityOpt(CompoBoxOptions[3]);
        })();
      }
      if (apiFlags.PageName === 'LoanForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setLoanType(CompoBoxOptions[1]);
          setBranchOpt(CompoBoxOptions[2]);
          setAgentsList(CompoBoxOptions[3]);
          setVehicleList(CompoBoxOptions[4]);
          setShowroomList(CompoBoxOptions[5]);
          setCustomerList(CompoBoxOptions[6]);
        })();
      }
      if (apiFlags.PageName === 'LedgerGroupForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setBranchOpt(CompoBoxOptions[1]);
        })();
      }
      if (apiFlags.PageName === 'LedgerForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setStatusOpt(CompoBoxOptions[0]);
          setBranchOpt(CompoBoxOptions[1]);
          setLedgerGroupOpt(CompoBoxOptions[2]);
          setLedgerTypeOpt(CompoBoxOptions[3]);
        })();
      }
      if (apiFlags.PageName === 'DueEntryForm') {
        (async () => {
          const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
          setLedgerOpt(CompoBoxOptions[0]);
        })();
      }
    }
    if (apiFlags.PageName === 'CustomerStatement') {
      (async () => {
        const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
        setLoanList(CompoBoxOptions[0]);
        setactiveLoanList(CompoBoxOptions[1]);
      })();
    }
    if (apiFlags.PageName === 'SubscriberLogs') {
      (async () => {
        const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
        setSubs(CompoBoxOptions[0]);
      })();
    }
    if (apiFlags.PageName === 'PaymentScreen') {
      (async () => {
        const CompoBoxOptions = await branchesCompoBox(subscriber, branch, apiFlags.PageName);
        setNonDisbursedLoans(CompoBoxOptions[0]);
        setledgers(CompoBoxOptions[1]);
        setLedgerOpt(CompoBoxOptions[2]);
      })();
    }
  }, [apiFlags.PageName]);

  const getReport = (LoanId: string) => {
    (async () => {
      const CompoBoxOptions = await reportCompoBox(LoanId);
      setLoanInfo(CompoBoxOptions[0][0]);
      setCustomerInfo(CompoBoxOptions[1][0]);
      setTransactions(CompoBoxOptions[2]);
    })();
  };
  return {
    statusOpt,
    subs,
    ledgerOpt,
    ledgerTypeOpt,
    ledgerGroupOpt,
    branchOpt,
    cityOpt,
    subCityOpt,
    menuList,
    nonDisbursedLoans,
    stateOpt,
    genderOpt,
    brandOpt,
    wheelOpt,
    vehicleOpt,
    showroomList,
    agentsList,
    vehicleList,
    customerList,
    loanList,
    ledgers,
    loanType,
    getReport,
    activeLoanList,
    loanInfo,
    customerInfo,
    transactions,
  };
};

export default useSelectBoxOptions;
