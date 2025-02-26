import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  // Bypass Arcjet in development mode (log but don't block)
  if (process.env.NODE_ENV === 'development') {
    console.log('Arcjet bypassed in development mode for testing. Re-enable for production.');
    return next();
  }

  try {
    // Debug IP and environment (only in non-development)
    console.log('Request IP:', req.ip, 'Remote Address:', req.connection?.remoteAddress, 'Headers:', req.headers);
    console.log('Environment:', process.env.NODE_ENV, process.env.ARCJET_ENV, process.env.ARCJET_KEY);

    const details = {
      'ip.src': '127.0.0.1', // Force IPv4 loopback
      method: req.method,
      path: req.path,
      headers: req.headers, // Includes user-agent
      requested: 1, // Tokens requested for rate limiting
    };

    const decision = await aj.protect(details);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Bot detected' });
      }
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error.message}`);
    next(error);
  }
};

export default arcjetMiddleware;