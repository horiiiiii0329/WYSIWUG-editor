interface Props {
  style: React.CSSProperties;
  onClickBoldButton: () => void;
}

function Inserter(props: Props) {
  return (
    <div style={props.style}>
      <button onClick={props.onClickBoldButton}></button>
    </div>
  );
}

export default Inserter;
