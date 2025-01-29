const { Model, DataTypes } = require('sequelize');

class BaseModel extends Model {
    static baseFields = {
        createDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            field: 'create_date'
        },
        createUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'create_user'
        },
        updateDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'update_date'
        },
        updateUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'update_user'
        }
    };

    static init(attributes, options) {
        super.init(
            {
                ...attributes,
                ...this.baseFields
            },
            {
                ...options,
                underscored: true,
                timestamps: false
            }
        );
    }
}

module.exports = BaseModel; 