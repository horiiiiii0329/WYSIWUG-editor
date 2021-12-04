/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/giphy.module.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function Giphy({ handleSelected }: any) {
  const [gifs, setGif] = useState<any>([]);
  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState(20);
  const [input_ref, setInput] = useState<any>(null);

  const onSearchSubmit = (e: any) => {
    if (e.key !== "Enter") {
      return;
    }

    const term = input_ref.value;

    search(term);
  };

  useEffect(() => {
    search("", "trend");
  }, []);

  const search = (term: any, kind = "search") => {
    const url =
      kind === "search"
        ? `https://api.giphy.com/v1/gifs/search?q=${term}`
        : `https://api.giphy.com/v1/gifs/trending?q=${term}`;
    const link = `${url}&limit=${limit}&api_key=KpSOOvXbvl7rusKvx7Axl8BFI2QjmYXY`;

    axios
      .get(link)
      .then((response) => {
        // handle success
        setGif(response.data.data);
        // console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleChange = (e: any) => {
    const term = e.target.value;
    setTerm(term);
  };

  console.log(gifs);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchbox}>
        <input
          ref={(c) => setInput(c)}
          type="text"
          placeholder={"search gif"}
          value={term}
          onChange={handleChange}
          onKeyDown={onSearchSubmit}
        />
      </div>
      <div className={styles.gridwrapper}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry columnsCount={3} gutter="10px">
            {gifs.map((item: any, index: number) => (
              // eslint-disable-next-line @next/next/no-img-element

              <img
                src={item.images.fixed_width_downsampled.url}
                alt="aaaaaaaaa"
                className={styles.image}
                key={index}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default Giphy;
