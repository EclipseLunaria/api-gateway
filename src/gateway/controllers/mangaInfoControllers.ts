import { Request, Response } from "express";

const mangaSearchController = (req: Request, res: Response) => {
  const { term } = req.query;
  if (!term) {
    res.status(404).send({ message: "specify a search term" });
    return;
  }

  console.log(term);
  return res.send(term);
};

export { mangaSearchController };
