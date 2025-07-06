export const Back = () => {
  return (
    <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => window.history.back()}>
      <img src="/icons/back.svg" alt="back" />
    </button>
  );
};