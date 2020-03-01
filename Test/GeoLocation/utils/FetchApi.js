import { get } from '../store/AsyncStorage';
export const Fetch = async(request) =>{
    let userToken='';
    if(request.isAuthorized){
        userToken= await get("access");
    }
    let response = await fetch(request.url,{
        method:request.method,
        headers: new Headers({
            'content-type': 'application/json',
            'Authorization': userToken
        }),
        body:JSON.stringify(request.body)
    });
    return await response.json();
}