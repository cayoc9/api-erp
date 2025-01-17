// middleware/failureValidation.js
const validateFailureData = (req, res, next) => {
    console.log('Request body:', req.body);
    console.log('Request query:', req.query);
    next();
};

// Adicione ao router
router.use(validateFailureData);