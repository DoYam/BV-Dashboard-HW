import Address from '@/components/atoms/dashboard/Address';
import Amount from '@/components/atoms/dashboard/Amount';
import Asset from '@/components/atoms/dashboard/Asset';
import Status from '@/components/atoms/dashboard/Status';

export interface SingleAssetInfoProps {
  address: string;
  symbol: string;
  name: string;
  balance: string;
  isEdit: boolean;
  onSendAsset: () => void;
  onRemoveAsset: () => void;
}

export default function SingleAssetInfo(props: SingleAssetInfoProps) {
  return (
    <div>
      {/* <Address address={props.address}></Address> */}
      {/* <Amount symbol={props.symbol} balance={props.balance}></Amount> */}
      {/* <Asset address={props.address} symbol={props.symbol} name={props.name}></Asset> */}
    </div>
  );
}
