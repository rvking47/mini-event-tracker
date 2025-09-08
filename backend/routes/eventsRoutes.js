import express from "express";
import verifyUser from "../middlewares/authtoken.js";
import {createEvent,  distroyEvent,  getEventById,  getEvents, getpublicEvenet, listEvent, updateEvent } from "../controllers/eventsController.js";
import { validationEventcreate } from "../utils/validation.js";

const eventsRouter=express.Router();

eventsRouter.post("/event", validationEventcreate , verifyUser, createEvent);

eventsRouter.get("/allevent", verifyUser, getEvents);
eventsRouter.get("/singalevent/:id", verifyUser, getEventById);
eventsRouter.delete("/dlevent/:id", verifyUser, distroyEvent);
eventsRouter.put("/upevent/:id", verifyUser, updateEvent);


eventsRouter.get("/publicevent/:publicId", getpublicEvenet);
eventsRouter.get("/listevent/",verifyUser ,listEvent);



export default eventsRouter;