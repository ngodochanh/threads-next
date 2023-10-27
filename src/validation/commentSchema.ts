import vine from '@vinejs/vine';

export const commentSchema = vine.object({
  content: vine.string().trim().minLength(10),
  post_id: vine.number(),
  toUserId: vine.number(),
});
