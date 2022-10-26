export default class UserInfo {
    constructor(name, about) {
        this._userName = name;
        this._userJob = about;
        this._avatar = document.querySelector('.profile__avatar');
    }
    
    getUserInfo(){
        return {
            name: this._userName.textContent, 
            about: this._userJob.textContent
        };
    }

    setUserInfo(data){
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._avatar.alt = `Аватар пользователя: ${data.name}`;

        this.userId = data._id;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
      }
}