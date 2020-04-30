/* To add a new list when click on the "Add" button */
function addNewItem() {
  let inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
    return;
  }
  // Clear the input box
  document.getElementById("myInput").value = "";

  let li = document.createElement("li");
  let domString = `<div class=""><img src="../assets/folder-icon.png" style="width: 50px;" /><span>${inputValue}</span></div>`;
  li.innerHTML = domString;
  // Create folder with the name

  // let txtNode = document.createTextNode(inputValue);
  // li.appendChild(txtNode);

  /* To add a checked symbol when click on a list item */
  li.addEventListener("click", function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  });

  /* Create a "close" button and append it to each of list item */
  let span = document.createElement("span");
  let closeIcon = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(closeIcon);
  /* To remove the current list item when click on a close button */
  span.addEventListener("click", function (ev) {
    let liChild = this.parentElement;
    let ulParent = liChild.parentElement;
    ulParent.removeChild(liChild);
  });

  li.appendChild(span);

  document.getElementById("myUL").appendChild(li);
}

let myInput = document.getElementById("myInput");
myInput.addEventListener("keydown", checkEnter);

function checkEnter(e) {
  if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
    // console.log("test");
    // e.preventDefault();
    addNewItem();
  }
}
