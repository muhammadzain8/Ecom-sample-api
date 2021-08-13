const mongoose = require('mongoose');
const colors = require('colors');
// const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Order = require('./models/orderModel');
const Product = require('./models/productModel');

const dotenv = require('dotenv').config({ path: './config.env' });
const connectDB = require('./utils/dbConnect');

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUsers = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUsers };
    });

    await Product.insertMany(sampleProducts);
    console.log(' data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(' data destroyed '.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] == '-d') {
  destoryData();
} else {
  importData();
}