const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();

      res.render('admin/category/view_category', {
        category,
        alert,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      const category = await Category({ name });
      await category.save();
      req.flash('alertMessage', 'Berhasil menambah kategori');
      req.flash('alertStatus', 'Success');
      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });
      res.render('admin/category/edit', {
        category,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Category.findOneAndUpdate({
        _id: id,
      }, { name });

      req.flash('alertMessage', 'Berhasil mengubah kategori');
      req.flash('alertStatus', 'Success');
      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil menghapus kategori');
      req.flash('alertStatus', 'Success');

      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
