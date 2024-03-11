import Address from '../Address';
import Status from '../Status';
import s from './index.module.scss';
import { TokenTransferStatus } from '@/libs/types';

export interface AddressStatusProps {
  address: string;
  status: TokenTransferStatus;
}

export default function AddressStatus({ address, status }: AddressStatusProps) {
  return (
    <div className={s.addressstatus_container}>
      <Address address={address}></Address>
      <Status status={status}></Status>
    </div>
  );
}
