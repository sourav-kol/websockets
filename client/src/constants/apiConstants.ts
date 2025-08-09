const Baseurl = "http://localhost:8080";

export const ApiRoutes = {
    User:{
        CreateUser: `${Baseurl}/user`,
    },
    Group: {
        CreateGroup:`${Baseurl}/group`,
        PagedList: `${Baseurl}/group/paged`,
    }
}