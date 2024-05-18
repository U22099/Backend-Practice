async function logIn(input, pwd) {
    try {
        const response = await fetch('http://localhost:8090/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({input, pwd})
        });
        return await response
    } catch (error) {
        console.log(error)
    }
}
async function openHome(data){  
    try {
        const response = await fetch('http://localhost:8090/home', {
        credentials: 'include'
        });
        window.location.href = response.url
    } catch (error) {
        console.log(error)
    }
}
document.getElementById('submit').addEventListener('click', async ()=>{
    const input = document.getElementById('input').value;
    const pwd = document.getElementById('pwd').value;
    const response = await logIn(input, pwd);
    if(response.status === 200){
        openHome()
    } else {
        input.style.borderBottom = '3px solid red'
        pwd.style.borderBottom = '3px solid red'
        console.log(response.message);
    }
})