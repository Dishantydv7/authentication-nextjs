import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail =  async ({email , emailType , userId}:any) => {
    try {
            // genrating a verify token
             const hashedToken = await bcryptjs.hash(userId.toString() , 10 )
            // configuring email with respect to use case :

            if(emailType === 'VERIFY'){
                await User.findByIdAndUpdate(userId , {$set : {verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 3600000}})
            }
            else if (emailType === 'RESET') {
                await User.findByIdAndUpdate(userId , {forgotPasswordToken : hashedToken , forgotPasswordTokenExpiry : Date.now() + 3600000})

            }
                            var transport = nodemailer.createTransport({

                                // these fields need to be stored in .env file 🔥🔥🔥
                            host: "sandbox.smtp.mailtrap.io",
                            port: 2525,
                            auth: {
                                user: "e4cde1267a02c0",  
                                pass: "********b2b4"
                            }
                            });

 const mailOptions = {
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', 
                to : email, 
                subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", 
                html: `<p>Click here <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" > here</a> to {emailType === "VERIFY" ? "verify your email"  :"reset your password"} or copy and paste the link in  your browser
                <br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`, // html body
  }

    const mailResponse =  await transport.sendMail(mailOptions);
    
    return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}