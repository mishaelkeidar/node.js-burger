const validSignUp = () => {
    let firstName = document.forms['signup_form']['firstName'].value;
    let lastName = document.forms['signup_form']['lastName'].value;
    let emailAddress = document.forms['signup_form']['emailAddress'].value;
    let password = document.forms['signup_form']['createPassword'].value;
    let confirmPassword = document.forms['signup_form']['confirmPassword'].value;

    if (firstName.length <= 2 || firstName.length >= 20) {
        return false;
    }

    if (lastName.length <= 2 || lastName.length >= 20) {
        return false;
    }

    if (emailAddress.indexOf('@') == -1) {
        return false;
    }

    let special = (/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\<\,\>\?]/)
    let res = password.match(special)
    if ((password.length <= 2 || password.length >= 10) || (!res)) {
        return false;
    }

    if (confirmPassword != password) {
        return false;
    }

    return true;
}

function validSignIn() {

    let myEmail = document.getElementById('email').value;
    let myPassword = document.getElementById('password').value;
    fetch("/signin", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify({
                email: myEmail,
                password: myPassword
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data == null) {
                alert('error')
            } else {
                let nameFromServer = data.firstname
                console.log(nameFromServer);
                localStorage.setItem('myName', nameFromServer);
                location.href = 'menu.html'
            }

        })
        .catch((err) => {
            if (err) throw err;
        })
}