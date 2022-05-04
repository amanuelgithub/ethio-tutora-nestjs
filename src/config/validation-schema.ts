import * as Joi from 'joi';

export const validationSchema = Joi.object({
  app: {
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  },
});
