/*
    View (html) : Sẽ đặt theo form api
    model (class): Sẽ đặt tên theo view
*/

export class Person 
{
    PersonID = '';
    hoTen = '';
    diaChi = '';
    email = '';
    loai = '';
    Toan = '';
    Ly = '';
    Hoa = '';
    ngayLam = '';
    Luong = '';
    congTy = '';
    hoaDon = '';
    danhGia = '';

    tinhDiemTB = function() {
        let diemTB = ((this.Toan / 3) + (this.Hoa / 3) + (this.Ly / 3)).toFixed(2);
        return diemTB;
    }
    
    tinhLuong = function() {
        let Luong = this.ngayLam * this.Luong;
        return Luong;
    }
}
