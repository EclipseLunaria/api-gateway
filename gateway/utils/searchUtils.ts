const normalizeQuery = (searchTerm: string) => {
  const wsCode = " ";
  console.log("pre normalization", searchTerm);

  searchTerm = searchTerm
    .split("")
    .filter((char, index) => {
      return index === 0 || char !== wsCode || searchTerm[index - 1] !== wsCode;
    })
    .filter((char) => {
      console.log(char);
      return char !== "'";
    })
    .join("")
    .trim()
    .replace(/ /g, "_");

  console.log("post normalization: ", searchTerm);
  return searchTerm;
};

export { normalizeQuery };
