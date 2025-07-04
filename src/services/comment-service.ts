import type { Comment } from "@prisma/client";
import { db } from "../db/db";

export const getCommentById = async (commentID: string) => {
	return await db.comment.findFirst({
		where: {
			id: commentID,
		},
	});
};

export const getCommentsByPost = async (postID: string) => {
	return await db.comment.findMany({
		where: {
			id_post: postID,
		},
	});
};

export const getCommentsByUser = async (userID: string) => {
	return await db.comment.findMany({
		where: {
			id_user: userID,
		},
	});
};

export const createComment = async (comment: Comment) => {
	return await db.comment.create({
		data: comment,
	});
};
