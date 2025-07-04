import express from "express";
import { getUserById, getUsers } from "../services/user-service";
import { getCommentsByUser } from "../services/comment-service";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	try {
		const users = await getUsers();
		res.json({ users: users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error toilet" });
	}
});

userRouter.post("/", async (req, res) => {
	try {
		console.log(req.body);
		res.status(201).send(req.body);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

userRouter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const user = await getUserById(id);
		if (user) {
			res.json({ user });
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

userRouter.get("/:id/comments", async (req, res) => {
	try {
		const id = req.params.id;
		const comments = await getCommentsByUser(id);
		res.json({ comments });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: (error as Error).message });
	}
});
