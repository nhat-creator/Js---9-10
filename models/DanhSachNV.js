export default class DanhSachNV{
    constructor(){
        this.arr = [];
    }

    // Tìm nhân viên theo id
    findIndexByTaiKhoan(taiKhoan){
        let index = -1;
        for(let i=0; i<this.arr.length; i++){
            let NV = this.arr[i];
            if(NV.taiKhoan == taiKhoan){
                index = i;
                break;
            }
        }
        return index;
    }

    getNVByTaiKhoan(taiKhoan){
        let index = this.findIndexByTaiKhoan(taiKhoan);
        return this.arr[index];
    }

    // Thêm nhân viên vào danh sách
    add(NV){
        this.arr.push(NV);
    }

    // Xóa nhân viên khỏi danh sách
    delete(taiKhoan){
        let index = this.findIndexByTaiKhoan(taiKhoan);
        if(index != -1){
            this.arr.splice(index, 1);
        }

    }
    // Cập nhật thông tin nhân viên
    update(NV){
        let index = this.findIndexByTaiKhoan(NV.taiKhoan);
        if(index != -1){
            // Cập nhập thông tin nhân viên
            this.arr[index] = NV;
        }
    }
    // Tìm nhân viên theo loại
    search(keyword){
        let ListSearch = [];
        for(let i=0; i<this.arr.length; i++){
            let NV = this.arr[i];
            // Chuyển keyword --> chữ thường 
            let keywordLowerCase = keyword.toLowerCase();
            // Chuyển xếp loại --> Chữ thường
            let xepLoaiLowerCase = NV.xepLoai.toLowerCase();

            if(xepLoaiLowerCase.indexOf(keywordLowerCase) > -1){
                ListSearch.push(NV);
            }
        }
        return ListSearch;
    }
}