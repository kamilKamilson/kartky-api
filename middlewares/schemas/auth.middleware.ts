import Joi from "joi";

export const loginSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

export const registerSchema = Joi.object().keys({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Hasło"),
    password_confirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .options({ messages: { "any.only": "Hasła nie są takie same" } }),
});

export const forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().required().email().label("Email"),
});

export const accountConfirmationSchema = Joi.object()
    .keys({
        query: Joi.object({
            token: Joi.string().required(),
            exp: Joi.string().required(),
        }).unknown(true),
    })
    .unknown(true);
