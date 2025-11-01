import { transporter } from "@/lib/mail";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const emailHtml = await render(
      VerificationEmail({ username, otp: verifyCode })
    );

    await transporter.sendMail({
      from: `"True Feedback" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "True Feedback | Verification Code",
      html: emailHtml,
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
