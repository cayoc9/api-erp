const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log ao receber a requisição
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} iniciada`);
  
  // Log ao finalizar a requisição
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - Duração: ${duration}ms`
    );
  });
  
  next();
};

module.exports = requestLogger;
