import {users} from "../../schema"
import {USER_ID,ZOHO_AUTH} from "$env/static/private"
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
          host: "smtppro.zoho.in",
          port: 587,
          auth:{
            user:USER_ID,
            pass:ZOHO_AUTH
          }      
        }
        let transporter = nodemailer.createTransport(configOption)
        let message = {
          from:'chidam <dev@chidam.xyz>',
          to:'<dev@chidam.xyz>,<chidam3chain@gmail.com>',
          subject:'A new message in the chidam.xyz db',
          html:`${name} with email id of ${email} has sent you a msg <br/>
          "${content}"`
        }
        await transporter.sendMail(message)
      }catch(error){
        return {fail:true}
      }
      return { success: true };
    }
  };