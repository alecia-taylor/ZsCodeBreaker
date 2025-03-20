// Function to handle translation
function translate() {
    // Get values from inputs
    const plaintextValue = document.getElementById('plaintext').value;
    const shiftValue = parseInt(document.getElementById('shift').value);
    const cipherMethod = document.getElementById('cipherMethod').value;
    const action = document.getElementById('action').value;
  
    // Ensure shiftValue is a number
    if (isNaN(shiftValue) || shiftValue < 1 || shiftValue > 25) {
      alert('Please enter a valid shift value between 1 and 25');
      return;
    }
  
    let outputValue = '';
  
    // Choose the cipher method and action
    if (cipherMethod === 'caesar') {
      if (action === 'encrypt') {
        outputValue = caesarCipher(plaintextValue, shiftValue);
      } else if (action === 'decrypt') {
        outputValue = caesarCipher(plaintextValue, -shiftValue);
      }
    } else if (cipherMethod === 'reverse') {
      if (action === 'encrypt') {
        outputValue = reverseCipher(plaintextValue);
      } else if (action === 'decrypt') {
        outputValue = reverseCipher(plaintextValue);  // Reversing again gives back the original text
      }
    }
  
    // Display translated message
    document.getElementById('output').innerHTML = outputValue;
  }
  
  // Caesar Cipher function
  function caesarCipher(str, shift) {
    return str.split('')
      .map(char => {
        if (char.match(/[a-zA-Z]/)) {
          let base = char.toLowerCase() === char ? 97 : 65;
          return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
        }
        return char;
      })
      .join('');
  }
  
  // Reverse Cipher function
  function reverseCipher(str) {
    return str.split('').reverse().join('');
  }
  
  // Add event listener for the Submit button
  document.getElementById('submitBtn').addEventListener('click', translate);