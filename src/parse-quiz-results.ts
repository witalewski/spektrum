const parseScore = (line: string): number => {
  const match = line.match(/(\d+) na (\d+)/);
  if (!match || match.length < 2) {
    return 0;
  }
  const [, score, outOf] = match.map((el) => parseInt(el));
  return score / outOf;
};

const parseIntroPage = (introPage: string[]) => {
  console.log({ introPage });
  if (introPage.length < 3) {
    return { divergentScore: 0, typicalScore: 0 };
  }
  const [divergentScore, typicalScore] = introPage.slice(1, 3).map(parseScore);
  return { divergentScore, typicalScore };
};

export const parseQuizResults = (results: string[][]) => {
  console.log(
    "results",
    results,
    results.length,
    results.find((page) => page.length < 1 || page[0] !== "Aspie Quiz")
  );
  if (
    !results ||
    results.length < 1 ||
    results.find((page) => page.length < 1 || page[0] !== "Aspie Quiz")
  ) {
    return null;
  }
  const [introPage, ...categoryPages] = results;
  console.log({ introPage });
  console.log({ categoryPages });
  return parseIntroPage(introPage);
};
