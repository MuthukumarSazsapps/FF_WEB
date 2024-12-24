import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import { Loan, LoanFormFieldTypes } from 'utils/types';

const listAllLoans = async (SubscriberId: string, BranchId: string) => {
  const response = await axiosInstance
    .post(APIRoutes.loanList, { SubscriberId, BranchId })
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const createLoan = async (
  CreatedBy: string,
  SubscriberId: string,
  LoanData: LoanFormFieldTypes,
): Promise<Loan> => {
  const formData = new FormData();
  formData.append('SubscriberId', SubscriberId);
  formData.append('BranchId', LoanData.BranchId || '');
  formData.append('CustomerId', LoanData.CustomerId || '');
  formData.append('RegisterNumber', LoanData.RegisterNumber || '');
  formData.append('ShowRoomId', LoanData.ShowRoomId || '');
  formData.append('VehicleTypeId', LoanData.VehicleTypeId || '');
  formData.append('MadeYear', LoanData.MadeYear?.toString() || '');
  formData.append('LoanNo', LoanData.LoanNo?.toString() || '');
  formData.append('LoanType', LoanData.LoanType || '');
  formData.append('Tenure', LoanData.Tenure?.toString() || '');
  formData.append('CalculatedEmiAmount', LoanData.CalculatedEmiAmount.toString() || '');
  formData.append('ActualEmiAmount', LoanData.ActualEmiAmount.toString() || '');
  formData.append('PrincipalAmount', LoanData.PrincipalAmount?.toString() || '');
  formData.append('InterestAmount', LoanData.InterestAmount?.toString() || '');
  formData.append('InsuranceDate', LoanData.InsuranceDate || '');
  formData.append('PermitDate', LoanData.PermitDate || '');
  formData.append('LoanStartDate', LoanData.LoanStartDate || '');
  formData.append('LoanEndDate', LoanData.LoanEndDate || '');
  formData.append('AgentId', LoanData.AgentId || '');
  formData.append('AgentCommission', LoanData.AgentCommission?.toString() || '');
  formData.append('DocumentCharges', LoanData.DocumentCharges?.toString() || '');
  formData.append('FCDate', LoanData.FCDate || '');
  formData.append('OriginalRC', LoanData.OriginalRC.toString());
  formData.append('OtherDocument', LoanData.OtherDocument.toString());
  formData.append('Endosement', LoanData.Endosement.toString());
  formData.append('DuplicateKey', LoanData.DuplicateKey?.toString());
  formData.append('Insurance', LoanData.Insurance?.toString());
  formData.append('Interest', LoanData.Interest?.toString() || '');
  formData.append('IsActive', LoanData.IsActive?.toString());
  formData.append('LoanAmount', LoanData.LoanAmount?.toString() || '');
  formData.append('CreatedBy', CreatedBy);

  const photoURL = LoanData.VehiclePhotoURL || '';
  if (photoURL) {
    try {
      const blob = await fetch(photoURL).then(r => r.blob());
      const myFile = new File([blob], `${Date.now()}.${blob.type.split('/').pop()}`, {
        type: blob.type,
      });
      formData.append('VehiclePhotoURL', myFile);
    } catch (error) {
      console.warn('Failed to fetch VehiclePhotoURL:', error);
      formData.append('VehiclePhotoURL', '');
    }
  } else {
    formData.append('VehiclePhotoURL', '');
  }

  const documentURL = LoanData.VehicleDocsURL || '';
  if (documentURL) {
    try {
      const blob = await fetch(documentURL).then(r => r.blob());
      const myFile = new File([blob], `${Date.now()}.${blob.type.split('/').pop()}`, {
        type: blob.type,
      });
      formData.append('VehicleDocsURL', myFile);
    } catch (error) {
      console.warn('Failed to fetch VehicleDocsURL:', error);
      formData.append('VehicleDocsURL', '');
    }
  } else {
    formData.append('VehicleDocsURL', '');
  }
  //API Call
  try {
    const response = await axiosInstance.post(APIRoutes.loanCreate, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.message;
  } catch (error) {
    console.error('Create API error:', error);
    throw error;
  }
  // const response = await axiosInstance
  //   .post(APIRoutes.loanCreate, formData)
  //   .then((result) => result.data)
  //   .catch((err) => {
  //     console.error('Create Api error', err);
  //     return null;
  //   });

  // return response?.message || null;
};

const updateLoan = async (
  LoanId: string,
  ModifiedBy: string,
  updateData: LoanFormFieldTypes,
): Promise<Loan> => {
  const formData = new FormData();

  formData.append('BranchId', updateData.BranchId || '');
  formData.append('CustomerId', updateData.CustomerId || '');
  formData.append('RegisterNumber', updateData.RegisterNumber || '');
  formData.append('ShowRoomId', updateData.ShowRoomId || '');
  formData.append('VehicleTypeId', updateData.VehicleTypeId || '');
  formData.append('MadeYear', updateData.MadeYear?.toString() || '');
  formData.append('LoanNo', updateData.LoanNo?.toString() || '');
  formData.append('LoanType', updateData.LoanType || '');
  formData.append('Tenure', updateData.Tenure?.toString() || '');
  formData.append('CalculatedEmiAmount', updateData.CalculatedEmiAmount.toString() || '');
  formData.append('ActualEmiAmount', updateData.ActualEmiAmount.toString() || '');
  formData.append('PrincipalAmount', updateData.PrincipalAmount?.toString() || '');
  formData.append('InterestAmount', updateData.InterestAmount?.toString() || '');
  formData.append('InsuranceDate', updateData.InsuranceDate || '');
  formData.append('PermitDate', updateData.PermitDate || '');
  formData.append('LoanStartDate', updateData.LoanStartDate || '');
  formData.append('LoanEndDate', updateData.LoanEndDate || '');
  formData.append('AgentId', updateData.AgentId || '');
  formData.append('AgentCommission', updateData.AgentCommission?.toString() || '');
  formData.append('DocumentCharges', updateData.DocumentCharges?.toString() || '');
  formData.append('FCDate', updateData.FCDate || '');
  formData.append('OriginalRC', updateData.OriginalRC.toString());
  formData.append('OtherDocument', updateData.OtherDocument.toString());
  formData.append('Endosement', updateData.Endosement.toString());
  formData.append('DuplicateKey', updateData.DuplicateKey?.toString());
  formData.append('Insurance', updateData.Insurance?.toString());
  formData.append('Interest', updateData.Interest?.toString() || '');
  formData.append('IsActive', updateData.IsActive?.toString());
  formData.append('LoanAmount', updateData.LoanAmount?.toString() || '');
  formData.append('ModifiedBy', ModifiedBy);

  const photoURL = updateData.VehiclePhotoURL || '';
  if (photoURL) {
    try {
      const blob = await fetch(photoURL).then(r => r.blob());
      const myFile = new File([blob], `${Date.now()}.${blob.type.split('/').pop()}`, {
        type: blob.type,
      });
      formData.append('VehiclePhotoURL', myFile);
    } catch (error) {
      console.warn('Failed to fetch VehiclePhotoURL:', error);
      formData.append('VehiclePhotoURL', '');
    }
  } else {
    formData.append('VehiclePhotoURL', '');
  }

  const documentURL = updateData.VehicleDocsURL || '';
  if (documentURL) {
    try {
      const blob = await fetch(documentURL).then(r => r.blob());
      const myFile = new File([blob], `${Date.now()}.${blob.type.split('/').pop()}`, {
        type: blob.type,
      });
      formData.append('VehicleDocsURL', myFile);
    } catch (error) {
      console.warn('Failed to fetch VehicleDocsURL:', error);
      formData.append('VehicleDocsURL', '');
    }
  } else {
    formData.append('VehicleDocsURL', '');
  }
  //API Call
  try {
    const response = await axiosInstance.put(`${APIRoutes.loanUpdate}/${LoanId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.message;
  } catch (error) {
    console.error('Create API error:', error);
    throw error;
  }

  // const response = await axiosInstance
  //   .put(`${APIRoutes.loanUpdate}/${LoanId}`, updateData)
  //   .then(result => result.data)
  //   .catch(err => {
  //     console.log('Update Api error', err);
  //     return;
  //   });
  // return response?.message;
};

const deleteLoan = async (LoanId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.loanDelete}/${LoanId}`, {
      data: {
        ModifiedBy: ModifiedBy,
      },
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllLoans,
  createLoan,
  deleteLoan,
  updateLoan,
};
