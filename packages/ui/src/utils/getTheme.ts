import { appSelectors } from "../redux/selectors";
import { useAppSelector } from "../redux/store";

export const getTheme = () => {
  const theme = useAppSelector(appSelectors.getThemeMode);
  return theme;
};
