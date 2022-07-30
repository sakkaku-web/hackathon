import axios from 'axios';
import { environment } from '../../environments/environment';
import { ShautMessage } from '@sakkaku-web/core';

interface ShautItemProps {
  item: ShautMessage;
}

function ShautItem({ item }: ShautItemProps) {
  return (
    <div>
      <p>{item.user}</p>
      <p>{item.text}</p>
      <p>{item.time}</p>
    </div>
  );
}

export default ShautItem;
