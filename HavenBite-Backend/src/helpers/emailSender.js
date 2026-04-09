import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY)



const sendEmail = async (verificationToken) => {
    const verificationLink = `http://localhost:3000/user/verify-email/${verificationToken}`
    // const emailHtmlBody = `<p>Click here to verify your account: <a href="${verificationLink}">Verify Account</a></p>`;
    try {

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', 
            to: 'www.fatimatehreem@gmail.com',
            subject: 'Account Verification',
            html: `<p>Click here to verify your account: <a href = ${verificationLink}> Verify Your Account<a/> `,
            
        })

        return data 

    } catch (error) {
         //may be we can throw error here if email does not exist or if email is not sending , something like that
        console.log("something went wrong while sending email", error)

    }

}


export {sendEmail}