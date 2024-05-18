const getall = async () => {
    try {
        const response = await fetch('http://localhost:8090/employee');
        const data = await response.json();
        return data
    } catch (error) {
    }
}
const get1 = async () => {
    
    try {
        const response = await fetch('http://localhost:8090/employee/1');
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
const get2 = async () => {
    try {
        const response = await fetch('http://localhost:8090/employee/2');
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
const textBody = document.getElementById('txt');
document.getElementById('getall').addEventListener('click', async ()=>{
    textBody.innerText = "Loading";
    let data = await getall();
    if(data){
        textBody.innerText = `Id: ${data[0].id}\nFirstname: ${data[0].firstname}\nLastname: ${data[0].lastname}\n\nId: ${data[1].id}\nFirstname: ${data[1].firstname}\nLastname: ${data[1].lastname}`
    } 
});
document.getElementById('get1').addEventListener('click', async ()=>{
    textBody.innerText = "Loading";
    let data = await get1();
    if(data){
        textBody.innerText = `Id: ${data.id}\nFirstname: ${data.firstname}\nLastname: ${data.lastname}`
    } 
});
document.getElementById('get2').addEventListener('click', async ()=>{
    textBody.innerText = "Loading";
    let data = await get2();
    if(data){
        textBody.innerText = `Id: ${data.id}\nFirstname: ${data.firstname}\nLastname: ${data.lastname}`
     } 
});