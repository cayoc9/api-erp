// scripts/fillAllNulls.js
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.js'); // Ajustar caminho se necessário

// Instância do Sequelize (ambiente production)
const sequelize = new Sequelize(
    sequelizeConfig.production.database,
    sequelizeConfig.production.username,
    sequelizeConfig.production.password,
    {
        host: sequelizeConfig.production.host,
        dialect: sequelizeConfig.production.dialect,
        port: sequelizeConfig.production.port,
        logging: false,
    }
);

/** Modelos Simplificados **/

// 1. FORMS
const Form = sequelize.define('Form', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: true },
    createDate: { type: DataTypes.DATE, allowNull: true },
    updateDate: { type: DataTypes.DATE, allowNull: true },
    createUser: { type: DataTypes.INTEGER, allowNull: true },
    updateUser: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'forms', timestamps: false });

// 2. HOSPITALS
const Hospital = sequelize.define('Hospital', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: true },
    groupId: { type: DataTypes.INTEGER, allowNull: true }, // Ex: references hospital_groups
    createDate: { type: DataTypes.DATE, allowNull: true },
    updateDate: { type: DataTypes.DATE, allowNull: true },
}, { tableName: 'hospitals', timestamps: false });

// 3. SECTORS
const Sector = sequelize.define('Sector', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: true },
    hospitalId: { type: DataTypes.INTEGER, allowNull: false }, // references hospitals
    createDate: { type: DataTypes.DATE, allowNull: true },
    updateDate: { type: DataTypes.DATE, allowNull: true },
    createUser: { type: DataTypes.INTEGER, allowNull: true },
    updateUser: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'sectors', timestamps: false });

// 4. RESPONSIBLES
const Responsible = sequelize.define('Responsible', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING(50), allowNull: true },
    createDate: { type: DataTypes.DATE, allowNull: true },
    updateDate: { type: DataTypes.DATE, allowNull: true },
    createUser: { type: DataTypes.INTEGER, allowNull: true },
    updateUser: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'responsibles', timestamps: false });

// 5. FAILURES
const Failure = sequelize.define('Failure', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    prontuarioCode: { type: DataTypes.STRING, allowNull: false },
    formularioId: { type: DataTypes.INTEGER, allowNull: false },
    formularioDate: { type: DataTypes.DATE, allowNull: true },
    professionalId: { type: DataTypes.INTEGER, allowNull: false },
    hospitalId: { type: DataTypes.INTEGER, allowNull: false },
    sectorId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING(20), allowNull: false },
    createDate: { type: DataTypes.DATE, allowNull: true },
    updateDate: { type: DataTypes.DATE, allowNull: true },
    observacoes: { type: DataTypes.TEXT, allowNull: true },
    resolvedAt: { type: DataTypes.DATE, allowNull: true },
    createUser: { type: DataTypes.INTEGER, allowNull: true },
    updateUser: { type: DataTypes.INTEGER, allowNull: true },
    sectorReporterId: { type: DataTypes.INTEGER, allowNull: false },
    sectorResponsibleId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'failures', timestamps: false });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso.');

        const transaction = await sequelize.transaction();

        try {
            /** 
             * 1) CRIAR/ATUALIZAR FORMS (IDs 1..16)
             */
            for (let i = 1; i <= 16; i++) {
                const [form, created] = await Form.findOrCreate({
                    where: { id: i },
                    defaults: {
                        name: `Formulário ${i}`,
                        createDate: new Date(),
                        updateDate: new Date(),
                        createUser: 1,
                        updateUser: 1
                    },
                    transaction
                });
                // Se já existir, podemos checar se há campos nulos e atualizar
                let needUpdate = false;
                if (!form.name) { form.name = `Formulário ${i}`; needUpdate = true; }
                if (!form.createDate) { form.createDate = new Date(); needUpdate = true; }
                if (!form.updateDate) { form.updateDate = new Date(); needUpdate = true; }
                if (needUpdate) await form.save({ transaction });
            }

            /** 
             * 2) CRIAR/ATUALIZAR HOSPITAIS (IDs 1..14, pois 15 e 16 já existem)
             */
            for (let i = 1; i <= 16; i++) {
                const [hospital, created] = await Hospital.findOrCreate({
                    where: { id: i },
                    defaults: {
                        name: `Hospital ${i}`,
                        groupId: i % 2 ? 19 : 20,  // Exemplo: alterna entre grupo A(19) e B(20)
                        createDate: new Date(),
                        updateDate: new Date()
                    },
                    transaction
                });
                // Atualiza se houver nulos
                let needUpdate = false;
                if (!hospital.name) { hospital.name = `Hospital ${i}`; needUpdate = true; }
                if (!hospital.createDate) { hospital.createDate = new Date(); needUpdate = true; }
                if (!hospital.updateDate) { hospital.updateDate = new Date(); needUpdate = true; }
                if (needUpdate) await hospital.save({ transaction });
            }

            /** 
             * 3) CRIAR/ATUALIZAR SECTORS (IDs 1..16)
             */
            for (let i = 1; i <= 16; i++) {
                const [sector, created] = await Sector.findOrCreate({
                    where: { id: i },
                    defaults: {
                        name: `Setor ${i}`,
                        // hospitalId deve existir na tabela hospitals
                        hospitalId: i, // associar 1-1 com hospital por exemplo
                        createDate: new Date(),
                        updateDate: new Date(),
                        createUser: 1,
                        updateUser: 1
                    },
                    transaction
                });
                // Atualiza se houver nulos
                let needUpdate = false;
                if (!sector.name) { sector.name = `Setor ${i}`; needUpdate = true; }
                if (!sector.hospitalId) { sector.hospitalId = 1; needUpdate = true; } // fallback
                if (!sector.createDate) { sector.createDate = new Date(); needUpdate = true; }
                if (!sector.updateDate) { sector.updateDate = new Date(); needUpdate = true; }
                if (needUpdate) await sector.save({ transaction });
            }

            /** 
             * 4) CRIAR/ATUALIZAR RESPONSIBLES (IDs 1..16)
             */
            for (let i = 1; i <= 16; i++) {
                const [resp, created] = await Responsible.findOrCreate({
                    where: { id: i },
                    defaults: {
                        name: `Responsável ${i}`,
                        role: i % 2 ? 'Técnico' : 'Médico',
                        createDate: new Date(),
                        updateDate: new Date()
                    },
                    transaction
                });
                let needUpdate = false;
                if (!resp.name) { resp.name = `Responsável ${i}`; needUpdate = true; }
                if (!resp.role) { resp.role = 'Técnico'; needUpdate = true; }
                if (!resp.createDate) { resp.createDate = new Date(); needUpdate = true; }
                if (!resp.updateDate) { resp.updateDate = new Date(); needUpdate = true; }
                if (needUpdate) await resp.save({ transaction });
            }

            /** 
             * 5) ATUALIZAR NULLs EM FAILURES
             *  - sectorReporterId -> random(1..16)
             *  - sectorResponsibleId -> random(1..16)
             *  - createDate, updateDate, etc.
             */
            const allFailures = await Failure.findAll({ transaction });
            for (const fail of allFailures) {
                let updated = false;
                // Se sectorReporterId está null, atribuir algo
                if (!fail.sectorReporterId) {
                    fail.sectorReporterId = Math.ceil(Math.random() * 16); // 1..16
                    updated = true;
                }
                // Se sectorResponsibleId está null, atribuir algo
                if (!fail.sectorResponsibleId) {
                    fail.sectorResponsibleId = Math.ceil(Math.random() * 16);
                    updated = true;
                }
                // Se createDate está null
                if (!fail.createDate) {
                    fail.createDate = new Date();
                    updated = true;
                }
                // Se updateDate está null
                if (!fail.updateDate) {
                    fail.updateDate = new Date();
                    updated = true;
                }
                // Observacoes / createUser / updateUser (exemplo)
                if (!fail.observacoes) {
                    fail.observacoes = `Obs fictícia para Failure ${fail.id}`;
                    updated = true;
                }
                if (!fail.createUser) {
                    fail.createUser = 1;
                    updated = true;
                }
                if (!fail.updateUser) {
                    fail.updateUser = 1;
                    updated = true;
                }
                if (updated) {
                    await fail.save({ transaction });
                }
            }

            await transaction.commit();
            console.log('Dados fictícios inseridos/atualizados com sucesso!');
        } catch (err) {
            await transaction.rollback();
            console.error('Erro ao inserir/atualizar dados fictícios:', err);
        } finally {
            await sequelize.close();
            console.log('Conexão encerrada.');
        }
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
})();
