require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const User = require('./models/User');
const Game = require('./models/Game');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];

// Admin users data
const adminUsers = [
  {
    username: 'admin',
    fullName: 'System Administrator',
    email: 'admin@gamestore.com',
    password: 'admin123456',
    age: 30,
    gender: 'male',
    country: 'United States',
    isAdmin: true
  },
  {
    username: 'moderator',
    fullName: 'Content Moderator',
    email: 'moderator@gamestore.com',
    password: 'mod123456',
    age: 25,
    gender: 'female',
    country: 'United Kingdom',
    isAdmin: true
  }
];

async function createCartForUser(userId, savedGames) {
  // Create cart with 2-4 random games
  const cartItems = faker.helpers
    .shuffle(savedGames)
    .slice(0, faker.number.int({ min: 2, max: 4 }))
    .map(game => ({
      gameId: game._id,
      quantity: faker.number.int({ min: 1, max: 3 })
    }));

  const cartTotal = cartItems.reduce((sum, item) => {
    const game = savedGames.find(g => g._id.equals(item.gameId));
    return sum + game.price * item.quantity;
  }, 0);

  const cart = new Cart({
    userId: userId,
    items: cartItems,
    total: parseFloat(cartTotal.toFixed(2))
  });
  
  await cart.save();
  return cart;
}

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear old data
    await User.deleteMany();
    await Game.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();
    console.log('🧹 Cleared old data');

    // Create admin users
    console.log('👑 Creating admin users...');
    const createdAdmins = [];
    for (const adminData of adminUsers) {
      const admin = new User(adminData);
      await admin.save();
      createdAdmins.push(admin);
    }
    console.log(`✅ Created ${adminUsers.length} admin users`);

    // Create games
    console.log('🎮 Creating games...');
    const games = [];
    for (let i = 0; i < 15; i++) {
      games.push({
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(10, 70)),
        platform: faker.helpers.arrayElement(platforms),
        coverImage: faker.image.url(),
        description: faker.lorem.paragraphs(2),
        releaseDate: faker.date.past(2),
      });
    }
    const savedGames = await Game.insertMany(games);
    console.log(`✅ Created ${games.length} games`);

    // Create carts for admin users
    console.log('🛒 Creating carts for admin users...');
    for (const admin of createdAdmins) {
      await createCartForUser(admin._id, savedGames);
    }
    console.log('✅ Created carts for admin users');

    // Create regular users with carts and orders
    console.log('👥 Creating regular users with carts and orders...');
    for (let i = 0; i < 10; i++) {
      // Create user
      const user = new User({
        username: faker.internet.userName().toLowerCase(),
        fullName: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: '123456789', // Will be hashed by the pre-save hook
        age: faker.number.int({ min: 18, max: 50 }),
        gender: faker.helpers.arrayElement(['male', 'female']),
        country: faker.location.country(),
        isAdmin: false
      });
      await user.save();

      // Create cart for regular user
      const cart = await createCartForUser(user._id, savedGames);

      // Create order
      const orderItems = cart.items.map(item => {
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
        total: cart.total,
        status: faker.helpers.arrayElement(['pending', 'completed']),
        createdAt: faker.date.past(1)
      });
      await order.save();
    }
    console.log('✅ Created 10 regular users with carts and orders');

    console.log('🌟 Database seeding completed successfully!');
    console.log('Admin login credentials:');
    console.log('Email: admin@gamestore.com');
    console.log('Password: admin123456');
    
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seedDB();



