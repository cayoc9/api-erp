const migrationOrder = [
  // Verificação inicial do banco
  '20240320000000-check-observacoes-column.js',
  
  // Estruturas base
  '20241221192001-create-hospital-groups.js',
  '20241221192005-create-hospitals.js',
  '20241221192024-create-sectors.js',
  '20241221192016-create-responsibles.js',
  
  // Role para Responsible
  '20240321000000-add-role-to-responsible.js',
  
  // Tabelas dependentes
  '20241221192031-create-tp_inconsistencies.js',
  '20241221191955-create-forms.js',
  '20241221192027-create-failures.js',
  
  // Campos adicionais e ajustes
  '20240101000000-standardize-tracking-fields.js',
  '20240102000000-standardize-fields.js',
  '20240107-add-status-to-forms.js',
  '20240131143100-add-sector-fields-to-failures.js'
];

module.exports = migrationOrder;
