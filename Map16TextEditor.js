function loadText() {
    redrawPreview();
}

function updateText() {
    redrawPreview();
}

function updatePage() {
    page = document.getElementById('page').value.padStart(2, '0').toUpperCase();
}

function redrawPreview() {
    var x = 0;
    var y = 0;
    
    var message = document.getElementById('message').value;
    
    context.clearRect(0, 0, previewWidth, previewHeight);
    data = [...Array(32)].map(e => Array(32).fill(0x2DF));
    
    for (var i=0; i<message.length; i++) {
        var chr = message[i];
        if (chr=='\n') {
            x = 0;
            y++;
            if (y>32) break;
            continue;
        }
        if (chr in alphabet) {
            if (x<32) {
                placeTile(x,y,alphabet[chr]);
                data[x][y] = 0x280 + alphabet[chr];
            }
            x++;
        }
    }
    
}

function placeTile(x, y, tile) {
    var xpos = x*tileWidth;
    var ypos = y*tileHeight;
    
    var xs = tile%16;
    var ys = Math.floor(tile/16);
    
    var xspos = xs*tileWidth;
    var yspos = ys*tileHeight;
    
    context.clearRect(xpos, ypos, tileWidth, tileHeight);
    context.drawImage(tiles, xspos, yspos, tileWidth, tileHeight, xpos, ypos, tileWidth, tileHeight);
}

function map16(number) {
    return number.toString(16).padStart(3, '0').toUpperCase();
}

function generateText() {
    var text = "";
    
    for (var i=0; i<256; i++) {
        var tile = (page + i.toString(16).padStart(2, '0')).toUpperCase();
        var x = i%16;
        var y = Math.floor(i/16);
        tile += ": 0025 { ";
        tile += map16(data[x*2][y*2]) + " 1 ---  ";
        tile += map16(data[x*2][y*2+1]) + " 1 ---  ";
        tile += map16(data[x*2+1][y*2]) + " 1 ---  ";
        tile += map16(data[x*2+1][y*2+1]) + " 1 --- ";
        tile += "}\r\n";        
        text += (tile);
        
        
    }
    
    
    return text;
}

function exportText() {
    var text = generateText();
    var filename = "page_"+page+".txt";
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

var alphabet = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25,
    ':': 26,
    '\'': 27,
    '"': 28,
    
    ',': 30,
    '.': 31,
    '0': 32,
    '1': 33,
    '2': 34,
    '3': 35,
    '4': 36,
    '5': 37,
    '6': 38,
    '7': 39,
    '8': 40,
    '9': 41,
    '~': 42,
    '#': 43,
    '/': 44,
    '(': 45,
    '!': 46,
    '?': 47,
    'a': 48,
    'b': 49,
    'c': 50,
    'd': 51,
    'e': 52,
    'f': 53,
    'g': 54,
    'h': 55,
    'i': 56,
    'j': 57,
    'k': 58,
    'l': 59,
    'm': 60,
    'n': 61,
    'o': 62,
    'p': 63,
    'q': 64,
    'r': 65,
    's': 66,
    't': 67,
    'u': 68,
    'v': 69,
    'w': 70,
    'x': 71,
    'y': 72,
    'z': 73,
    
    '@': 80,
    '&': 81,
    '*': 82,
    '%': 83,
    '+': 84,
    '=': 85,
    
    '-': 87,
    
    '_': 90,
    
    ' ': 95
    
}