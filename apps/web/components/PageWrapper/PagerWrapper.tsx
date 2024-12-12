import { useHandleAuthState, useSetLanguage, useSetTheme } from "@repo/ui";
import { PageWrapperProps } from "./PageWrapper.types";

export const PageWrapper = ({ children }: PageWrapperProps) => {
  useSetLanguage();
  useSetTheme();
  useHandleAuthState();

  return <div className="pageContainer">{children}</div>;
};
