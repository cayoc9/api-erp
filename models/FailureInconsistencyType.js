const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const FailureInconsistencyType = sequelize.define('FailureInconsistencyType', {
    // ...
    tpInconsistencyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'inconsistency_types', // Tabela renomeada
            key: 'id',
        },
        primaryKey: true,
        field: 'inconsistency_type_id' // Novo nome do campo
    },
}, {
    tableName: 'failure_inconsistency_types', // Novo nome da tabela
    // ...
});

module.exports = FailureInconsistencyType; 