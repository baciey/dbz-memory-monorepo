import "@testing-library/react-native/extend-expect";
import { cleanup } from "@testing-library/react-native";
import { MOCK_USER_STATE } from "./__mocks__/mockData";

afterEach(cleanup);

jest.mock("react-native-paper", () => {
  const originalModule = jest.requireActual("react-native-paper");

  return {
    ...originalModule,
    ActivityIndicator: jest.fn(() => {
      return null;
    }),
  };
});

jest.mock("@supabase/supabase-js", () => {
  return {
    createClient: jest.fn(() => ({
      auth: {
        signInWithPassword: jest.fn(() => Promise.resolve({ error: null })),
        signInAnonymously: jest.fn(() =>
          Promise.resolve({
            error: null,
            data: {
              session: MOCK_USER_STATE.me?.session,
            },
          }),
        ),
        signOut: jest.fn(() => Promise.resolve({ error: null })),
        signUp: jest.fn(() => Promise.resolve({ error: null })),
        resetPasswordForEmail: jest.fn(() => Promise.resolve({ error: null })),
        updateUser: jest.fn(() => Promise.resolve({ error: null })),
      },
      storage: {
        from: jest.fn(() => ({
          getPublicUrl: jest.fn(() => ({
            data: {
              publicUrl: "mocked-public-url",
            },
          })),
          list: jest.fn(() =>
            Promise.resolve({
              data: [
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/beerus.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/bulma.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/buu.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/frieza.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/goku.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/haiya.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/mutenroshi.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/picolo.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/pilaf.jpg",
                "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//board/vegita.jpg",
              ],
              error: null,
            }),
          ),
        })),
      },
      from: jest.fn(() => ({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn(() =>
              Promise.resolve({
                data: { id: "mocked-id", name: "Mocked Name" },
                error: null,
              }),
            ),
          }),
        }),
        insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
  };
});
