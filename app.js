"use strict";
const { Post, Comment } = require("./models");

(async () => {
  try {
    const post = await Post.create({
      title: "测试帖子1",
      body: "测试帖子1内容",
    });
    const comment = await Comment.create({
      body: "我来评论啦",
      postId: post.id,
    });
    const post2 = await comment.getPost();
    console.log(`来自 Post#${post2.id} 的评论：${comment.body}`);
    // await comment.destroy();
    // await post2.destroy();

    let posts = await Post.findAll({
      where: {
        title: "测试帖子1",
      },
      include: [Comment],
    });
    for (const post of posts) {
      console.log(`${post.id} | ${post.title}`);
      // const comments = await post.getComments(); // 会重新回表查询
      const comments = post.Comments; // 这个才能复用 include 的特性
      comments.forEach((comment) => {
        console.log("\tComment: " + comment.body);
      });
    }
  } catch (error) {
    console.log(error);
  }
})();
