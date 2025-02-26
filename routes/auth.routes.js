import { Router } from "express";
import { signOut, signUp } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post(`/sign-up`, signUp); // Matches /api/v1/auth/sign-up
authRouter.post(`/sign-in`, signIn);  // Matches /api/v1/auth/sign-in
authRouter.post(`/sign-out`, signOut); // Matches /api/v1/auth/sign-out

export default authRouter;