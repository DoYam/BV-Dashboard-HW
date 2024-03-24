import s from './index.module.scss';
import Tab from '@/components/atoms/navbar/Tab';
import WalletConnectStatus from '@/components/atoms/navbar/WalletConnectStatus';
import { StatusToast } from '@/components/popups/Toast/StatusToast';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import { getCookie, setCookie } from '@/libs/cookie';
import { TabType } from '@/libs/types';
import { COOKIE_KEY } from '@/libs/types';
import { validateWalletNetwork } from '@/libs/validator';
import { getServerSideProps } from '@/pages/index';
import Error from '@/public/assets/Error.png';
import Success from '@/public/assets/Success.png';
import { ToastContext } from '@/store/GlobalContext';
import { WalletContext } from '@/store/GlobalContext';
import { useFetchUser } from '@graphql/client';
import { useCallback, useContext, useEffect, useState } from 'react';

/* 
  [HW 1-3] 지갑 연결 기능 개발하기
  - 아래 Header 컴포넌트에 기능을 추가하여, 지갑 연결 기능을 완성해 주세요.
*/

export default function Header() {
  const [, setToast] = useContext(ToastContext);
  const [isFetching, setIsFetching] = useState(false);
  const { wallet, connect, disconnect } = useContext(WalletContext);

  /* 
    아래 함수는 서버로부터 가져온 사용자의 자산 정보를 전역 상태(Global state)에 저장하거나, 초기화하는 함수입니다. 
    구현 시 상황에 맞게 사용해 주세요.
  */
  const { updateUserInfo, clearUserInfo } = useUpdateUserInfo();

  /* 
    아래 코드는 추가하고자 하는 자산의 검증이 완료되었을 시, 서버로 추가하고자 하는 자산 정보를 보내는 코드예요.
    fetchUser 함수를 호출하여 사용자의 자산 및 트랜잭션 현황 정보를 업데이트하고 최신 정보를 내려받을 수 있어요. 
    handleFetchUser 함수 내부에서만 호출되는 함수로, 과제 구현 시에는 handleFetchUser 함수를 사용해 주세요.
  */
  // 연결된 지갑 정보가 유효함은, 지갑 주소가 존재하며 블록체인이 Sepolia 테스트넷임을 의미해요.

  const [fetchUser] = useFetchUser({
    onCompleted: () => {
      setToast(<StatusToast icon={Success} content="지갑의 자산 정보를 가져왔어요." />);
    },
    onError: (error) => {
      console.log(error);
      setToast(<StatusToast icon={Error} content="지갑의 자산 정보를 가져오지 못했어요." />);
    },
  });

  /*
    아래 함수는 지갑이 연결되었을 시, 사용자의 자산 및 트랜잭션 정보를 업데이트하며, 업데이트 상태를 관리합니다.
  */
  const handleFetchUser = useCallback(
    async (address: string) => {
      setIsFetching(true);
      const response = await fetchUser({ variables: { input: { address } } });
      const userInfo = response.data?.fetchUser;
      updateUserInfo(userInfo!);
      setIsFetching(false);
    },
    [fetchUser, updateUserInfo]
  );

  useEffect(() => {
    setCookie(COOKIE_KEY.WALLET_ADDRESS, wallet?.accounts[0].address!, new Date(Date.now() + 1000 * 60 * 60 * 24), {});
    setCookie(COOKIE_KEY.CHAIN_ID, wallet?.chains[0].id!, new Date(Date.now() + 1000 * 60 * 60 * 24), {});
    handleFetchUser(wallet?.accounts[0]?.address!);
  }, [wallet?.accounts[0]?.address, wallet?.chains[0]?.id]);

  const handleWalletConnect = useCallback(async () => {
    if (wallet) {
      // 지갑이 연결되어 있을 경우, 연결을 해제합니다.
      await disconnect({ label: wallet.label });
    } else {
      // 지갑이 연결되어 있지 않을 경우, 연결을 시도합니다.
      const [loadedWallet] = await connect();
      try {
        const walletAddress = loadedWallet.accounts[0]?.address; // 지갑 주소 확인
        const chainId = loadedWallet.chains[0]?.id; // 체인 확인

        if (validateWalletNetwork(walletAddress, chainId)) {
          // 연결된 지갑 정보가 유효하다면 쿠키 저장
          setCookie(COOKIE_KEY.WALLET_ADDRESS, walletAddress, new Date(Date.now() + 1000 * 60 * 60 * 24), {});
          setCookie(COOKIE_KEY.CHAIN_ID, chainId, new Date(Date.now() + 1000 * 60 * 60 * 24), {});

          // const storedWalletAddress = getCookie(COOKIE_KEY.WALLET_ADDRESS, {});
          // const storedChainId = getCookie(COOKIE_KEY.CHAIN_ID, {});

          // // 쿠키에 저장된 지갑 주소 및 chainId를 확인한 후, 지갑 상태에 저장된 지갑 주소 및 chainId와 다를 시,
          // // 쿠키 정보를 업데이트하고 사용자의 자산 및 트랜잭션 정보를 최신화해 주세요.
          // if (storedWalletAddress !== walletAddress || storedChainId !== chainId) {
          //   setCookie(COOKIE_KEY.WALLET_ADDRESS, walletAddress, new Date(Date.now() + 1000 * 60 * 60 * 24), {});
          //   setCookie(COOKIE_KEY.CHAIN_ID, chainId, new Date(Date.now() + 1000 * 60 * 60 * 24), {});
          //   handleFetchUser(walletAddress);
          // }
        }

        // if (walletAddress && chainId === '0xaa36a7') {
        //   // 유효한 경우에만 fetchUser 호출
        //   handleFetchUser(walletAddress);
        // } else {
        //   console.log('Invalid wallet address or chain ID');
        // }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsFetching(false);
      }
    }
  }, [wallet, connect, disconnect]);

  return (
    <div className={s.header}>
      <div className={s.navbar}>
        <div className={s.tabs}>
          <Tab tabType={TabType.TOKEN}></Tab>
          <Tab tabType={TabType.NFT}></Tab>
        </div>
        <WalletConnectStatus
          isFetching={isFetching}
          walletAddress={wallet ? wallet.accounts[0].address : ''} // 연결된 지갑의 주소 가져오기
          chainId={wallet ? wallet.chains[0].id : ''} // 연결된 지갑의 체인 아이디 가져오기
          // chainId={'0xaa36a7'} // Sepolia Testnet의 id입니다.
          onWalletConnect={handleWalletConnect}
        />
      </div>
      <div className={s.divider_container}>
        <div className={s.divider} />
      </div>
    </div>
  );
}
