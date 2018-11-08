import Joi from 'joi';
const alphaNum = Joi.string().alphanum();
const integer = Joi.number().integer();
const nameSchema = alphaNum.min(2).max(30);
const stringSchema = Joi.string();
const priceSchema = Joi.number().positive().precision(2);
const surnameSchema = alphaNum.min(2).max(50);
const birthYearSchema = integer.min(1900).max(2013);
const emailSchema = Joi.string().email();

const createUserSchema = Joi.object().keys({
    name: nameSchema.required(),
    surname: surnameSchema.required(),
    birthYear: birthYearSchema.required(),
    mail: emailSchema.required()
});

const createProductSchema = Joi.object().keys({
    category: stringSchema.required(),
    name: stringSchema.required(),
    quantity: integer.required(),
    price: integer.required(),
    size: stringSchema.required(),
    url: stringSchema.required()
});

const checkUpdateSchema = Joi.object().keys({
    category: stringSchema,
    name: stringSchema,
    quantity: integer,
    price: integer,
    size: stringSchema,
    url: stringSchema
});

const createSaleSchema = Joi.object().keys({
    attendant: stringSchema.required(),
    category: stringSchema.required(),
    product: stringSchema.required(),
    quantity: integer.required(),
    price: integer.required()
});

const editUserSchema = Joi.object().keys({
    name: nameSchema,
    surname: surnameSchema,
    birthYear: birthYearSchema,
    mail: emailSchema
});
const checkIdSchema = Joi.object().keys({
    id: integer.required()
});
export {
    editUserSchema,
    createUserSchema,
    checkIdSchema,
    createProductSchema,
    createSaleSchema,
    checkUpdateSchema
};