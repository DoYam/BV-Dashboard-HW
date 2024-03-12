import Address from '@/components/atoms/dashboard/Address';
import AddressStatus from '@/components/atoms/dashboard/AddressStatus';
import Asset from '@/components/atoms/dashboard/Asset';
import Date from '@/components/atoms/dashboard/Date';
import Status from '@/components/atoms/dashboard/Status';
import { TokenTransferStatus } from '@/libs/types';

export interface SingleTransactionInfoProps {
  assetAddress: string;
  symbol: string;
  name: string;
  targetAddress: string;
  status: TokenTransferStatus;
  amount: string;
  timestamp: number;
}

export default function SingleTransactionInfo(props: SingleTransactionInfoProps) {
  return (
    <div>
      <Asset address={props.assetAddress} symbol={props.symbol} name={props.name}></Asset>
      <AddressStatus address={props.assetAddress} status={props.status}></AddressStatus>
      <Date timestamp={props.timestamp}></Date>
    </div>
  );
}
