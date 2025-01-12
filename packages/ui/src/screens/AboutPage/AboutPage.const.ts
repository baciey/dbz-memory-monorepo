const images = [
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/expo.jpg",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/jest.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/netlify.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/next-js.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/react-native-paper.jpg",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/react-native.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/react-native-testing-library.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/redux.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/supabase.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/typescript.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/yarn.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/github.png",
  "https://iyiklcyyvmubcqjqhuhc.supabase.co/storage/v1/object/public//logos/i18next.png",
];

export const technologies = [
  { id: "react-native", name: "React Native", image: images[5] },
  { id: "expo", name: "Expo", image: images[0] },
  { id: "typescript", name: "TypeScript", image: images[9] },
  { id: "next-js", name: "Next.js", image: images[3] },
  { id: "redux", name: "Redux", image: images[7] },
  {
    id: "react-native-paper",
    name: "React Native Paper",
    image: images[4],
  },
  { id: "i18next", name: "i18next", image: images[12] },
  { id: "jest", name: "Jest", image: images[1] },
  {
    id: "react-native-testing-library",
    name: "React Native Testing Library",
    image: images[6],
  },
  { id: "supabase", name: "Supabase", image: images[8] },
  { id: "netlify", name: "Netlify", image: images[2] },
  {
    id: "yarn",
    name: "Yarn Workspaces",
    image: images[10],
  },
  { id: "github", name: "GitHub", image: images[11] },
];

export const description = `I use React Native as the core of my development process, enabling me to build cross-platform applications for iOS, Android, and web (thanks to the React Native Web package, the application is available for browsers). 

To maintain clean and scalable code, I rely on TypeScript, the ultimate choice for type-safe development. For web applications, I use Next.js. I manage complex application states with Redux, ensuring predictable data flow and scalability.

For consistent UI design and theming, I rely on React Native Paper, a robust component library built on Material Design principles. For internationalization, I use i18next, a translation library that supports dynamic language switching.

I ensure my apps are reliable and bug-free by thoroughly testing them with Jest and the React Native Testing Library. For backend needs, I depend on Supabase, which provides authentication, image storage, and database management, allowing me to focus on building features.

When deploying my Next.js web app, I use Netlify, which automates the process through GitHub integration, ensuring quick and secure builds. The same is reached with Expo EAS, when deploying to Google Play or creating preview .apk builds. My projects are organized with Yarn Workspaces, simplifying dependency management and code sharing in my monorepo structure. 

This workflow lets me write code once for mobile and web (browsers). Whole pages are imported to web and mobile, only navigation is managed separately.`;
