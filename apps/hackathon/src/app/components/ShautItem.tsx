import axios from 'axios';
import { environment } from '../../environments/environment';
import { ShautMessage } from '@sakkaku-web/core';
import { format, formatDuration } from 'date-fns';
import { ReactComponent as DefaultProfilePicture } from '../../assets/person-circle.svg';

interface ShautItemProps {
  item: ShautMessage;
}

function ShautItem({ item }: ShautItemProps) {
  return (
    <div className="border-t-2 border-gray-500 p-2">
      <div className="grid grid-cols-6">
        <div className="grid justify-center">
          <DefaultProfilePicture className="h-10 w-10" />
        </div>
        <div className="col-start-2 col-end-7">
          <p className="text-lg font-bold leading-none">{item.user}</p>
          <p className="leading-[1.2]">{item.text}</p>
          <div className="flex justify-end">
            <p className="text-right text-xs text-gray-500">
              {format(new Date(item.time), 'dd.M.yyyy HH:mm')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShautItem;
