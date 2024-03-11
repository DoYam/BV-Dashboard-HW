import s from './index.module.scss';
import { TokenTransferStatus } from '@/libs/types';

export interface StatusProps {
  status: TokenTransferStatus;
}

export default function Status({ status }: StatusProps) {
  return (
    <div className={s.status_container}>
      {status === 'DEPOSIT' ? (
        <div className={s.status_deposit}>{'입금'}</div>
      ) : (
        <div className={s.status_withdraw}>{'출금'}</div>
      )}
    </div>
  );
}
