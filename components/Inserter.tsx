import styles from "./Inserter.module.css";

interface Props {
  style: React.CSSProperties;
  onClickBoldButton: () => void;
}

function Inserter(props: Props) {
  return (
    <div style={props.style} className={styles.wrapper}>
      <button onClick={props.onClickBoldButton}>bold</button>
    </div>
  );
}

export default Inserter;
