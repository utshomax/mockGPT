import { Router } from "express";
import { getSympClass } from "../controllers/mock";

const routes = Router();

routes.get("/get-symp-class", async (req, res) => {
    let response =await getSympClass(req, res);
    res.send(response);
});

module.exports = routes;