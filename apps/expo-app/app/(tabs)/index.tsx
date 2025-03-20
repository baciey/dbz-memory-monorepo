import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";
import { HomePage } from "@repo/ui";
import { useCheckAppVersion } from "@repo/ui/src/hooks/useCheckAppVersion";
import { useCallback } from "react";

export default function Home() {
  const { checkAppVersion } = useCheckAppVersion();

  useFocusEffect(
    useCallback(() => {
      checkAppVersion();
    }, [checkAppVersion]),
  );

  return (
    <ScreenWrapper>
      <HomePage />
    </ScreenWrapper>
  );
}
