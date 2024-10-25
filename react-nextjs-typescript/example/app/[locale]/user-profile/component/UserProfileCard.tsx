'use client';

import { useState } from 'react';
/** NOTE
 *
 * 클라이언트 컴포넌트에서는 서버 컴포넌트에서 넘겨받은 데이터를 가공하여 화면에 렌더링한다.
 *
 * 클라이언트 컴포넌트에서는 HTML 마크업 및 비즈니스 로직을 처리한다.
 *
 * 비즈니스 로직이 복잡한 경우에는 custom hook을 사용하여 로직을 분리한다.
 *
 * 컴포넌트 내부 구현 순서는 다음과 같다.
 *
 * 1. Import
 * 2. Interface
 * 3. styled-component
 * 4. useState
 * 5. global state
 * 6. custom hooks
 * 7. useEffect
 * 8. handler
 * 9. etc
 * 10. react code
 *
 */
import styled, { css } from 'styled-components';
import useProfileCardMutation from '../hook/useProfileCardMutation';

interface UserProfileCardProps {
  idList: string[];
}

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const Box = styled.div<{ clicked: boolean }>`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  cursor: pointer;

  ${props =>
    props.clicked
      ? css`
          background-color: green;
        `
      : css`
          background-color: yellow;
        `}
`;

const UserProfileCard = ({
  idList,
}: UserProfileCardProps) => {
  const [clickedIds, setClickedIds] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    isLoadingProfileCard,
    profileCardData,
    profileCardDataAction,
  } = useProfileCardMutation();

  const handleClickBox = async (id: string) => {
    await profileCardDataAction(id);

    setClickedIds(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Layout>
      cardData : {profileCardData}
      <br />
      {isLoadingProfileCard ? 'loading' : 'complete'}
      {idList.map((id: string) => (
        <Box
          key={id}
          clicked={!!clickedIds[id]}
          onClick={() => handleClickBox(id)}
        >
          {id}
        </Box>
      ))}
    </Layout>
  );
};

export default UserProfileCard;
