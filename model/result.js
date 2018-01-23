/**
 * Created by linchenpeng on 2017/4/13.
 */
function LoginResult(code,message,user) {
    this.code=code;
    this.message=message;
    this.user=user;
}

LoginResult.prototype.showInfo=function () {
    console.info(this.code+","+this.message);
};
LoginResult.prototype.gender=function (gender) {
    this.gender=gender;
};
module.exports=LoginResult;