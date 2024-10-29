import { Subscriber, SubscriberFormFieldTypes } from 'utils/types';
import axiosInstance from './axios';
import { APIRoutes } from 'utils';
import emailVaildate from './emailValidate';

const createSubscriber = async (
  subscriberData: SubscriberFormFieldTypes,
  CreatedBy: string,
): Promise<Subscriber> => {
  const formData = new FormData();
  // Todo: Convert it into a loop
  formData.append('SubscriberName', subscriberData.SubscriberName);
  formData.append('ShortName', subscriberData.ShortName);
  formData.append('CompanyName', subscriberData.CompanyName);
  formData.append('NoOfBranches', subscriberData.NoOfBranches);
  formData.append('Email', subscriberData.Email);
  formData.append('UserName', subscriberData.UserName);
  formData.append('MobileNo', subscriberData.MobileNo);
  formData.append('LandLineNo', subscriberData.LandLineNo ? subscriberData.LandLineNo : '');
  formData.append('Address1', subscriberData.Address1);
  formData.append('Address2', subscriberData.Address2 ? subscriberData.Address2 : '');
  formData.append('LandMark', subscriberData.LandMark ? subscriberData.LandMark : '');
  formData.append('CityId', subscriberData.CityId);
  formData.append('GstNo', subscriberData.GstNo);
  formData.append('Password', subscriberData.Password);
  formData.append('PointOfContact', subscriberData.PointOfContact);
  formData.append('ConfirmPassword', subscriberData.ConfirmPassword);
  formData.append('IsActive', subscriberData.IsActive);
  formData.append('CreatedBy', CreatedBy);
  formData.append('StartDate', subscriberData.StartDate.toISOString());
  formData.append('EndDate', subscriberData.EndDate.toISOString());
  let blob = await fetch(subscriberData.Logo).then(r => r.blob());
  const myFile = new File([blob], `${Date.now()}.${blob.type.split('/').pop()}`, {
    type: blob.type,
  });
  formData.append('Logo', myFile);
  const response = await axiosInstance
    .post(APIRoutes.subscriberCreate, formData)
    .then(result => result.data)
    .catch(err => {
      console.log('Create Api error', err);
      return;
    });
  return response.message;
};

const getSubscriber = async (email: string) => {
  try {
    const response = await axiosInstance
      .post(APIRoutes.getSubscriber, { email })
      .then(result => result.data)
      .catch(err => {
        console.log('Get Subscriber Api error', err);
        return err;
      });
    return response;
  } catch (error) {
    console.log('Error fetching subscriber:', error);
  }
};

const listAllLogs = async (data: any) => {
  const response = await axiosInstance
    .post(APIRoutes.logsList, data)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};
const listAllSubscribers = async () => {
  const response = await axiosInstance
    .get(APIRoutes.subscribersList)
    .then(result => result.data)
    .catch(err => {
      console.log('List Api error', err);
    });
  return response ?? [];
};

const deleteSubscriber = async (subscriberId: string, ModifiedBy: string) => {
  const response = await axiosInstance
    .delete(`${APIRoutes.subscriberDelete}/${subscriberId}`, {
      data: {
        ModifiedBy: ModifiedBy,
      },
    })
    .then(result => result.data)
    .catch(err => {
      console.log('Delete Api error', err);
      return;
    });
  return response?.message; // Assuming your server returns a message in the response
};

const updateSubscriber = async (
  subscriberId: string,
  updateData: SubscriberFormFieldTypes,
  sendPassword: boolean,
  ModifiedBy: string,
): Promise<Subscriber> => {
  const formData = new FormData();
  formData.append('SubscriberName', updateData.SubscriberName);
  formData.append('ShortName', updateData.ShortName);
  formData.append('CompanyName', updateData.CompanyName);
  formData.append('NoOfBranches', updateData.NoOfBranches);
  formData.append('Email', updateData.Email);
  formData.append('UserName', updateData.UserName);
  formData.append('MobileNo', updateData.MobileNo);
  formData.append('LandLineNo', updateData.LandLineNo ? updateData.LandLineNo : '');
  formData.append('Address1', updateData.Address1);
  if (updateData.Address2) {
    formData.append('Address2', updateData.Address2);
  }
  if (updateData.LandMark) {
    formData.append('LandMark', updateData.LandMark);
  }
  formData.append('CityId', updateData.CityId);
  formData.append('GstNo', updateData.GstNo);
  formData.append('Password', updateData.Password);
  formData.append('PointOfContact', updateData.PointOfContact);
  formData.append('ConfirmPassword', updateData.ConfirmPassword);
  formData.append('IsActive', updateData.IsActive);
  formData.append('ModifiedBy', ModifiedBy);
  formData.append('StartDate', updateData.StartDate.toISOString());
  formData.append('EndDate', updateData.EndDate.toISOString());
  if (updateData.Logo) {
    let blob = await fetch(updateData.Logo).then(r => r.blob());
    const myFile = new File([blob], `${Date.now()}.${blob.type.split('/').pop()}`, {
      type: blob.type,
    });
    formData.append('Logo', myFile);
  } else {
    formData.append('Logo', '');
  }
  formData.append('sendPassword', sendPassword.toString());
  const response = await axiosInstance
    .put(`${APIRoutes.subscriberUpdate}/${subscriberId}`, formData)
    .then(result => result.data)
    .catch(err => {
      console.log('Update Api error', err);
      return;
    });
  return response?.message;
};

export default {
  listAllSubscribers,
  listAllLogs,
  createSubscriber,
  deleteSubscriber,
  updateSubscriber,
  getSubscriber,
};
