import { useState } from 'react';

type UseProfileCardResponse = {
  isLoadingProfileCard: boolean;
  profileCardData: string;
  profileCardDataAction: (id: string) => Promise<void>;
};

const useProfileCardMutation =
  (): UseProfileCardResponse => {
    const [isLoading, setIsLoading] = useState(false);
    const [profileCardData, setProfileCardData] =
      useState<string>('');

    const action = async (id: string) => {
      setIsLoading(true);
      await new Promise(r => {
        setTimeout(r, 3000); // NOTE - 실제로는 fetch를 사용하여 데이터를 가져오는 시간이 걸린다고 가정
      });
      setProfileCardData(id);
      setIsLoading(false);
    };

    return {
      isLoadingProfileCard: isLoading,
      profileCardData,
      profileCardDataAction: action,
    };
  };

export default useProfileCardMutation;
