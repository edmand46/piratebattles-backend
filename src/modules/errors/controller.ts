import { ajvMapErrors } from '../../constants';

export function handleError(error, req, reply) {
  const { validation } = error;
  if (validation) {
    const errors = validation.map(v => {
      const { params: { missingProperty }, keyword } = v;
      const errorConstant = ajvMapErrors[keyword];
      return [missingProperty, errorConstant];
    });

    return reply.status(400).send({
      errors,
    });
  }
  reply.send(error);
};