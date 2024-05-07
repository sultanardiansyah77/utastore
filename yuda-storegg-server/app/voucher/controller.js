const path = require('path');
const fs = require('fs');
const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find();

      res.render('admin/voucher/view_voucher', {
        voucher,
        alert,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render('admin/voucher/create', {
        category,
        nominal,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, category, nominal } = req.body;
      if (req.file) {
        const tmp_path = req.file.path;
        const originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const filename = `${req.file.filename}.${originaExt}`;
        const target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on('end', async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominal,
              thumbnial: filename,
            });

            await voucher.save();

            req.flash('alertMessage', 'Berhasil menambah voucher');
            req.flash('alertStatus', 'Success');
            res.redirect('/voucher');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal');
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominal,

        });

        await voucher.save();

        req.flash('alertMessage', 'Berhasil menambah voucher');
        req.flash('alertStatus', 'Success');
        res.redirect('/voucher');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;

  //       const nominal = await Nominal.findOne({ _id: id });
  //       res.render('admin/nominal/edit', {
  //         nominal,
  //       });
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/nominal');
  //     }
  //   },

  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { coinName, coinQuantity, price } = req.body;

  //       await Nominal.findOneAndUpdate({
  //         _id: id,
  //       }, { coinName, coinQuantity, price });

  //       req.flash('alertMessage', 'Berhasil mengubah nominal');
  //       req.flash('alertStatus', 'Success');
  //       res.redirect('/nominal');
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/nominal');
  //     }
  //   },

  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       await Nominal.findOneAndRemove({
  //         _id: id,
  //       });

  //       req.flash('alertMessage', 'Berhasil menghapus nominal');
  //       req.flash('alertStatus', 'Success');

//       res.redirect('/nominal');
//     } catch (err) {
//       req.flash('alertMessage', `${err.message}`);
//       req.flash('alertStatus', 'danger');
//       res.redirect('/nominal');
//     }
//   },
};
