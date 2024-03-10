import s from './index.module.scss';
import OverIcon from '@/public/assets/AmountAsset/OverIcon.png';
import UnderIcon from '@/public/assets/AmountAsset/UnderIcon.png';
import Image from 'next/image';

export interface AmountProps {
  symbol: string;
  balance: string;
}

// 소수 표기 조건
const formattedBalance = (balance: string) => {
  // 문자열 -> 소수
  const bal = parseFloat(balance);

  // 정수일 경우 소수점 아래 자리 수 표기 안 함
  if (Number.isInteger(bal)) {
    return bal.toString();
  }

  // 소수일 경우 아래 4개 내림
  const formattedBal = bal.toFixed(4);

  // 0이 아닌 숫자 다음에 오는 0은 표기하지 않음
  return formattedBal.replace(/(\.[1-9]*)0+$/, '$1');
};

// 단위 7 글자 초과시
const formattedSymbol = (symbol: string) => {
  if (symbol.length > 7) {
    return symbol.substring(0, 5) + '...';
  } else {
    return symbol;
  }
};

export default function Amount({ balance, symbol }: AmountProps) {
  return (
    <div className={s.amount_container}>
      {Number(balance) > 9999999 ? (
        <Image src={OverIcon} alt="OverIcon" width={13} height={13} />
      ) : Number(balance) < 0.0001 ? (
        <Image src={UnderIcon} alt="UnderIcon" width={13} height={13} />
      ) : (
        <div />
      )}
      <div className={s.amount_balance}>{formattedBalance(balance)}</div>
      <div className={s.amount_symbol}>{formattedSymbol(symbol)}</div>
    </div>
  );
}
