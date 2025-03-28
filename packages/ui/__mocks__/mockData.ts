import { LANGUAGE } from "../src/constants/lang";
import { THEME_MODE } from "../src/constants/theme";
import {
  ACTION_STATUS,
  AppState,
  AUTH_MODAL_TYPES,
} from "../src/modules/App/slice.types";
import { GameState } from "../src/modules/Game/slice.types";
import { UserState } from "../src/modules/User/slice.types";

export const MOCK_GAME_STATE: GameState = {
  playersNames: ["mock name 1", "mock name 2"],
  playerName: "mock single player name",
  twoPlayerGames: [
    {
      id: 1,
      player1Name: "Player 1 1",
      player2Name: "Player 2 1",
      player1Score: 10,
      player2Score: 20,
      createdAt: "2021-10-10",
    },
    {
      id: 2,
      player1Name: "Player 1 2",
      player2Name: "Player 2 2",
      player1Score: 30,
      player2Score: 40,
      createdAt: "2021-10-11",
    },
  ],
  onePlayerGames: [
    {
      id: 1,
      name: "Game 1",
      time: 100,
      createdAt: "2021-10-10",
    },
    {
      id: 2,
      name: "Game 2",
      time: 200,
      createdAt: "2021-10-11",
    },
  ],
  onePlayerGamesStatus: ACTION_STATUS.SUCCESS,
  twoPlayerGamesStatus: ACTION_STATUS.SUCCESS,
  showPersonalGames: false,
  multiPlayerGames: [],
  multiPlayerGamesStatus: ACTION_STATUS.SUCCESS,
  cardsVanishTime: 5,
  showTripleMode: false,
};

export const MOCK_APP_STATE: AppState = {
  themeMode: THEME_MODE.light,
  language: LANGUAGE.en,
  authModal: { isVisible: false, type: AUTH_MODAL_TYPES.LOGIN },
};

export const MOCK_USER_STATE: UserState = {
  me: {
    id: "1",
    email: "mock email",
    session: {
      access_token: "mock token",
      token_type: "bearer",
      expires_in: 3600,
      expires_at: 1735647032,
      refresh_token: "ZIqfRf5sSldS3CIuf3TT7w",
      user: {
        id: "8164c8d7-52a0-4fae-859b-7a560add150e",
        aud: "authenticated",
        role: "authenticated",
        email: "",
        phone: "",
        last_sign_in_at: "2024-12-18T20:27:01.96218Z",
        app_metadata: {},
        user_metadata: {},
        identities: [],
        created_at: "2024-12-18T20:27:01.945491Z",
        updated_at: "2024-12-31T11:10:32.481227Z",
        is_anonymous: false,
      },
    },
    avatarUrl: "mock avatar",
    username: "mock username",
    isAnonymous: false,
    password: "mock password",
  },
  meStatus: ACTION_STATUS.SUCCESS,
  meUpdateStatus: ACTION_STATUS.IDLE,
};
