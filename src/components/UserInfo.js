export default class UserInfo {
    constructor({name, job}) {
        this._userName = name;
        this._userJob = job;
    }
    
    getUserInfo(){
        return {
            name: this._userName.textContent, 
            job: this._userJob.textContent
        };
    }

    setUserInfo(data){
        this._userName.textContent = data.profileName;
        this._userJob.textContent = data.profileJob;
    }
}