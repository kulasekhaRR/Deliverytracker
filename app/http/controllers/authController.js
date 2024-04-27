const User=require('../../models/user')
const bcrypt=require('bcrypt')
function authController(){
    return {
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
            const {name,email,password} = req.body ;
            if(!name || !email || !password){
                req.flash('error','All fields are required')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }

            //const user = await User.exists({ email: email });
            if (User.exists({ email: email })) {
                req.flash('error', 'Email already register');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            const hashedPassword = await bcrypt.hash(password,10)
            const user=new User({
                name,
                email,
                password:hashedPassword
            })

            user.save().then((user)=>{
                console.log('ytvkyhg')
                return res.redirect('/')
            }).catch(err=>{
                req.flash('error','something went wrong')
                return res.redirect('/register')
            })
        }
    }
}
module.exports=authController  