const mongoose = require('mongoose');

class PaymentsDatabase {
  async connectDB() {
    try {
      await mongoose.connect('mongodb://root:root@db:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
          authSource: 'admin',
        },
        user: root,
        pass: root,
        dbName: 'Payment_db',

      });
      console.log('Mongodb connected...');
    } catch (error) {
      console.log();
    }
  }

  async disconnectDB() {
    await mongoose.disconnect().then(() => {
      console.log('Mongodb disconnected...');
    });
  }
}


module.exports = {PaymentsDatabase};