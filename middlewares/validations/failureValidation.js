// middleware/failureValidation.js
const validateFailureData = (req, res, next) => {
    const { prontuarioCode, formularioId, hospitalId } = req.body;
    
    const errors = [];
    
    if (!prontuarioCode) errors.push('Código do prontuário é obrigatório');
    if (!formularioId) errors.push('ID do formulário é obrigatório');
    if (!hospitalId) errors.push('ID do hospital é obrigatório');
    
    if (errors.length) {
        return res.status(400).json({ errors });
    }
    
    next();
};

module.exports = validateFailureData;