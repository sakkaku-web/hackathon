import axios from 'axios';
import { useEffect, useState } from 'react';
import { environment } from '../../environments/environment';
import ShautItem from './ShautItem';
import { ShautMessage } from '@sakkaku-web/core';

interface ShautItemContainer {
  userId: string;
}

function ShautItemContainer({ userId }: ShautItemContainer) {
  const [items, setItems] = useState<ShautMessage[]>([]);
  useEffect(() => {
    axios
      .get(`${environment.url}/messages/${userId}`)
      .then((res) => setItems(res.data));
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.time + item.user}>
          <ShautItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default ShautItemContainer;
