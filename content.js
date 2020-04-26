function selecionHandler(e) {
    let text = document.getSelection();
    console.log(e);
    console.log(text);
    if (text !== '') {
        addShareIcon(e);
    }
}

function addShareIcon(e) {
    // let shareIcon = document.createAttribute();
}

document.onmouseup = selecionHandler;