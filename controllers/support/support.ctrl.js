const models = require("../../database/models");
const paginate = require("express-paginate");
const path = require("path");

exports.index = (req, res) => {
  res.redirect("/support/inquirys");
};

// 문의하기 페이지
exports.get_inquirys = async (req, res) => {
  try {
    const [inquirys, totalCount] = await Promise.all([
      models.Inquirys.findAll({
        limit: req.query.limit,
        offset: req.offset,
        order: [["createdAt", "desc"]],
      }),
      models.Inquirys.count(),
    ]);
    const pageCount = Math.ceil(totalCount / req.query.limit);
    const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);
    // const inquirys = await models.Inquirys.findAll();

    inquirys.forEach((item) => {
      item.name = item.name.substr(0, 1) + "****";
    });

    res.render("support/inquirys/list.html", {
      inquirys,
      pageCount,
      pages,
    });
  } catch (e) {
    console.log(e);
  }
};
exports.get_inquirys_write = async (req, res) => {
  console.log("req.csrfToken()", req.csrfToken());
  res.render("support/inquirys/edit.html", {
    csrfToken: req.csrfToken(),
  });
};
exports.post_inquirys_write = async (req, res) => {
  try {
    console.log("post_inquirys_write");
    const items = req.files;

    console.log("req.body", req.body);
    req.body.attach_cnt = items.length;
    req.body.content = req.body.content.replace(/(?:\r\n|\r|\n)/g, "<br/>");

    await models.Inquirys.create(req.body).then((result) => {
      let inquiry_id = result.id;
      items.forEach(async (item) => {
        let originalname = item.originalname;
        let filename = item.filename;
        let size = item.size;
        let destination = item.destination;
        let extension = path.extname(item.originalname);
        await models.InquirysAttach.create({
          originalname,
          filename,
          size,
          destination,
          extension,
          inquiry_id,
        });
      });
    });
    res.redirect("/support/inquirys");
  } catch (e) {
    console.log(e);
  }
};
exports.get_inquirys_edit = async (req, res) => {
  const inquiry = await models.Inquirys.findOne({
    where: {
      id: req.params.id,
    },
  });
  inquiry.content = inquiry.content.replace(/<br\s*\/?>/gm, "\n");

  console.log("get_inquirys_edit");
  res.render("support/inquirys/edit.html", {
    csrfToken: req.csrfToken(),
    inquiry,
  });
};
exports.post_inquirys_edit = async (req, res) => {
  try {
    // const inquiry = await models.Inquirys.findByPk(req.params.id);
    // await inquiry.updateReply(req.body);

    // await models.InquirysReply.update(req.body, {
    //   where: {
    //     inquiry_id: req.params.id,
    //   },
    // });
    // res.redirect(`/support/inquirys/detail/${req.params.id}`);
    console.log("post_inquirys_edit");
    const items = req.files;

    console.log("req.body", req.body);
    console.log("req.body.content", req.body.content);

    req.body.attach_cnt = items && items.length;
    req.body.content =
      req.body.content && req.body.content.replace(/(?:\r\n|\r|\n)/g, "<br/>");

    await models.Inquirys.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      let inquiry_id = result.id;
      items.forEach(async (item) => {
        let originalname = item.originalname;
        let filename = item.filename;
        let size = item.size;
        let destination = item.destination;
        let extension = path.extname(item.originalname);
        await models.InquirysAttach.update(
          {
            originalname,
            filename,
            size,
            destination,
            extension,
            inquiry_id,
          },
          {
            where: {
              inquiry_id: req.params.id,
            },
          }
        );
      });
    });
    // res.redirect("/support/inquirys");
    res.redirect(`/support/inquirys/detail/${req.params.id}`);
    // res.render("support/inquirys/detail.html", {
    //   inquiry,
    //   csrfToken: req.csrfToken(),
    // });
  } catch (e) {
    console.log(e);
  }
};
exports.get_inquirys_detail = async (req, res) => {
  try {
    const inquiry = await models.Inquirys.findOne({
      where: {
        id: req.params.id,
        lock_int: 1,
      },
      include: ["Reply", "Attach"],
    });
    if (inquiry) {
      res.render("support/inquirys/detail.html", {
        inquiry,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.redirect("/support/inquirys");
    }
  } catch (e) {
    console.log(e);
  }
};
// exports.get_edit = async (req, res) => {
//     res.render('support/inquirys/edit.html', {
//         csrfToken: req.csrfToken()
//     });
// }
// exports.post_edit = async (req, res) => {
//     try {
//         await models.Inquirys.update(req.body);
//         res.redirect('/support/inquirys/')
//     } catch (e) {
//         console.log(e);
//     }
// }
exports.get_inquirys_delete = async (req, res) => {
  try {
    await models.Inquirys.destroy({
      where: {
        id: req.params.id,
        lock_int: 1,
      },
    });
    res.redirect("/support/inquirys");
  } catch (e) {
    console.log(e);
  }
};
exports.post_inquirys_reply_write = async (req, res) => {
  try {
    const inquiry = await models.Inquirys.findByPk(req.params.id);
    let reply_cnt = 0;
    if (!inquiry.reply_cnt) {
      reply_cnt++;
    } else {
      reply_cnt = inquiry.reply_cnt + 1;
    }
    await models.Inquirys.update(
      {
        reply_cnt: reply_cnt,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    await inquiry.createReply(req.body);
    res.redirect(`/support/inquirys/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
};
exports.post_inquirys_reply_edit = async (req, res) => {
  try {
    // const inquiry = await models.Inquirys.findByPk(req.params.id);
    // await inquiry.updateReply(req.body);
    await models.InquirysReply.update(req.body, {
      where: {
        inquiry_id: req.params.id,
      },
    });
    res.redirect(`/support/inquirys/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
};

exports.get_inquirys_reply_delete = async (req, res) => {
  try {
    await models.InquirysReply.destroy({
      where: {
        inquiry_id: req.params.id,
      },
    });
    res.redirect(`/support/inquirys/detail/${req.params.id}`);
  } catch (e) {
    console.log(e);
  }
};

exports.inquirys_check = async (req, res) => {
  try {
    let status = null;
    const { inquiry_id, inquiry_password } = req.body;
    const inquiry = await models.Inquirys.findOne({
      where: {
        id: inquiry_id,
        password: inquiry_password,
      },
    });
    if (inquiry) {
      status = true;
      await models.Inquirys.update(
        {
          lock_int: 1,
        },
        {
          where: {
            id: inquiry_id,
            password: inquiry_password,
          },
        }
      );
    }
    res.json({
      inquiry,
      status,
    });
  } catch (e) {
    console.log(e);
  }
};
exports.inquirys_lock = async (req, res) => {
  try {
    let status = null;
    await models.Inquirys.update(
      {
        lock_int: 0,
      },
      {
        where: {
          id: req.body.id,
          lock_int: 1,
        },
      }
    );
    status = true;
    res.json({
      status,
    });
  } catch (e) {
    console.log(e);
  }
};

// 자주묻는 질문 페이지
exports.get_faq = (req, res) => {
  res.render("support/faq/list.html");
};
