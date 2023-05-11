import { Person } from "../models/Person.js"

/*
    Nút thêm người
*/

let mangPerson = [];
document.querySelector('#btnThemMon').onclick = function()
{
    let nguoiMoi = new Person();
    let arrInput = document.querySelectorAll('#PersonForm input, #PersonForm select');

    for(let input of arrInput)
    {
        let{id,value} = input;
        nguoiMoi[id] = value;
    }

    console.log('nguoiMoi',nguoiMoi);


    //output
    let trPerson =`
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
        <td><button class="btn btn-danger">Xóa</button>
            <button class="btn btn-success">Chỉnh sửa</button></td>
    </tr>
    `;

    document.querySelector('tbody').innerHTML += trPerson;

    //thêm món ăn vào mảng
    mangPerson.push(nguoiMoi)
    //lưu vào localstorage
    luuLocalStorage()

}
let luuLocalStorage = () => 
{
    let data = JSON.stringify(mangPerson);
    localStorage.setItem('mangPerson',data);
}
window.renderPerson = function(arrPerson) 
{
    let trPerson ="";
    for (let person of arrPerson)   
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
            <td><button class="btn btn-danger">Xóa</button>
                <button class="btn btn-success">Chỉnh sửa</button></td>
    </tr>
    `;
    }
    document.querySelector('tbody').innerHTML = trPerson
}
let layLocalStorage = () =>
{
    if(localStorage.getItem('mangPerson'))
    {
        let data = localStorage.getItem('mangPerson');
        mangPerson = JSON.parse(data);
        //Gọi hàm render mangPerson ra giao diện
        renderPerson(mangPerson);
    }
}
layLocalStorage();
