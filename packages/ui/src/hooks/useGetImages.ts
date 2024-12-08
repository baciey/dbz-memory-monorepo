import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const useGetImages = () => {
  const [images, setImages] = useState<{
    board: string[];
    view: Record<string, string>;
  }>({
    board: [],
    view: {},
  });

  useEffect(() => {
    const fetchImages = async () => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("dbz-images").getPublicUrl("");

      const { data: boardImages, error: errr } = await supabase.storage
        .from("dbz-images")
        .list("board");

      const view = {
        logo: publicUrl + "view/logo.png",
        sonHQ: publicUrl + "view/sonHQ.png",
        sonLQ: publicUrl + "view/sonLQ.png",
        cardBack: publicUrl + "view/cardBack.jpg",
      };

      //   console.log(view, boardImages, publicUrl);
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
