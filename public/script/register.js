const base_url = 'http://localhost:8090'
document.getElementById('submit').addEventListener('click', async ()=>{
    const message = await register()
    console.log(message.message)
});

async function register(){
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('pwd').value;

    try {
        const response = await fetch(`${base_url}/register`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        body: JSON.stringify({username, email, pwd})
        });
        if(response.status === 201){
            const response = await logIn(username, pwd);
            if(response.status === 200){
                openHome()
            }
        }
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export async function logIn(input, pwd) {
    try {
        const response = await fetch(`${base_url}/auth`, {
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
export async function openHome(){
    try {
        const response = await fetch(`${base_url}/home`, {
        credentials: 'include'
        });
        window.location.href = response.url
    } catch (error) {
        console.log(error)
    }
}