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
  let domString = `<div class=""><i onclick="expandSubFolder(this)" class="fa fa-thumbs-up"></i><img src="../assets/folder-icon.png" style="width: 50px;" /><span>${inputValue}</span></div>`;
  li.innerHTML = domString;
  // Create folder with the name

  // let txtNode = document.createTextNode(inputValue);
  // li.appendChild(txtNode);

  /* To add a checked symbol when click on a list item */
  // li.addEventListener("click", function (ev) {
  //   if (ev.target.tagName === "LI") {
  //     ev.target.classList.toggle("checked");
  //   }
  // });

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

function expandSubFolder(x) {
  console.log(x.parentNode.getElementsByTagName("ul"));
  x.classList.toggle("fa-thumbs-down");
  x.parentNode.getElementsByTagName("ul")[0].classList.toggle("show");
  // document.getElementById("myDropdown").classList.toggle("show");
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

const folders = {
  folder: [
    {
      title: "folder1",
      subfolder: [
        {
          title: "folder1-1",
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
        {
          title: "folder1-2",
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
      ],
      url: ["dill.com", "dill.com"],
    },
    {
      title: "folder2",
      subfolder: [
        {
          title: "folder2-1",
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
        {
          title: "folder2-2",
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
      ],
      url: ["dill.com", "dill.com"],
    },
  ],
};

// fetch("./test.json")
//   .then((resp) => resp.json())
//   .then((data) => folders.push(...data));

// $.getJSON("../test.json", function (json) {
//   console.log(json); // this will show the info it in firebug console
// });

function renderFolders(folders) {
  let folderList = folders.folder;
  const html = folderList
    .map((item) => {
      return `<div class="dropdown"><i onclick="expandSubFolder(this)" class="fa fa-thumbs-up"></i>
              <img src="../assets/folder-icon.png" style="width: 50px;" /><span>${
                item.title
              }</span>
              <ul id="myDropdown" class="dropdown-content">
              ${
                item.url.length == 0
                  ? ""
                  : item.url
                      .map((item) => {
                        return `<li style="padding: 0px;margin-left: 50px;">${item}</li>`;
                      })
                      .join("")
              }
              </ul>
              ${
                item.subfolder.length == 0
                  ? ""
                  : item.subfolder
                      .map((item) => {
                        return `<div class="sub-folder dropdown"><i onclick="expandSubFolder(this)" class="fa fa-thumbs-up"></i>
                          <img src="../assets/folder-icon.png" style="width: 20px;" /><span>${
                            item.title
                          }</span>
                          <ul id="myDropdown" class="dropdown-content">
                            ${
                              item.url.length == 0
                                ? ""
                                : item.url
                                    .map((item) => {
                                      return `<li style="padding: 0px;margin-left: 50px;">${item}</li>`;
                                    })
                                    .join("")
                            }
                            </ul>
                        </div>`;
                      })
                      .join("")
              }
            </div>`;
    })
    .join("");

  folderPannel.innerHTML = html;
}

let folderPannel = document.getElementById("folder-list");

renderFolders(folders);
