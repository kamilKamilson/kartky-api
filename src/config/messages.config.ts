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
        passwordReset: {
            success: "Password has been changed. You can log in now.",
        },
        logout: {
            success: "You have been logged out.",
        },
    },
};

export default msg;
