var Instance = require('sequelize/lib/instance');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                message: 'Username must be unique.',
                fields: [sequelize.fn('lower', sequelize.col('username'))]
            },
            validate: {
                min: {
                    args: 3,
                    msg: 'Username must start with a letter, have no spaces, and be at least 3 characters.'
                },
                max: {
                    args: 40,
                    msg: 'Username must start with a letter, have no spaces, and be at less than 40 characters.'
                },
                is: {
                    args: /^[A-Za-z][A-Za-z0-9-]+$/i, // must start with letter and only have letters, numbers, dashes
                    msg: 'Username must start with a letter, have no spaces, and be 3 - 40 characters.'
                }
            },
        },

        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
                fields: [sequelize.fn('lower', sequelize.col('email'))]
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'The email you entered is invalid or is already in our system.'
                },
                max: {
                    args: 254,
                    msg: 'The email you entered is invalid or longer than 254 characters.'
                }
            }
        },

        name: {
            type: DataTypes.STRING,
            validate: {
                max: {
                    args: 254,
                    msg: 'Your full name can only be 254 caracters.'
                }
            }
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['username', 'email']
            }
        ]
    });

    return User;
};
