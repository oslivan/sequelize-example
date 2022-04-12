"use strict";
const { Op } = require("sequelize");
const { Post, Comment, sequelize } = require("./models");

// #Post
// addScope
// create
// build
// bulkCreate
// destroy
// count
// findAll
  // where:
    // [Op.like]
    // [Op.endsWith]: "abc" => LIKE "%abc"
    // [Op.startsWith]: 'abc' => LIKE "abc%"
    // [Op.substring]: 'abc' => LIKE "%abc%"
    // [Op.between]: [6, 10]
    // [Op.and]: {a: 5}
    // [Op.or]: [{a: 5}, {a: 6}]
    // [Op.ne]: 20 !=
    // [Op.not]: true
    // [Op.in]: [1,2,3]
    // [Op.is]: null
    // Op.gte/Op.lte
// findOne
// findOrBuild
// findOrCreate
// findCreateFind
// update
// upsert
// min
// max
// sum
// increment
// decrement
// getTableName
// getAttributes
// restore
// unscoped

// @post
// changed
// decrement
// increment
// destroy
// equals 判断是否等于某个 model
// equalsOneOf
// get 获取包含 getter 的值
// getDataValue 获取所有底层数据的值
// isSoftDeleted
// previous 返回更新前的旧值
// reload
// restore
// save
// set
// setDataValue 更新底层数据值，仅仅是修改，不会持久化到数据库，必须再加上 save
// toJSON
// update
// validate 根据验证规则验证 Model 实例
// where

(async () => {
  try {
    const post = await Post.create({
      title: "测试帖子1",
      body: "测试帖子1内容",
    });
    post.setDataValue("title", "测试帖子-----");
    await post.save();
    await post.reload();
    console.log(post.title);

    const comment = await Comment.create({
      body: "我来评论啦",
      postId: post.id,
    });
    const post2 = await comment.getPost();

    // await comment.destroy();
    // await post2.destroy();

    // 事务一
    try {
      let transaction = await sequelize.transaction();
      let post2 = await comment.getPost();
      console.log(`来自 Post#${post2.id} 的评论：${comment.body}`);
      await transaction.commit();
    } catch {
      await transaction.rollback();
    }

    // 事务二
    await sequelize.transaction(async (transaction) => {
      let posts = await Post.findAll({
        attributes: {
          include: ['body'],
        },
        where: {
          title: "测试帖子1",
        },
        include: [Comment],
        order: [["createdAt", "DESC"]],
        limit: 10,
        offset: 0,
        transaction: transaction,
        lock: true,
      });

      for (const post of posts) {
        console.log(`${post.id} | ${post.title}`);
        // const comments = await post.getComments(); // 会重新回表查询
        const comments = post.Comments; // 这个才能复用 include 的特性，也可以使用 post.get('Comments')
        comments.forEach((comment) => {
          console.log("\tComment: " + comment.body);
        });
      }
    });

    // LIKE 匹配
    let posts = await Post.findAll({
      where: {
        title: {
          [Op.like]: "%帖子%",
        },
      },
    });



    // JSON匹配

    console.log(posts.length);
  } catch (error) {
    console.log(error);
  }
})();
