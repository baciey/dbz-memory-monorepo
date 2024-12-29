import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { STORAGE_BUCKET } from "../constants/database";

type Images = {
  board: string[];
  main: {
    logo: string;
    sonHQ: string;
    sonLQ: string;
    cardBack: string;
  };
};

export const useGetImages = (): { images: Images; publicUrl: string } => {
  const [publicUrl, setPublicUrl] = useState("");
  const [images, setImages] = useState<Images>({
    board: [],
    main: {
      logo: "",
      sonHQ: "",
      sonLQ: "",
      cardBack: "",
    },
  });

  useEffect(() => {
    const fetchImages = async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("").getPublicUrl("");

      const { data: boardImages } = await supabase.storage.from("board").list();

      const main = {
        logo: publicUrl + STORAGE_BUCKET.main + "logo.png",
        sonHQ: publicUrl + STORAGE_BUCKET.main + "sonHQ.png",
        sonLQ: publicUrl + STORAGE_BUCKET.main + "sonLQ.png",
        cardBack: publicUrl + STORAGE_BUCKET.main + "cardBack.jpg",
      };

      const boardImagesMapped =
        boardImages?.map(
          (image) => publicUrl + STORAGE_BUCKET.board + image.name,
        ) || [];

      setPublicUrl(publicUrl);
      setImages({
        // board: [boardImagesMapped[0]],
        board: boardImagesMapped,
        main: main,
      });
    };

    fetchImages();
  }, []);

  return { images, publicUrl };
};
