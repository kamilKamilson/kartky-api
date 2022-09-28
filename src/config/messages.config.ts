const msg = {
    auth: {
        register: {
            created: "Account created correctly. Go to your e-mail inbox and confirm the account.",
            errMail: "Error occured, try again later m",
            errDatabase: "Error occured, try again later d",
            errExistsNotConfirmed: "Account with this email exists but it's not confirmed. Activation link has been resend.",
            errExists: "Account with this email exists",
        },
        accountConfirmation: {
            success: "Account has been confirmed. You can log in now.",
            alreadyConfirmed: "Your account is confirmed.",
        },
    },
};

export default msg;
