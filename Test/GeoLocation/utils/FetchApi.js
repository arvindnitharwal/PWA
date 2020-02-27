const Fetch = async (request) =>{
    try {
        let response = await fetch(request.url,{
            method:request.method,
            body:JSON.stringify(request.body)
        });
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
    }
}
export default FetchApi;