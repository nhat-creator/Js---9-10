import NhanVien from "../models/NhanVien.js";
import DanhSachNV from "../models/DanhSachNV.js";
import Validation from "../models/validation.js";
// DOM tới id
export function getID(id){
    return document.getElementById(id);
}



// Danh sách nhân viên
let DanhSach = new DanhSachNV();

let Valid = new Validation();

getLocalStorage();

// Lấy thông tin nhân viên
function getInfoNV(){
    let NV = new NhanVien();
    NV.taiKhoan = getID("tknv").value;
    NV.hoTen = getID("name").value;
    NV.email = getID("email").value;
    NV.matKhau = getID("password").value;
    NV.ngayLam = getID("datepicker").value;
    NV.luongCoBan = getID("luongCB").value * 1; // number
    NV.chucVu = getID("chucvu").value;
    NV.gioLam = getID("gioLam").value * 1; // number

     // Tính tổng lương nhân viên
    NV.calcTongLuong();
    // Xếp loại nhân viên
    NV.calcXepLoai();

    //? VALIDATION
    let isValid = true; // Biến kiểm tra Validation
    // Tài khoản tối đa 4-6 ký tự, không để trống
    isValid &= Valid.isEmpty(NV.taiKhoan, "tbTKNV", "Vui lòng nhập thông tin tài khoản, không được để trống") && Valid.isTaiKhoan(NV.taiKhoan, "tbTKNV", "Tài khoản chỉ được tối đa 4-6 ký số");
    
    // Tên nhân viên phải là chữ, không để trống
    isValid &= Valid.isEmpty(NV.hoTen, "tbTen", "Vui lòng nhập họ tên, không được để trống") && Valid.isCharacterString(NV.hoTen, "tbTen", "Họ và tên nhân viên phải là chữ");
    
    // Email phải đúng định dạng, không để trống
    isValid &= Valid.isEmpty(NV.email, "tbEmail", "Vui lòng nhập email, không được để trống") && Valid.isEmail(NV.email, "tbEmail", "Vui lòng nhập đúng định dạng email");

    // Mật khẩu phải từ 6-10 ký tự(chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống
    isValid &= Valid.isEmpty(NV.matKhau, "tbMatKhau", "Vui lòng nhập mật khẩu, không được để trống") && Valid.isPassword(NV.matKhau, "tbMatKhau", "Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    // Ngày làm không để trống, định dạng mm/dd/yyyy
    isValid &= Valid.isEmpty(NV.ngayLam, "tbNgay", "Vui lòng chọn ngày làm, không được để trống") && Valid.isDate(NV.ngayLam, "tbNgay", "Vui lòng chọn ngày làm đúng định dạng");

    // Lương cơ bản 1tr - 20tr, không để trống
    isValid &= Valid.isEmpty(NV.luongCoBan, "tbLuongCB", "Vui lòng nhập lương cơ bản, không được để trống") && Valid.isLuongCB(NV.luongCoBan, "tbLuongCB", "Lương cơ bản phải từ 1 000 000 đồng đến 20 000 000 đồng");

    // Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng phòng, Nhân viên)
    isValid &= Valid.isChooseChucVu(NV.chucVu, "tbChucVu", "Vui lòng chọn chức vụ, không được để trống");

    // Số giờ làm trong tháng 80-200 giờ, không để trống
    isValid &= Valid.isEmpty(NV.gioLam, "tbGiolam", "Vui lòng nhập giờ làm, không được để trống") && Valid.isGioLam(NV.gioLam, "tbGiolam", "Giờ làm phải trong tháng phải từ 80-200 giờ");

    if(isValid == false) return;
    return NV;
}

// Render danh sách nhân viên
function renderDanhSachNhanVien(list){
    let contentHTML = "";
    for(let i=0; i<list.length; i++){
        let NV = list[i];
        contentHTML += `
            <tr>
                <td>${NV.taiKhoan}</td>
                <td>${NV.hoTen}</td>
                <td>${NV.email}</td>
                <td>${NV.ngayLam}</td>
                <td>${NV.chucVu}</td>
                <td>${NV.tongLuong}</td>
                <td>${NV.xepLoai}</td>
                <td>
                    <button class="btn btn-danger" style="margin-bottom: 0.5rem;" onclick="handleDelete(${NV.taiKhoan})">Xóa</button>
                    <button class="btn btn-info" onclick="handleEdit(${NV.taiKhoan})" data-toggle="modal" data-target="#myModal">Cập nhật</button>
                </td> 
            </tr>
        `
    }
    getID("tableDanhSach").innerHTML = contentHTML;
}

// Lưu thông tin vào localStorage
function setLocalStorage(){
    // Chuyển DanhSach.arr --> string
    let dataString = JSON.stringify(DanhSach.arr);
    localStorage.setItem("DanhSachNhanVien", dataString);
}

// Hiển thị danh sách nhân viên từ localStorage
function getLocalStorage(){
    let dataString = localStorage.getItem("DanhSachNhanVien");

    if(dataString == null) return;

    // Chuyển string --> arr
    let dataJson = JSON.parse(dataString);

    // Hiển thị
    DanhSach.arr = dataJson;
    renderDanhSachNhanVien(DanhSach.arr);
}
// Button "Thêm nhân viên"
getID("btnThem").addEventListener("click", function(){
    getID("header-title").innerHTML = "Thông tin nhân viên";
    getID("btnThemNV").style.display = "block";
    getID("btnCapNhat").style.display = "none"
});
//! THÊM NHÂN VIÊN VÀO DANH SÁCH
getID("btnThemNV").addEventListener("click", function(){
    // DOM
    let NV = getInfoNV();
    if(NV == undefined) return;
    // Thêm nhân viên vào Danh sách nhân viên
    DanhSach.add(NV);
    // Hiển thị ra danh sách nhân viên
    renderDanhSachNhanVien(DanhSach.arr);
    // Lưu vào local storage
    setLocalStorage();
    
    // Reset lại dữ liệu khi về trống
    getID("tknv").value = "" // number
    getID("name").value = "";
    getID("email").value = "";
    getID("password").value = "";
    getID("datepicker").value = "";
    getID("luongCB").value = ""; // number
    getID("chucvu").value = "";
    getID("gioLam").value = ""; // number

});

//! XÓA NHÂN VIÊN KHỎI DANH SÁCH
function handleDelete(id){
    DanhSach.delete(id);
    renderDanhSachNhanVien(DanhSach.arr);
    setLocalStorage();
}
window.handleDelete = handleDelete;

//! CẬP NHẬT THÔNG TIN NHÂN VIÊN
// Khi nhấn vào cập nhật phải DOM tới các thông tin để sửa
function handleEdit(id){
    getID("header-title").innerHTML = "Cập nhật thông tin";
    getID("btnThemNV").style.display = "none";
    getID("btnCapNhat").style.display = "block";

    let NV = DanhSach.getNVByTaiKhoan(id);
    getID("tknv").value = NV.taiKhoan;
    getID("tknv").disabled = true;
    getID("name").value = NV.hoTen;
    getID("email").value = NV.email;
    getID("password").value = NV.matKhau;
    getID("datepicker").value = NV.ngayLam;
    getID("luongCB").value = NV.luongCoBan; // number
    getID("chucvu").value = NV.chucVu;
    getID("gioLam").value = NV.gioLam; // number
}
window.handleEdit = handleEdit;
// Khi nhấn nút cập nhật thì thông tin được đổi
getID("btnCapNhat").addEventListener("click", function(){
    let NV = getInfoNV();
    DanhSach.update(NV);
    renderDanhSachNhanVien(DanhSach.arr);
    setLocalStorage();
    // Thông báo để biết đã cập nhật thông tin nhân viên thành công
    alert("Bạn đã cập nhật thông tin nhân viên thành công");
});


//! TÌM NHÂN VIÊN THEO LOẠI (XUẤT SẮC, GIỎI, KHÁ,...) VÀ HIỂN THỊ
getID("btnTimNV").addEventListener("click", function(){
    let keyword = getID("searchName").value;
    //console.log(keyword);
    let ListSearch = DanhSach.search(keyword);
    renderDanhSachNhanVien(ListSearch);
});