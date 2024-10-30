import { useDrawer } from 'hooks/use-drawer';
import toast from 'react-hot-toast';
import { Text } from 'rizzui';

export const ToastSuccessMessage = (massage: string) => {
  toast.success(
    <Text as="b" className="font-semibold">
      {massage}
    </Text>,
    { duration: 3000 },
  );
};
export const ToastErrorMessage = (massage: string) => {
  toast.error(
    <Text as="b" className="font-semibold">
      {massage}
    </Text>,
    { duration: 3000 },
  );
};
