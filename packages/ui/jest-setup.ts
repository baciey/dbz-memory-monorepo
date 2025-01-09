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
                {
                  name: "buu.jpg",
                  id: "1f315392-50aa-4113-bd13-3316f6f48f71",
                  updated_at: "2025-01-10T15:13:00.431Z",
                  created_at: "2025-01-10T15:13:00.431Z",
                  last_accessed_at: "2025-01-10T15:13:00.431Z",
                  metadata: {
                    eTag: '"804862e03aac3beebf67713f529f1000-1"',
                    size: 70490,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T15:13:01.000Z",
                    contentLength: 70490,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "c17.jpg",
                  id: "760039ae-a26a-4036-abcc-9386357c0b3d",
                  updated_at: "2025-01-10T13:54:05.565Z",
                  created_at: "2025-01-10T13:54:05.565Z",
                  last_accessed_at: "2025-01-10T13:54:05.565Z",
                  metadata: {
                    eTag: '"7f71027aad21b56d384c48bf5550ad08-1"',
                    size: 66551,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:54:06.000Z",
                    contentLength: 66551,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "c18.jpg",
                  id: "39e96aed-841f-49de-9485-766bac1a56fc",
                  updated_at: "2025-01-10T13:54:10.104Z",
                  created_at: "2025-01-10T13:54:10.104Z",
                  last_accessed_at: "2025-01-10T13:54:10.104Z",
                  metadata: {
                    eTag: '"6f0777e0d24eb978c6c235275c270032-1"',
                    size: 118797,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:54:10.000Z",
                    contentLength: 118797,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "cell.jpg",
                  id: "965aabe1-e86f-436e-bc0d-8a6e14f7e8d5",
                  updated_at: "2025-01-10T13:54:02.421Z",
                  created_at: "2025-01-10T13:54:02.421Z",
                  last_accessed_at: "2025-01-10T13:54:02.421Z",
                  metadata: {
                    eTag: '"04314becb4775b861841d4cc8306e6a0-1"',
                    size: 123461,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:54:02.000Z",
                    contentLength: 123461,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: ".emptyFolderPlaceholder",
                  id: "903bd575-3d9d-420d-bdbc-c887cc923c00",
                  updated_at: "2025-01-10T13:53:39.638Z",
                  created_at: "2025-01-10T13:53:39.638Z",
                  last_accessed_at: "2025-01-10T13:53:39.638Z",
                  metadata: {
                    eTag: '"d41d8cd98f00b204e9800998ecf8427e"',
                    size: 0,
                    mimetype: "application/octet-stream",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:53:40.000Z",
                    contentLength: 0,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "frieza.jpg",
                  id: "931c9393-58a3-4778-8abb-4e7751fd9e09",
                  updated_at: "2025-01-10T13:54:17.461Z",
                  created_at: "2025-01-10T13:54:17.461Z",
                  last_accessed_at: "2025-01-10T13:54:17.461Z",
                  metadata: {
                    eTag: '"c1446ab3491e3516fa3915eddb8c2d3c-1"',
                    size: 66512,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:54:18.000Z",
                    contentLength: 66512,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "gohan.jpg",
                  id: "e7114816-6f26-4084-97c9-7f056524951b",
                  updated_at: "2025-01-10T13:53:52.496Z",
                  created_at: "2025-01-10T13:53:52.496Z",
                  last_accessed_at: "2025-01-10T13:53:52.496Z",
                  metadata: {
                    eTag: '"cde0702855f1d43e4c2044cc22b29382-1"',
                    size: 45340,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:53:53.000Z",
                    contentLength: 45340,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "goku.jpg",
                  id: "ef9aa902-10a9-4e52-94a7-fb6b6c88ea55",
                  updated_at: "2025-01-10T13:53:57.573Z",
                  created_at: "2025-01-10T13:53:57.573Z",
                  last_accessed_at: "2025-01-10T13:53:57.573Z",
                  metadata: {
                    eTag: '"3cec528723e24eed579bff95a1fdee5f-1"',
                    size: 139953,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:53:58.000Z",
                    contentLength: 139953,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "piccolo.jpg",
                  id: "2ee49184-3a88-499e-9735-72cf04638a1c",
                  updated_at: "2025-01-10T15:24:53.719Z",
                  created_at: "2025-01-10T15:24:53.719Z",
                  last_accessed_at: "2025-01-10T15:24:53.719Z",
                  metadata: {
                    eTag: '"451d932964df01680aa0c353c74080af-1"',
                    size: 97005,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T15:24:54.000Z",
                    contentLength: 97005,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "trunks.jpg",
                  id: "a88c79a6-562d-4635-b340-8424d88bb813",
                  updated_at: "2025-01-10T15:12:37.835Z",
                  created_at: "2025-01-10T15:12:37.835Z",
                  last_accessed_at: "2025-01-10T15:12:37.835Z",
                  metadata: {
                    eTag: '"23e7b3e292fa9afabef3a0b8c098236a-1"',
                    size: 115148,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T15:12:38.000Z",
                    contentLength: 115148,
                    httpStatusCode: 200,
                  },
                },
                {
                  name: "vegita.jpg",
                  id: "acc9c7e4-5229-4e32-a9d9-667f8a970b63",
                  updated_at: "2025-01-10T13:54:21.127Z",
                  created_at: "2025-01-10T13:54:21.127Z",
                  last_accessed_at: "2025-01-10T13:54:21.127Z",
                  metadata: {
                    eTag: '"df4226cc165113b7a00bea6b28ef55bd-1"',
                    size: 104590,
                    mimetype: "image/jpeg",
                    cacheControl: "max-age=3600",
                    lastModified: "2025-01-10T13:54:21.000Z",
                    contentLength: 104590,
                    httpStatusCode: 200,
                  },
                },
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
