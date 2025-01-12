//COMPONENTS
export { ThemedButton } from "./src/components/ThemedButton";
export { ThemedView } from "./src/components/ThemedView";
export { Text } from "react-native-paper";
export { CustomSwitch } from "./src/components/CustomSwitch";
export { Loader } from "./src/components/Loader";

//MODULES
export { PaperProviderWrapper } from "./src/modules/App/PaperProviderWrapper";
export { AuthModal } from "./src/modules/App/AuthModal";
export {
  GameBoard,
  PLAYER_TURN,
  GAME_BOARD_MODE,
} from "./src/modules/Game/GameBoard";

//PAGES
export { SettingsPage } from "./src/screens/SettingsPage";
export { HomePage } from "./src/screens/HomePage";
export { StatisticsPage } from "./src/screens/StatisticsPage";
export { AboutPage } from "./src/screens/AboutPage";
export { CopyrightPage } from "./src/screens/CopyrightPage";

//REDUX
export { store, useAppDispatch, useAppSelector } from "./src/redux/store";
export { userSelectors } from "./src/modules/User/selectors";
export { gameSelectors } from "./src/modules/Game/selectors";

//HOOKS
export { useGetLanguageFromAsyncStorage } from "./src/hooks/useGetLanguageFromAsyncStorage";
export { useGetThemeFromAsyncStorage } from "./src/hooks/useGetThemeFromAsyncStorage";
export { useHandleAuthState } from "./src/hooks/useHandleAuthState";

//CONSTANTS
export { STORAGE_KEYS } from "./src/constants/storage";
export { THEME_MODE } from "./src/constants/theme";
export { ROUTES } from "./src/constants/routes";

// STYLES
export { GLOBAL_STYLES } from "./src/styles/globalStyles";

//LOCALES
export { i18n } from "./src/locales";

//UTILS
export { useTheme } from "react-native-paper";
export { capitalizeFirst } from "./src/utils/capitalizeFirst";
export { useTranslation } from "react-i18next";
export { supabase } from "./src/utils/supabase";
