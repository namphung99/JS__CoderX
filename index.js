/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');

var arrContact =  loadData();
function showMenu() {
    console.log('--------- Danh Sách Lựa Chọn------------');
    console.log('1.Nhập dữ liệu contact (name, phone number): ');
    console.log('2.Sửa dữ liệu contact');
    console.log('3.Xoá contact');
    console.log('4.Tìm kiếm contact:');
    console.log('----------------------------------------');
    var option = readlineSync.question('>');
    switch(option) {
        case '1':
            addContact ();
            break;
        case '2':
            editContact();
            break;
        case '3':
            deleteContact();
            break;
        case '4':
            findContact();
            break;
    }

}
function loadData(){
    fileContacts = fs.readFileSync('./data.json',{encoding: 'utf8'});
    var contacts = JSON.parse(fileContacts);
    for(let i =0;i<contacts.length;i++){
        contacts[i].id = i+1;
    }
    return contacts;
}

function addContact() {
   var name = readlineSync.question('Add name: ');
   var phoneNumber = readlineSync.question('Add phone number: ');
   var idObj = arrContact.length +1;
   var objContact = {
       id: idObj,
        name: name,
        phoneNumber: phoneNumber
   };
   arrContact.push(objContact);
   var strContract = JSON.stringify(arrContact);
   fs.writeFileSync('./data.json',strContract);
   console.log(arrContact);
}

function editContact() {

    console.log(arrContact);
    
    var nameEdit = readlineSync.question('name edit: ');
    var idEdit = parseInt(readlineSync.question('id edit: '));  
        var arrFind = arrContact.find(function(x){
            return (x.name === nameEdit&&parseInt(x.id)===idEdit);
        });
        if(typeof arrFind === 'object')
        {
            console.log('sdt dc tim thay la: ',arrFind); 
            var nameChange = readlineSync.question('name change: ');
            var phoneChange = readlineSync.question('phone change: ');
            arrContact[idEdit-1].name= nameChange;
            arrContact[idEdit-1].phoneNumber = phoneChange;
            savefile(arrContact);
        }
       else console.log('wrong!');
    

}
function savefile(arr){
    var strContract = JSON.stringify(arr);
   fs.writeFileSync('./data.json',strContract);
}

function deleteContact (){
    var nameDelete = readlineSync.question('name Delete: ');
    var idDelete = parseInt(readlineSync.question('id Delete: '));  
        var contactFind = arrContact.find(function(x){
            return (x.name === nameDelete&&parseInt(x.id)===idDelete);
        });
    if (typeof contactFind === 'object'){
        console.log('sdt duoc tim thay: ',contactFind);
        arrContact.splice(idDelete-1,1);
        savefile(arrContact);
        console.log('danh ba con lai: ',arrContact);
    }

}

 function main(){
     loadData();
     //console.log(contacts);
    showMenu();
 }
main();
 //loadData();