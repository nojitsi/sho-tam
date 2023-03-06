const ENVIROMENTS_TO_MOCK = ['development', 'test']
const SHOULD_MOCK = ENVIROMENTS_TO_MOCK.includes(process.env.NODE_ENV)

export const getFormMocks = () => (SHOULD_MOCK ? {
  title: 'Test',
  description: 'TestDesc',
  typeId: 1 ,
  locationPath: '0, 1',
  locationId: 1,
  price: '1'
} : undefined)

export type FormMocks = ReturnType<typeof getFormMocks>