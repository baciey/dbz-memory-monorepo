import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { STORAGE_BUCKET } from "../constants/database";
import { TESTING_MODE } from "../constants/config";

export type Images = {
  board: string[];
  logos: string[];
  main: {
    bgWeb: string;
    bgMobile: string;
    cardBack: string;
  };
};

export const useGetImages = (): { images: Images; publicUrl: string } => {
  const [publicUrl, setPublicUrl] = useState("");
  const [images, setImages] = useState<Images>({
    board: [],
    logos: [],
    main: {
      bgWeb: "",
      bgMobile: "",
      cardBack: "",
    },
  });

  useEffect(() => {
    const fetchImages = async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("").getPublicUrl("");

      const { data: boardImages } = await supabase.storage.from("board").list();
      const { data: logoImages } = await supabase.storage.from("logos").list();

      const boardImagesMapped =
        boardImages
          ?.filter((image) => image.metadata.size > 0)
          .map((image) => {
            return publicUrl + STORAGE_BUCKET.board + image.name;
          }) || [];

      const logoImagesMapped =
        logoImages?.map(
          (image) => publicUrl + STORAGE_BUCKET.logos + image.name,
        ) || [];

      const main = {
        bgWeb: publicUrl + STORAGE_BUCKET.main + "bgWeb.png",
        bgMobile: publicUrl + STORAGE_BUCKET.main + "bgMobile.png",
        cardBack: publicUrl + STORAGE_BUCKET.main + "cardBack.png",
      };

      setPublicUrl(publicUrl);
      const board = TESTING_MODE
        ? [
            boardImagesMapped[0],
            boardImagesMapped[1],
            boardImagesMapped[2],
            boardImagesMapped[3],
          ]
        : boardImagesMapped;
      setImages({
        board: board,
        main: main,
        logos: logoImagesMapped,
      });
    };

    fetchImages();
  }, []);

  return { images, publicUrl };
};
