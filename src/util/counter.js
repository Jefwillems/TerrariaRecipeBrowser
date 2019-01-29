export default (from) => {
  let count = from - 1;
  return () => {
    count += 1;
    return count;
  };
};
