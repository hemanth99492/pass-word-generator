function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;

    if (length < 4) {
        document.getElementById('result').innerText = "Password length should be at least 4 characters.";
        return;
    }

    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecial) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (characters === '') {
        document.getElementById('result').innerText = "Please select at least one character type.";
        return;
    }

    let password = '';
    if (includeUppercase) password += getRandomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (includeLowercase) password += getRandomCharacter('abcdefghijklmnopqrstuvwxyz');
    if (includeNumbers) password += getRandomCharacter('0123456789');
    if (includeSpecial) password += getRandomCharacter('!@#$%^&*()_+~`|}{[]:;?><,./-=');

    for (let i = password.length; i < length; i++) {
        password += getRandomCharacter(characters);
    }

    password = shuffleString(password);
    document.getElementById('result').innerText = password;
    document.getElementById('strength').innerText = getPasswordStrength(password);
    addToHistory(password);
}

function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function copyToClipboard() {
    const password = document.getElementById('result').innerText;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
    });
}

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    switch (strength) {
        case 5: return 'Very Strong';
        case 4: return 'Strong';
        case 3: return 'Medium';
        case 2: return 'Weak';
        default: return 'Very Weak';
    }
}

function addToHistory(password) {
    const history = document.getElementById('history');
    const listItem = document.createElement('li');
    listItem.textContent = password;
    history.appendChild(listItem);
}
