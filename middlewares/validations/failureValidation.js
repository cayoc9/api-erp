// middleware/failureValidation.js
const validateFailureData = (req, res, next) => {
    const { inconsistencyTypeId, formId } = req.body;

    const errors = [];

    if (!inconsistencyTypeId) errors.push('Tipo de inconsistência é obrigatório');
    if (!formId) errors.push('Formulário é obrigatório');

    if (errors.length) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateFailureData;