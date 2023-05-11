import { Person} from "../models/Person.js"
import { List } from "../models/List.js"
/*
    Nút thêm người
*/


let personList = new List();
personList.tieuDe = 'List Person';
console.log('personList',personList);

document.querySelector('#btnThemMon').onclick = () =>
{
    let nguoiMoi = new Person();
    let arrInput = document.querySelectorAll('#PersonForm input, #PersonForm select');

    for(let input of arrInput)
    {
        let{id,value} = input;
        nguoiMoi[id] = value;
    }
    //Thêm object món ăn đó vào thuộc tính mangPerson của ob personList
    personList.themNguoiDung(nguoiMoi);

    // Gọi hàm render món ăn 
    personList.renderDanhSachPerson('tbody');
    //Tắt modal
    document.querySelector('[data-dismiss=modal]').click();
    //Lưu món ăn vào localstorage
    personList.LuuPerson();



}
window.onload = () => //Sự kiện của window load
{
    personList.LayPerson();//Lấy dữ liệu từ storage gán lên personList.mangPerson 
    personList.renderDanhSachPerson('tbody');// Sử dụng personList.mangPerson để đưa lên giao diện tbody
}
window.xoaPerson = (maPersonXoa) => 
{
    //Gọi hàm xóa món ăn  
    if(personList.xoaPerson(maPersonXoa))
    {
        //Nếu xóa  thành công thì render lại table mới
        personList.renderDanhSachPerson('tbody');
    }
}
window.suaPerson = (maPerson) =>
{
    let personChinhSua = personList.layThongTinPersong(maPerson);
    if(personChinhSua)
    {
        let arrInput = document.querySelectorAll('#PersonForm input, #PersonForm select');
        for(let input of arrInput)
        {
            let {id} = input;
            input.value = personChinhSua[id];
        }
        
        document.querySelector('#btnThem').click();
    }
}
document.querySelector('#btnCapNhat').onclick = () =>
{
    let personCapNhat = new Person();
    let arrInput = document.querySelectorAll('#PersonForm input, #PersonForm select');

    for(let input of arrInput)
    {
        let{id,value} = input;
        personCapNhat[id] = value;
    }

    personList.capNhatPerson(personCapNhat.PersonID,personCapNhat);
    //Render lại
    personList.renderDanhSachPerson('tbody');
   //Tắt modal
   document.querySelector('[data-dismiss=modal]').click();
}

document.querySelector('#selLoai').oninput = (e) =>
{
    let loai = e.target.value;
    console.log(loai);

    let arrPersonBackup = [...personList.mangPerson];//Lưu lại giá trị mảng full

    personList.filterPerson(loai);

    personList.renderDanhSachPerson('tbody');

    personList.mangPerson = arrPersonBackup;
}

