//COMPONENTS
export { ThemedButton } from "./src/components/ThemedButton";
export { ThemedView } from "./src/components/ThemedView";
export { ThemedText } from "./src/components/ThemedText";
export { PaperProviderWrapper } from "./src/components/PaperProviderWrapper";
export { CustomSwitch } from "./src/components/CustomSwitch";
export {
  GameBoard,
  PLAYER_TURN,
  GAME_BOARD_MODE,
} from "./src/modules/Board/GameBoard";
export { AuthModal } from "./src/components/AuthModal";

//PAGES
export { SettingsPage } from "./src/screens/SettingsPage";
export { HomePage } from "./src/screens/HomePage";
export { StatisticsPage } from "./src/screens/StatisticsPage";

//REDUX
export { store, useAppDispatch, useAppSelector } from "./src/redux/store";
export { appActions } from "./src/redux/actions";
export { appSelectors } from "./src/redux/selectors";
export { boardSelectors } from "./src/modules/Board/selectors";
export { type AppState } from "./src/redux/slice.types";

//HOOKS
export { useSetLanguage } from "./src/hooks/useSetLanguage";
export { useSetTheme } from "./src/hooks/useSetTheme";
export { useGetUser } from "./src/hooks/useGetUser";

//CONSTANTS
export { STORAGE_KEYS } from "./src/constants/storage";
export { THEME_MODES } from "./src/constants/theme";
export { ROUTES } from "./src/constants/routes";
export { IMAGES } from "./src/constants/images";

// STYLES
export { GLOBAL_STYLES } from "./src/styles/globalStyles";

//LOCALES
export { i18nInit } from "./src/locales";

//UTILS
export { useTheme } from "react-native-paper";
export { capitalizeFirst } from "./src/utils/capitalizeFirst";
export { useTranslation } from "react-i18next";
export { supabase } from "./src/utils/supabase";
