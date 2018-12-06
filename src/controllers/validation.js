import Joi from 'joi';
const alphaNum = Joi.string().alphanum();
const integer = Joi.number().integer();
const nameSchema = alphaNum.min(2).max(30);
const stringSchema = Joi.string();
const surnameSchema = alphaNum.min(2).max(50);
const birthYearSchema = Joi.date().iso();
const emailSchema = Joi.string().email();

const createUserSchema = Joi.object().keys({
    first_name: nameSchema.required(),
    last_name: surnameSchema.required(),
    birthYear: birthYearSchema.required(),
    mail: emailSchema.required(),
    password:nameSchema.required(),
    admin: stringSchema
});

const createProductSchema = Joi.object().keys({
    category: stringSchema.required(),
    name: stringSchema.required(),
    quantity_in_stock: integer.required(),
    quantity_remaining: integer.required(),
    price: integer.required(),
    size: stringSchema.required(),
    url: stringSchema.required()
});

const checkSchema = Joi.object().keys({
    id: integer.required(),
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

const checkLoginSchema = Joi.object().keys({
    mail: emailSchema.required(),
    password:nameSchema.required()
});
export {
    editUserSchema,
    createUserSchema,
    createProductSchema,
    createSaleSchema,
    checkSchema,
    checkLoginSchema
};