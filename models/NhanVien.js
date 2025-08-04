export default class NhanVien{
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam){
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = luongCoBan;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = 0;
        this.xepLoai = "";
    }

    // Tính tổng lương nhân viên
    calcTongLuong(){
        if(this.chucVu === "Sếp"){ // Giám đốc
            this.tongLuong = this.luongCoBan * 3;
        }
        else if(this.chucVu === "Trưởng phòng"){ // Trưởng phòng
            this.tongLuong = this.luongCoBan * 2;
        }
        else{ // Nhân viên
            this.tongLuong = this.luongCoBan;
        }
    }

    // Tính xếp loại nhân viên
    calcXepLoai(){
        if(this.gioLam >= 192){
            this.xepLoai = "Xuất sắc";
        }
        else if(this.gioLam >=176){
            this.xepLoai = "Giỏi";
        }
        else if(this.gioLam>=160){
            this.xepLoai = "Khá";
        }
        else{
            this.xepLoai = "Trung bình";
        }
    }
}