import jwt from "jsonwebtoken";
const { verify } = jwt;

export const decodeToken = (token) => {
    let decode = token;
    if(token) {
         decode = jwt.verify(token, 'shhhhh');
    }
    return decode;
}