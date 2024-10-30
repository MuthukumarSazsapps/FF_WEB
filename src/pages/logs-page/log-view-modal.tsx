import { useModal } from 'hooks/use-modal';
import { ActionIcon, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';

export default function ModelView({ data }: any) {
  const { closeModal } = useModal();
  const LogData = JSON.parse(data.Data);

  return (
    <div className="w-full pb-2 rounded-3xl border-1 border-blue-400 overflow-hidden font-medium flex-col gap-3 text-sm">
      <div className="w-full pl-2 bg-blue-400 flex items-center justify-between">
        <p className="text-black p-1 text-base">{data.LogId}</p>
        <div className="rounded-bl-xl">
          <ActionIcon
            size="lg"
            variant="text"
            onClick={() => closeModal()}
            className="text-black hover:!text-grey-900">
            <PiXBold className="h-[18px] w-[18px]" />
          </ActionIcon>
        </div>
      </div>
      <div className="mx-10 overflow-hidden pb-2">
        <div className="mb-1">
          <h5 className="text-center font-mono p-1">User Details</h5>
        </div>
        <div className="px-2">
          <div className="flex flex-row flex-wrap">
            <div className="flex basis-2/4 mb-2 flex-row">
              <p className="basis-2/6">UserName </p>
              <p className="basis-4/6 underline">{data.UserName}</p>
            </div>
            <div className="flex basis-2/4 mb-2 flex-row">
              <p className="basis-2/6">DisplayName </p>
              <p className="basis-4/6 underline">{data.DisplayName}</p>
            </div>
            <div className="flex basis-2/4 mb-2 flex-row">
              <p className="basis-2/6">Event </p>
              <p className="basis-4/6 underline">{data.Event}</p>
            </div>
            <div className="flex basis-2/4 mb-2 flex-row">
              <p className="basis-2/6">ApiCall </p>
              <p className="basis-4/6 underline">{data.ApiCall}</p>
            </div>
            <div className="flex basis-2/4 mb-2 flex-row">
              <p className="basis-2/6">Result </p>
              <p className="basis-4/6 underline">{data.Result}</p>
            </div>
            <div className="flex basis-2/4 mb-2 flex-row">
              <p className="basis-2/6">Date </p>
              <p className="basis-4/6 underline">{data.CreatedOn}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10 overflow-hidden mt-1 pb-2">
        <div className="mb-1">
          <h5 className="text-center font-mono p-1">Log Data</h5>
        </div>
        <div className="px-2">
          <div className="flex flex-row flex-wrap">
            {Object.entries(LogData).map(([key, value]) => (
              <div className="flex flex-row mb-2 basis-3/6 gap-2" key={key}>
                <p className="basis-2/6">{key} </p>
                <p className="basis-4/6 underline">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
