export const responseConfig = {
  success: {
    default: () => 'Operação realizada com sucesso',
  },
  error: {
    default: () => 'Ocorreu um erro',
  },
  notFound: {
    default: () => 'Recurso não encontrado',
  },
  unauthorized: {
    default: () => 'Não autorizado',
  },
  created: {
    default: () => 'Recurso criado com sucesso',
  },
};
