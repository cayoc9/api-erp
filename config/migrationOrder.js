const migrationOrder = [
  // Primeiro as migrações de estruturas base
  '20241221192001-create-hospital-groups.js',
  '20241221192005-create-hospitals.js',
  '20241221192024-create-sectors.js',
  '20241221192016-create-responsibles.js',
  
  // Depois as tabelas que dependem das estruturas base
  '20241221192031-create-tp_inconsistencies.js',
  '20241221191955-create-forms.js',
  '20241221192027-create-failures.js',
  
  // Por fim as alterações de padronização e adição de campos
  '20240101000000-standardize-tracking-fields.js',
  '20240102000000-standardize-fields.js',
  '20240107-add-status-to-forms.js',
  '20241231205920-add-observacoes-to-failures.js'
];

module.exports = migrationOrder;
