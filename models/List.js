import { Person } from "./Person.js";

/*
    Trong model sẽ không xử lý dom, nếu muốn dom thì phải đưa selector thành tham số của hàm
*/
document.querySelector(".modal-body-form #PersonForm").onchange = () => {
    let rowSinhVienThongBao = document.querySelectorAll(".sinhVienInputContainer .sp-thongbao");
    let rowNhanVienThongBao = document.querySelectorAll(".nhanVienInputContainer .sp-thongbao");
    let rowKhachHangThongBao = document.querySelectorAll(".khachHangInputContainer .sp-thongbao");
    let PersonLoai = document.querySelector("#loai").value;
    if (PersonLoai == 'Student') {
        document.querySelector(".sinhVienInputContainer").style.display = "block";
        document.querySelector(".khachHangInputContainer").style.display = "none";
        document.querySelector(".nhanVienInputContainer").style.display = "none";

    } else if (PersonLoai == 'Employee') {
        document.querySelector(".sinhVienInputContainer").style.display = "none";
        document.querySelector(".nhanVienInputContainer").style.display = "block";
        document.querySelector(".khachHangInputContainer").style.display = "none";
    } else if (PersonLoai == 'Customer') {
        document.querySelector(".sinhVienInputContainer").style.display = "none";
        document.querySelector(".nhanVienInputContainer").style.display = "none";
        document.querySelector(".khachHangInputContainer").style.display = "block";

    } else if (PersonLoai == 0) {
        document.querySelector(".sinhVienInputContainer").style.display = "none";
        document.querySelector(".nhanVienInputContainer").style.display = "none";
        document.querySelector(".khachHangInputContainer").style.display = "none";

    }
    
}
export class List {
    tieuDe = '';
    mangPerson = [];

    themNguoiDung(nguoiMoi)
    {
        this.mangPerson.push(nguoiMoi);
        return this.mangPerson;
    }

    renderDanhSachPerson(selector)
    {
        let trPerson ="";
        for (let person of this.mangPerson)   
        {   
            let nguoiMoi = new Person();
            nguoiMoi = {...nguoiMoi,...person}
            trPerson += `
            <tr class ="odd">
                <td>${nguoiMoi.PersonID}</td>
                <td>${nguoiMoi.loai}</td>
                <td>${nguoiMoi.hoTen}</td>
                <td>${nguoiMoi.diaChi}</td>
                <td>${nguoiMoi.email}</td>
                <td>${nguoiMoi.tinhLuong()}</td>
                <td>${nguoiMoi.tinhDiemTB()}</td>
                <td>${nguoiMoi.congTy}</td>
                <td>${nguoiMoi.hoaDon}</td>
                <td>${nguoiMoi.danhGia}</td>
                <td class="d-flex">
                <button class="btn btn-danger" onclick="xoaPerson('${nguoiMoi.PersonID}')">Xóa</button>
                <button class="btn btn-primary" onclick="suaPerson('${nguoiMoi.PersonID}')">Sửa</button>
                </td>
                    
        </tr>
        `;
        }
        document.querySelector(selector).innerHTML = trPerson;
        return trPerson;
    }
    LuuPerson()
    {
        let sMangPerson = JSON.stringify(this.mangPerson);
        localStorage.setItem('MANG_PERSON',sMangPerson);
    }
    LayPerson()
    {
        if(localStorage.getItem('MANG_PERSON'))
        {
            //Lấy dữ liệu từ storage ra
            let mangPerson = JSON.parse(localStorage.getItem('MANG_PERSON'));
            //Gán cho thuộc tính person
            this.mangPerson = mangPerson;
        }
    }

    xoaPerson(maPerson)
    {
        let indexDel = this.mangPerson.findIndex(per => per.PersonID == maPerson);
        if(indexDel !== -1)
        {
            this.mangPerson.splice(indexDel,1);
            return true;
        }
        return false;
    }
    layThongTinPersong(PersonID)
    {
        let personChinhSua = this.mangPerson.find(per => per.PersonID == PersonID);
        return personChinhSua;
    }
    capNhatPerson (PersonID,personCapNhat)
    {
        let personTrongMang = this.layThongTinPersong(PersonID);
        if(personTrongMang)
        {
            for(let key in personTrongMang)
            {
                personTrongMang[key] = personCapNhat[key];
            }
            return true;
        }
        return false;
    }
    
    filterPerson(value) { //loai1, loai2
        if(value !=='all')
        {
       this.mangPerson = this.mangPerson.filter(per => per.loai === value)
        }
       return this.mangPerson;
        //output mangMonAn sau khi filter
    }

}