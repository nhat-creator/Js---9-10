import { getID } from "../controllers/main.js";

export default class Validation{
    // Kiểm tra xem trường thông tin đã điền hay chưa
    isEmpty(name, divID, message){
        if(name == ""){
            getID(divID).innerHTML = message;
            getID(divID).style.display = "block";
            return false;
        }
        getID(divID).innerHTML = "";
        getID(divID).style.display = "none";
        return true;
    }

    // Kiểm tra xem đã chọn chức vụ hay chưa
    isChooseChucVu(name, divID, message){
        if(name == "Chọn chức vụ"){
            getID(divID).innerHTML = message;
            getID(divID).style.display = "block";
            return false;
        }
        getID(divID).innerHTML = "";
        getID(divID).style.display = "none";
        return true;
    }

    // Kiểm tra xem tài khoản có thỏa mãn hay không
    isTaiKhoan(name, divID, message){
        const integer = /^[0-9]+$/;
        if(integer.test(name) && name.length <= 6){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }

    // Kiểm tra chữ
    isCharacterString(name, divID, message){
        const letter = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
        if(letter.test(name)){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }

    // Kiểm tra email
    isEmail(name, divID, message){
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.test(name)){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }

    // Kiểm tra mật khẩu
    isPassword(name, divID, message){
        const password = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
        if(password.test(name) && name.length >= 6 && name.length <= 10){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }

    // Kiểm tra ngày
    isDate(name, divID, message){
        const date = /^\d{2}\/\d{2}\/\d{4}$/;
        if(date.test(name)){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }

    // Kiểm tra lương cơ bản
    isLuongCB(luongCB, divID, message){
        if(luongCB >= 1000000 && luongCB <= 20000000){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }
    
    // Kiểm tra số giờ làm
    isGioLam(gioLam, divID, message){
        if(gioLam >= 80 && gioLam <= 200){
            getID(divID).innerHTML = "";
            getID(divID).style.display = "none";
            return true;
        }
        getID(divID).innerHTML = message;
        getID(divID).style.display = "block";
        return false;
    }
}