import Link from 'next/link';
import { VStack } from "@/components/general/VStack";
import Typo from "@/components/general/Typo";
import Button from "@/components/general/Button";

export default function NotFound() {
  return (
    <VStack fullHeight fullWidth justify="center" align="center" gap={24} style={{minHeight: '100vh', backgroundColor: 'white'}}>
      <VStack align="center" gap={8}>
        <Typo.XL color="primary" fontWeight="bold">404</Typo.XL>
        <Typo.LG color="secondary" fontWeight="medium">페이지를 찾을 수 없습니다.</Typo.LG>
        <Typo.SM color="secondary" fontWeight="regular">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</Typo.SM>
      </VStack>
      <Link href="/">
        <Button>
            <Typo.MD color="inverted" fontWeight="bold">홈으로 돌아가기</Typo.MD>
        </Button>
      </Link>
    </VStack>
  );
}
