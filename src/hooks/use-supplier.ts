// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { actions, dispatch } from 'store';
// import { RootState } from 'store/reducers';
// import { Supplier, SupplierFormFieldTypes } from 'utils/types';
// import useLocalData from './use-localData';

// type UseSupplierReturn = {
//   allSupplier: Supplier[];
//   listLoading: boolean;
//   loading: boolean;
//   createSupplierState?: string;
//   deleteSupplierState?: string;
//   updateSupplierState?: string;
//   handleSubmit: (data: SupplierFormFieldTypes) => void;
//   handleDelete: (id: string) => void;
//   handleUpdate: (id: string, data: SupplierFormFieldTypes) => void;
// };

// interface APIFlags {
//   list?: boolean;
//   profile?: boolean;
//   create?: boolean;
//   edit?: boolean;
//   remove?: boolean;
// }

// const defaultAPIFlags: APIFlags = {
//   list: false,
//   profile: false,
//   create: false,
//   edit: false,
//   remove: false,
// };

// const useSuppliers = (apiFlags = defaultAPIFlags): UseSupplierReturn => {
//   const allSupplier = useSelector<RootState, Supplier[]>(state => state.supplier.list);
//   const listLoading = useSelector<RootState, boolean>(state => state.supplier.listAPI.loading);
//   const createLoading = useSelector<RootState, boolean>(state => state.supplier.createAPI.loading);
//   const updateLoading = useSelector<RootState, boolean>(state => state.supplier.updateAPI.loading);
//   const deleteLoading = useSelector<RootState, boolean>(state => state.supplier.deleteAPI.loading);
//   const loading = listLoading || createLoading || updateLoading || deleteLoading;
//   const { username } = useLocalData();

//   const createSupplierState = useSelector<RootState, string>(
//     state => state.supplier.createAPI.success || '',
//   );
//   const deleteSupplierState = useSelector<RootState, string>(
//     state => state.supplier.deleteAPI.success || '',
//   );
//   const updateSupplierState = useSelector<RootState, string>(
//     state => state.supplier.updateAPI.success || '',
//   );

//   useEffect(() => {
//     if (apiFlags.list) {
//       dispatch(actions.listSupplierRequest());
//     }
//   }, [createSupplierState, deleteSupplierState, updateSupplierState]);

//   const handleSubmit = (formData: SupplierFormFieldTypes) => {
//     if (apiFlags.create) {
//       dispatch(actions.createSupplierRequest({ SupplierData: formData, CreatedBy: username }));
//     }
//   };

//   const handleUpdate = (SupplierId: string, formData: SupplierFormFieldTypes) => {
//     if (apiFlags.edit) {
//       dispatch(
//         actions.updateSupplierRequest({
//             SupplierId: SupplierId,
//           updateData: formData,
//           ModifiedBy: username,
//         }),
//       );
//     }
//   };

//   const handleDelete = (SupplierId: string) => {
//     if (apiFlags.remove) {
//       dispatch(actions.deleteSupplierRequest({ SupplierId: SupplierId, ModifiedBy: username }));
//     }
//   };

//   useEffect(() => {
//     if (createSupplierState) {
//       setTimeout(() => {
//         dispatch(actions.resetCreateSupplierState());
//       }, 500);
//     }
//   }, [createSupplierState]);

//   useEffect(() => {
//     if (updateSupplierState) {
//       setTimeout(() => {
//         dispatch(actions.resetUpdateSupplierState());
//       }, 500);
//     }
//   }, [updateSupplierState]);

//   useEffect(() => {
//     if (deleteSupplierState) {
//       setTimeout(() => {
//         dispatch(actions.resetDeleteSupplierState());
//       }, 500);
//     }
//   }, [deleteSupplierState]);

//   return {
//     allsuppliers,
//     listLoading,
//     loading,
//     handleDelete,
//     deleteSupplierState,
//     createSupplierState,
//     updateSupplierState,
//     handleSubmit,
//     handleUpdate,
//   };
// };

// export default useSuppliers;
