import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styles/giphy.module.css";

function Giphy({ handleSelected }: any) {
  const [gifs, setGif] = useState<any>([]);
  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState(10);
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
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
        <div className={styles.gridContainer}>
          <div className={styles.gridList}>
            {gifs.map((item: any) => {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt="giphy"
                key={`giphy-${item.id}`}
                onClick={(_e) => handleSelected(item)}
                height={item.images.fixed_width_downsampled.height}
                width={item.images.fixed_width_downsampled.width}
                src={item.images.fixed_width_downsampled.url}
                className={styles.image}
              />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Giphy;
