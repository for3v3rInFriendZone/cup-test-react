import AxiosClient from "../apis/AxiosClient"

export const login = async function(username, password){
    const cred={
        username:username,
        password: password
    }

    try{
        const ret = await AxiosClient.post('korisnici/auth', cred);
        window.localStorage.setItem('jwt', ret.data);
    }catch(error){
        console.log(error);
    }
    window.location.reload();
}

export const logout = function(){
    window.localStorage.removeItem('jwt');
    window.location.reload();
}