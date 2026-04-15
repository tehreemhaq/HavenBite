import { Resend } from "resend";
import { ApiError } from "./ApiErrors.js";

const resend = new Resend(process.env.RESEND_API_KEY)

const resetPasswordEmailSender = async ({ to, username, resetToken }) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Reset your HavenBite password</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .button { display: block !important; width: 100% !important; }
          .content { padding: 20px !important; }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;background-color:#FAF9F3;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <div style="background-color: #ffffff; border-radius: 24px; border: 1px solid #E8E2D9; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2D5016 0%, #3a6b1e 100%); padding: 40px 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
              HavenBite
            </h1>
            <p style="margin: 8px 0 0; font-size: 13px; color: rgba(255,255,255,0.8); letter-spacing: 0.5px; text-transform: uppercase;">
              Halal Recipe Platform
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 48px 40px;">
            <h2 style="margin: 0 0 12px; font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.3px;">
              Reset your password
            </h2>

            <p style="margin: 0 0 32px; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
              Hi <strong style="color: #2D5016;">${username}</strong>,
            </p>

            <p style="margin: 0 0 32px; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
              We received a request to reset your <strong>HavenBite</strong> password. Click the button below to choose a new one. This link expires in <strong>1 hour</strong>.
            </p>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 40px 0 32px;">
              <a href="${resetLink}"
                 style="display: inline-block; background-color: #2D5016; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 36px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                Reset My Password →
              </a>
            </div>
          </div>

          <!-- Divider -->
          <div style="padding: 0 40px;">
            <hr style="border: none; border-top: 1px solid #E8E2D9; margin: 0;" />
          </div>

          <!-- Footer -->
          <div style="padding: 32px 40px; background-color: #FAF9F3;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; line-height: 1.5;">
              ⏰ This link will expire in <strong>1 hour</strong>
            </p>
            <p style="margin: 0; font-size: 12px; color: #999; line-height: 1.5;">
              Didn't request a password reset? You can safely ignore this email — your password won't change.
            </p>
            <p style="margin: 24px 0 0; font-size: 11px; color: #bbb; text-align: center;">
              © ${new Date().getFullYear()} HavenBite. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </body>
    </html>
    `

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'www.fatimatehreem@gmail.com', // swap to dynamic `to` once domain is verified
            subject: 'Reset your HavenBite password',
            html,
        })
        return data
    } catch (error) {
        console.error("Password reset email sending failed:", error)
        throw new ApiError(500, "Failed to send password reset email. Please try again.")
    }
}

export { resetPasswordEmailSender }