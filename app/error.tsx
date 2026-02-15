'use client';

import { useEffect } from 'react';
import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import Button from "@/components/general/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <VStack fullHeight fullWidth justify="center" align="center" gap={24} style={{minHeight: '100vh', backgroundColor: 'white'}}>
      <VStack align="center" gap={8}>
        <Typo.XL color="wrong" fontWeight="bold">오류가 발생했습니다.</Typo.XL>
        <Typo.MD color="secondary" fontWeight="medium">일시적인 오류일 수 있습니다. 다시 시도해 주세요.</Typo.MD>
      </VStack>
      <Button onClick={() => reset()}>
          <Typo.MD color="inverted" fontWeight="bold">다시 시도하기</Typo.MD>
      </Button>
    </VStack>
  );
}
