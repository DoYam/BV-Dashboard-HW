import s from './index.module.scss';

export interface DateProps {
  timestamp: number;
}

export default function Date({ timestamp }: DateProps) {
  let displayTime: string;

  if (timestamp < 60) {
    displayTime = `${timestamp}초 전`;
  } else if (timestamp < 3600) {
    displayTime = `${Math.floor(timestamp / 60)}분 전`;
  } else if (timestamp < 86400) {
    displayTime = `${Math.floor(timestamp / 3600)}시간 전`;
  } else {
    displayTime = `${Math.floor(timestamp / 86400)}일 전`;
  }
  return <div className={s.date_container}>{displayTime}</div>;
}
