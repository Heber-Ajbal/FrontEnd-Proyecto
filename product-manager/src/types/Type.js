export var  AuthResponse = {
    body: {
        token: String,
        id:String,
        name:String,
    }
};

export const AuthResponseError = {
    body:{
        error: String
    }
};