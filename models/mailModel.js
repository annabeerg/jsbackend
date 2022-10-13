const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_SECRET)

const mail = {
    sendMail: async function sendMail(to, subject, content) {
        let data = {
            to: to,
            from: process.env.MAIL,
            subject: subject,
            text: content
        }

        try {
            sgMail
                .send(data)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error.message);
        }
    }
};

module.exports = mail;