const msg = {
    global: {
        errMail: "Error occured, try again later m",
        errDatabase: "Error occured, try again later d",
    },
    auth: {
        register: {
            created: "Account created correctly. Go to your e-mail inbox and confirm the account.",
            errExistsNotConfirmed: "Account with this email exists but it's not confirmed. Activation link has been resend.",
            errExists: "Account with this email exists",
        },
        accountConfirmation: {
            success: "Account has been confirmed. You can log in now.",
            alreadyConfirmed: "Your account is confirmed.",
            tokenNotValid: "Confirmation link expired",
        },
        forgotPassword: {
            falsepositive: "If user with this email exists, reset password link has been sent to your e-mail inbox.",
        },
        passwordReset: {
            success: "Password has been changed. You can log in now.",
        },
        logout: {
            success: "You have been logged out.",
        },
        resetPassword: {
            tokenNotValid: "Reset link expired",
        },
    },
    mail: {
        register: {
            subject: "Account created succesfully",
        },
        confirmAccount: {
            subject: "Confirm your account",
        },
        resetPassword: {
            subject: "Password has been changed",
        },
        forgotPassword: {
            subject: "Reset your password",
        },
    },
};

export default msg;
