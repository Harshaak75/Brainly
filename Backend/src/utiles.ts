export const random = (len: number) =>{
    const str = "qwertyuiopasdfghjklzxcvbnmuhygv1234567890";
    const str_len = str.length;

    let random_str = "";

    for(var i = 0;i < len;i++){
        random_str += str[Math.floor(Math.random() * str_len)]
    }

    return random_str;
}