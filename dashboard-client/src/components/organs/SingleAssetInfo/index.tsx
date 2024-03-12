import s from './index.module.scss';
import Button from '@/components/atoms/button/Button';
import Address from '@/components/atoms/dashboard/Address';
import Amount from '@/components/atoms/dashboard/Amount';
import Asset from '@/components/atoms/dashboard/Asset';

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
    <div className={s.singleAssetInfo_container}>
      <Asset address={props.address} symbol={props.symbol} name={props.name}></Asset>
      <Amount symbol={props.symbol} balance={props.balance}></Amount>
      {/* <Address address={props.address}></Address> */}
      <Button></Button>
    </div>
  );
}
