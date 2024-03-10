import s from './index.module.scss';
import IconButton from '@/components/atoms/button/IconButton';
import CopyIcon from '@/public/assets/AddressAsset/ph_copy.png';
import CopyHoverIcon from '@/public/assets/AddressAsset/ph_copy.png';
import copy from 'copy-to-clipboard';

export interface AddressProps {
  address: string;
}

export const formattedAddress = (address: string) => {
  const front = address.slice(0, 6);
  const back = address.slice(-4);
  return `${front}...${back}`;
};

export default function Address({ address }: AddressProps) {
  const onClickHandler = () => {
    copy(address);
  };

  return (
    <div className={s.address_container}>
      <div className={s.address}>{formattedAddress(address)}</div>
      <IconButton icon={CopyIcon} hoverIcon={CopyHoverIcon} onClick={onClickHandler} />
    </div>
  );
}
