import type { Metadata } from 'next';
import UserProfileCard from './component/UserProfileCard';
import * as apiStore from './api/userProfileApi';

// NOTE - 서버 컴포넌트에서는 데이터를 fetch하고 컴포넌트에 넘겨주는 방식으로 사용한다.

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'User Profile',
};

const UserProfile = async () => {
  const idList = await apiStore.getRepoList(
    repo => repo.id,
  );

  return <UserProfileCard idList={idList} />;
};

export default UserProfile;
