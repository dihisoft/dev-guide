import { Converter } from '@/utils/converter';

/**
 * NOTE 서버 컴포넌트에서 사용하는 API 모음
 *
 * 해당 함수에서 데이터 변환까지 해서 클라이언트 컴포넌트가 데이터를 바로 활용할 수 있도록 해준다.
 *
 */

type Repo = {
  id: string;
  name: string;
  comment: string;
};

// TODO - Converter가 필요 없을 때, getIdList() 형태로 호출할 수 있도록 수정해야함
export const getRepoList = async <Output,>(
  converter: Converter<Repo, Output>,
): Promise<Output[]> => {
  const res = await fetch(
    'https://api.github.com/users/xiaotian/repos',
  );
  await new Promise(r => {
    setTimeout(r, 5000); // NOTE - 실제로는 fetch를 사용하여 데이터를 가져오는 시간이 걸린다고 가정
  });

  const repoList = (await res.json()) as Array<Repo>;

  const entity = repoList.map(converter);

  return entity;
};
