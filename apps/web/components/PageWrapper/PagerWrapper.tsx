import { useGetIsAuthenticated, useSetLanguage, useSetTheme } from "@repo/ui";
import { PageWrapperProps } from "./PageWrapper.types";

export const PageWrapper = ({ children }: PageWrapperProps) => {
  useSetLanguage();
  useSetTheme();
  useGetIsAuthenticated();

  return <div className="pageContainer">{children}</div>;
};
