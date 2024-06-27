function generatePassword() {
    const length = document.getElementById('length').value;
    if (length < 8) {
        document.getElementById('result').innerText = "Password length should be at least 4 characters.";
        return;
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    password += getRandomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += getRandomCharacter('abcdefghijklmnopqrstuvwxyz');
    password += getRandomCharacter('0123456789');
    password += getRandomCharacter('!@#$%^&*()_+~`|}{[]:;?><,./-=');

    for (let i = 8; i < length; i++) {
        password += getRandomCharacter(characters);
    }

    password = shuffleString(password);

    document.getElementById('result').innerText = password;
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
