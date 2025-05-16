require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


const User = require('./models/User');
const Game = require('./models/Game');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await User.deleteMany();
    await Game.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    // 🎮 إنشاء 15 لعبة
    const games = [];
    for (let i = 0; i < 15; i++) {
      games.push({
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(10, 70)),
        platform: faker.helpers.arrayElement(platforms),
        coverImage: faker.image.url(),
        description: faker.lorem.sentences(2),
        releaseDate: faker.date.past(2)
      });
    }
    const savedGames = await Game.insertMany(games);

    // 👥 إنشاء 10 مستخدمين
    for (let i = 0; i < 10; i++) {
      const user = new User({
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: '123456' // bcrypt will hash it
      });
      await user.save();

      // 🛒 اختيار ألعاب عشوائية للسلة (1 إلى 3)
      const cartItems = faker.helpers.shuffle(savedGames)
        .slice(0, faker.datatype.int({ min: 1, max: 3 }))
        .map(game => ({
          gameId: game._id,
          quantity: faker.datatype.int({ min: 1, max: 2 })
        }));

      const cartTotal = cartItems.reduce((sum, item) => {
        const game = savedGames.find(g => g._id.equals(item.gameId));
        return sum + game.price * item.quantity;
      }, 0);

      const cart = new Cart({
        userId: user._id,
        items: cartItems,
        total: cartTotal.toFixed(2)
      });
      await cart.save();

      const orderItems = cartItems.map(item => {
        const game = savedGames.find(g => g._id.equals(item.gameId));
        return {
          gameId: item.gameId,
          quantity: item.quantity,
          price: game.price
        };
      });

      const order = new Order({
        userId: user._id,
        items: orderItems,
        total: cartTotal.toFixed(2),
        status: 'completed',
        createdAt: new Date()
      });
      await order.save();
    }

    console.log('🌱 Seeded 10 users, 15 games, carts and orders!');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seedDB();
