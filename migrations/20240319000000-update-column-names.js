module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Patients
        await queryInterface.renameColumn('patients', 'nome', 'name');
        await queryInterface.renameColumn('patients', 'data_nascimento', 'birth_date');

        // Internments
        await queryInterface.renameColumn('internments', 'data_internacao', 'admission_date');
        await queryInterface.renameColumn('internments', 'data_alta', 'discharge_date');
        await queryInterface.renameColumn('internments', 'setor_alta_id', 'discharge_sector_id');

        // Failures
        await queryInterface.renameColumn('failures', 'formulario_id', 'form_id');
        await queryInterface.renameColumn('failures', 'formulario_date', 'form_date');
        await queryInterface.renameColumn('failures', 'observacoes', 'observations');
        await queryInterface.removeColumn('failures', 'prontuario_code');
    },

    down: async (queryInterface, Sequelize) => {
        // Patients
        await queryInterface.renameColumn('patients', 'name', 'nome');
        await queryInterface.renameColumn('patients', 'birth_date', 'data_nascimento');

        // Internments
        await queryInterface.renameColumn('internments', 'admission_date', 'data_internacao');
        await queryInterface.renameColumn('internments', 'discharge_date', 'data_alta');
        await queryInterface.renameColumn('internments', 'discharge_sector_id', 'setor_alta_id');

        // Failures
        await queryInterface.renameColumn('failures', 'form_id', 'formulario_id');
        await queryInterface.renameColumn('failures', 'form_date', 'formulario_date');
        await queryInterface.renameColumn('failures', 'observations', 'observacoes');
        await queryInterface.addColumn('failures', 'prontuario_code', {
            type: Sequelize.STRING,
            allowNull: false
        });
    }
}; 