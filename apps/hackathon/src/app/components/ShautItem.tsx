import { ShautMessage } from '@sakkaku-web/core';
import {
  differenceInHours,
  differenceInMinutes,
  format,
  formatDuration,
} from 'date-fns';
import { differenceInDays, differenceInSeconds } from 'date-fns/esm';
import { ReactComponent as DefaultProfilePicture } from '../../assets/person-circle.svg';

interface ShautItemProps {
  item: ShautMessage;
}

function ShautItem({ item }: ShautItemProps) {
  const getTimeAgo = () => {
    const start = new Date();
    const end = new Date(item.time);

    const secDiff = differenceInSeconds(start, end);
    if (secDiff === 0) {
      return '0 seconds';
    }

    if (secDiff >= 60) {
      const minDiff = differenceInMinutes(start, end);
      if (minDiff >= 60) {
        const hourDiff = differenceInHours(start, end);
        if (hourDiff >= 24) {
          const daysDiff = differenceInDays(start, end);
          return formatDuration({ days: daysDiff });
        }
        return formatDuration({ hours: hourDiff });
      }
      return formatDuration({ minutes: minDiff });
    }
    return formatDuration({ seconds: secDiff });
  };

  return (
    <div className="border-b border-gray-500 p-2">
      <div className="grid grid-cols-6">
        <div className="grid justify-center">
          <DefaultProfilePicture className="h-10 w-10" />
        </div>
        <div className="col-start-2 col-end-7 flex flex-col gap-1">
          <p className="text-lg font-bold leading-none">{item.user}</p>
          <p className="break-word leading-[1.2]">{item.text}</p>
          <div className="flex justify-end">
            <p
              className="text-right text-xs text-gray-500"
              title={format(new Date(item.time), 'dd.M.yyyy HH:mm')}
            >
              {getTimeAgo() + ' ago'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShautItem;
