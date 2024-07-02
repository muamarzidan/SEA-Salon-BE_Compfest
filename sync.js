const { sequelize } = require('./models');
require('./models/integration');

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error creating database & tables:', error);
    });


// const User = require('./models/User');
// const bcrypt = require('bcrypt');

// const ADMIN_USER_DETAILS = {
    // username: 'Thomas N',
    // email: 'thomas.n@compfest.id',
    // phone: '08123456789',
    // password: 'Admin123',
    // role: 'Admin'
// };

// async function createAdminUser() {
//     try {
//         const existingAdmin = await User.findOne({ where: { email: ADMIN_USER_DETAILS.email } });
//         if (!existingAdmin) {
//             const hashedPassword = await bcrypt.hash(ADMIN_USER_DETAILS.password, 10);
//             await User.create({
//                 username: ADMIN_USER_DETAILS.username,
//                 email: ADMIN_USER_DETAILS.email,
//                 phone: ADMIN_USER_DETAILS.phone,
//                 password: hashedPassword,
//                 role: ADMIN_USER_DETAILS.role
//             });
//             console.log('Admin user created successfully');
//         } else {
//             console.log('Admin user already exists');
//         }
//     } catch (err) {
//         console.error('Error creating admin user:', err);
//     }
// }

// (async () => {
//     await sequelize.sync({ force: true });
//     await createAdminUser();
// })();