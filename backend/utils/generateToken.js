
import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{

   const token=jwt.sign({userId},"chhayabagwan",{
    expiresIn:'15d'});
    res.cookie("jwt",token,{
        maxAge:15*24*60*1000, // MS
        httpOnly:true,
        someSite:"strict",
        secure:process.env.NODE_ENV !=="development"
    })
}
export default generateTokenAndSetCookie;
