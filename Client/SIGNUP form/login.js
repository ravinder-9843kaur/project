document.getElementById("btn").addEventListener('click',(e)=> {
    e.preventDefault()
    // const user_name = document.getElementById('name').value
    const user_email = document.getElementById('email').value
    const user_password = document.getElementById('password').value
    // const user_dob= document.getElementById('dob').value

    const users = {
        // name: user_name,
        email: user_email,
        password: user_password,
        // dob: user_dob
    }
    // http://localhost:8081/users
   const url = `http://localhost:8081/users`
   const xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.setRequestHeader('Access-Control-Allow-Origin','*')
    xhr.setRequestHeader('Content-Type','application/json')

    xhr.onreadystatechange = () => {
        if(xhr.status ==200 && xhr.readyState == 4){
            res = JSON.parse(xhr.responseText)
           console.log(res)
            for (let i = 0; i < res.length; i++)
            {
                if (res[i].email==user_email && res[i].password==user_password )
                {
                   window.location.href="http://127.0.0.1:5500/ajax.html"
                    
                }
                else (res[i].email!=user_email && res[i].password!=user_password)
                {
                    document.getElementById('warning').innerHTML=`invalid user`
                }
             
            }
        }
    }
    xhr.send()
})