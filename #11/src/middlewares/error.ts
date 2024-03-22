import { Response, Request } from "express";

export function error(req: Request, res: Response): void {
  res.render("errors/404", {
    title: "404",
  });
}
