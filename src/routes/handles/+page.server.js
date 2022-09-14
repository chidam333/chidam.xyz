/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({locals,request}) => {
      const data= await request.formData();
      const name = data.get('name');
      const email = data.get('email');
      const content = data.get('content');
      console.log(name,email,content);
      const{sql}=locals;
      await sql `insert into info(name,email,text) values(${name},${email},${content});`;
      return { success: true };
    }
  };