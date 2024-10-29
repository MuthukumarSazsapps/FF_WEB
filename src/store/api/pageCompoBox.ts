import axiosInstance from './axios';

export const branchesCompoBox = async (
  SubscriberId: string,
  BranchId: string,
  PageName: string,
) => {
  try {
    const response = await axiosInstance.post('/options/branches', {
      SubscriberId: SubscriberId,
      BranchId: BranchId,
      PageName: PageName,
    });
    const options = response.data;
    return options ?? [];
  } catch (error) {
    console.error('Error fetching user menus:', error);
  }
};
export const reportCompoBox = async (LoanId: string) => {
  try {
    const response = await axiosInstance.post('/options/report', {
      LoanId,
    });
    const options = response.data;
    return options ?? [];
  } catch (error) {
    console.error('Error fetching user menus:', error);
  }
};
