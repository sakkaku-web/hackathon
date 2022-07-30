import { cloudShared } from './cloud-shared';

describe('cloudShared', () => {
  it('should work', () => {
    expect(cloudShared()).toEqual('cloud-shared');
  });
});
