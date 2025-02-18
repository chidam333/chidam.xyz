import {users} from "../../schema"
import {USER_ID,ZOHO_AUTH,GOOGLE_PWD,GOOGLE_USER_ID} from "$env/static/private"
import nodemailer from "nodemailer"
/** @type {import('./$types').Actions} */
/** @type {import('./$types').PageLoad} */
export const actions = {
    default: async ({locals,request}) => {
      const data= await request.formData();
      const name = data.get('name');
      const email = data.get('email');
      const content = data.get('content');
      const {db}=locals;
      try{
        await db.insert(users).values({name,email,content})
        let configOption = {
          host: "smtp.gmail.com",
          port: 587,
          auth:{
            user:GOOGLE_USER_ID,
            pass:GOOGLE_PWD
          }      
        }
        let transporter = nodemailer.createTransport(configOption)
        let message = {
          from:'chidam <chidam3work@gmail.com>',
          to:`${email}`,
          cc:'<chidam3work@gmail.com>,<chidam3chain@gmail.com>',
          subject:`${name} thank you ! will get back to you soon!`,
          html:`If you have more questions hmu on chidam3work@gmail.com thanks ! `
        }
        await transporter.sendMail(message)
      }catch(error){
        return {fail:true}
      }
      return { success: true };
    }
  };