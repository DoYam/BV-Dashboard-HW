import s from './index.module.scss';
import Header from '@/components/layouts/Header';
import Popup from '@/components/popups';
import AssetsInfo from '@/components/templates/AssetsInfo';
import TransactionsInfo from '@/components/templates/TransactionInfo';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import { getCookie } from '@/libs/cookie';
import { COOKIE_KEY } from '@/libs/types';
import { validateWalletNetwork } from '@/libs/validator';
import { FetchUserRes, fetchUser, getGraphqlClient } from '@graphql/client';
import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const walletAddress = getCookie(COOKIE_KEY.WALLET_ADDRESS, { req, res });
  const chainId = getCookie(COOKIE_KEY.CHAIN_ID, { req, res });

  if (!validateWalletNetwork(walletAddress, chainId)) {
    return {
      props: {
        userInfo: null,
      },
    };
  }

  try {
    const client = getGraphqlClient();
    const { data: fetchUserData } = await client.mutate({
      mutation: fetchUser,
      variables: {
        input: {
          address: walletAddress,
        },
      },
      fetchPolicy: 'no-cache',
    });

    const userInfo = fetchUserData?.fetchUser;
    if (!userInfo) {
      return {
        props: {
          userInfo: null,
        },
      };
    }

    return {
      props: {
        userInfo,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

export default function Home({ userInfo }: { userInfo: FetchUserRes | null }) {
  const { updateUserInfo } = useUpdateUserInfo();
  // console.log(userInfo);
  useEffect(() => {
    updateUserInfo(userInfo);
  }, [userInfo, updateUserInfo]);

  return (
    <>
      <Popup />
      <div className={s.home}>
        <Header></Header>
        <div className={s.dashboard}>
          <AssetsInfo></AssetsInfo>
          <TransactionsInfo></TransactionsInfo>
        </div>
      </div>
    </>
  );
}
