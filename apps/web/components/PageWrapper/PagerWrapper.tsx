import {
  useHandleAuthState,
  useGetLanguageFromAsyncStorage,
  useGetThemeFromAsyncStorage,
} from "@repo/ui";
import { PageWrapperProps } from "./PageWrapper.types";

export const PageWrapper = ({ children }: PageWrapperProps) => {
  useGetLanguageFromAsyncStorage();
  useGetThemeFromAsyncStorage();
  useHandleAuthState();

  return <div className="pageContainer">{children}</div>;
};
