import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useSetSearchParams = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const generateQueryParams = (additionalParams: Record<string, string>) => {
    return {
      ...Object.fromEntries(searchParams.entries()), // 이전에 선택한 queryparams 유지
      ...additionalParams,
    };
  };

  const setSearchParams = ({
    path: customPath,
    params,
  }: {
    path?: string;
    params: Record<string, string>;
  }) => {
    const latestParams = generateQueryParams(params);

    const resultPaths = `${customPath || path}?${new URLSearchParams(latestParams).toString()}`;

    router.replace(resultPaths);
  };
  return { path, searchParams, generateQueryParams, setSearchParams };
};
