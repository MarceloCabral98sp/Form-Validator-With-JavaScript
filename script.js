const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Mostrar msg de sucesso
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Mostrar msg de erro
function showError(input, msg){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerHTML = msg;
}

// Checar se campos estão vazios
function checkFields(inputArr){

    inputArr.forEach( input => {
        if(input.value.trim() === ""){

            showError(input, `Esse campo é obrigatório`);
        }
        else{
            showSuccess(input);
        }
    });
}

// Checar tamanho da string
function checkLength(input, min, max){

    if(input.value.length < min){
        showError(input, `Esse campo deve ter no mínimo ${min} caracteres`)
        return false;
    }
    else if(input.value.length > max){
        showError(input, `Esse campo deve ter no máximo ${max} caracteres.`)
        return false;
    }
    else{
        showSuccess(input);
        return true;
    }
}

// Checar se email é válido
function checkEmail(input){
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    
    !emailPattern.exec(input.value.trim()) ? showError(input, "Email em formato inválido") : showSuccess(input);
}

// Checar se senhas são iguais
function checkPasswords(password, password2){

    const passwordPattern = /^(?=(?:.*?[A-Z]){3})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    if(passwordPattern.exec(password.value)){
        if(password.value !== password2.value){
            showError(password2, `Senhas divergentes`);
        }
        else{
            showSuccess(password2);
        }
    }
    else{
        showError(password, `A senha deve conter no mínimo 3 caracteres em maiúsculo, 2 números e 1 caractere especial!`);

    }
}

// Event listeners
form.addEventListener("submit", function(e){

    e.preventDefault();
    checkFields([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 3, 15);
    checkEmail(email);
    if(checkLength(password, 3, 15)){
        checkPasswords(password, password2);
    }
});