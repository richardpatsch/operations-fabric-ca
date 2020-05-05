const yup = require('yup')

export const deliverySchema = yup.object().shape({
  id: yup.string().required('please specify an ID'),
  docType: yup.string().required('please insert "delivery" here'),
  supplier: yup.string().required('please add a supplier'),
  foods: yup.array().of(yup.string()),
  dateOfProposalCreation: yup.string().required('please add a timestamp here'),
  dateOfLastProposalUpdate: yup
    .string()
    .required('please add a timestamp here'),
})

export const foodSchema = yup.object().shape({
  id: yup.string().required('please specify an ID'),
  name: yup.string().required('please specify a name'),
  supplier: yup.string().required('please specify a supplier'),
  best_before: yup.date().required('please specify an expiration date'),
  owner: yup.string().notRequired(),
  hops: yup.number().required('please add the number of hops'),
  deliveryId: yup.string().required('reference a delivery id'),
  docType: yup.string().required('please insert "food" here'),
})

export const createFoodSchema = yup.object().shape({
  name: yup.string().required('please specify a name'),
  best_before: yup.date().required('please specify an expiration date'),
  quantity: yup.number().required('please also specify the quantity'),
})

export const transferFoodSchema = yup.object().shape({
  id: yup.string().required('please specify an ID'),
  to: yup.string().required('please specify target'),
})
