import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

type Images = {
  board: string[];
  view: {
    logo: string;
    sonHQ: string;
    sonLQ: string;
    cardBack: string;
  };
};

export const useGetImages = (): Images => {
  const [images, setImages] = useState<Images>({
    board: [],
    view: {
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
      } = supabase.storage.from("dbz-images").getPublicUrl("");

      const { data: boardImages } = await supabase.storage
        .from("dbz-images")
        .list("board");

      const view = {
        logo: publicUrl + "view/logo.png",
        sonHQ: publicUrl + "view/sonHQ.png",
        sonLQ: publicUrl + "view/sonLQ.png",
        cardBack: publicUrl + "view/cardBack.jpg",
      };

      setImages({
        board:
          boardImages?.map((image) => publicUrl + "board/" + image.name) || [],
        view: view,
      });
    };

    fetchImages();
  }, []);

  return images;
};
