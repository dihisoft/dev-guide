'use client';

import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
`;

const SkeletonLayout = styled.div`
  padding: 20px;
`;

const SkeletonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkeletonCol = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkeletonBox = styled.div`
  background-color: #f0f0f0;
  animation: ${loading} 1.5s infinite ease-in-out;
`;

const SkeletonImageBox = styled(SkeletonBox)`
  width: 100px;
  height: 100px;
  border-radius: 10%;
`;

const SkeletonTextBox = styled(SkeletonBox)`
  height: 20px;
  &.title {
    width: 60%;
  }
  &.text {
    width: 80%;
  }
`;

const UserProfileLoading = () => (
  <SkeletonLayout>
    <SkeletonRow>
      {Array.from({ length: 20 }, (_, i) => (
        <SkeletonImageBox key={i} />
      ))}
    </SkeletonRow>
    <br />
    <SkeletonCol>
      <SkeletonTextBox className="title" />
      <SkeletonTextBox className="text" />
      <SkeletonTextBox className="text" />
    </SkeletonCol>
  </SkeletonLayout>
);

export default UserProfileLoading;
