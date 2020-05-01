/* To add a new list when click on the "Add" button */
function addNewItem() {
  let inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
    return;
  }
  // Clear the input box
  document.getElementById("myInput").value = "";

  let tempFolder = { title: inputValue, folder: [], url: [] };
  folders.folder[0].folder.push(tempFolder);

  console.log("Current obj");
  console.log(folders);

  renderFolders(folders);

  return;

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

function addFolder(x) {
  let ele = getCurrentItem(x);
  let level = ele.split("-");
  console.log(ele, typeof ele, ele[0], level);
  // Get index to insert sub-folder

  let tempFolder = { title: "untitled", folder: [], url: [] };
  folders.folder[0].push(tempFolder);

  console.log("Current obj");
  console.log(folders);
}

function getCurrentItem(x) {
  console.log("Current Item");
  console.log(x.parentNode.parentNode);
  console.log(x.parentNode.parentNode.getAttribute("data-id"));
  return x.parentNode.parentNode.getAttribute("data-id");
}

let folders = {
  folder: [
    {
      title: "folder1",
      folder: [
        {
          title: "folder1-1",
          folder: [],
          url: ["dill.com", "dill.com"],
        },
        {
          title: "folder1-2",
          folder: [],
          url: ["dill.com", "dill.com"],
        },
      ],
      url: ["dill1111.com", "dill2222.com"],
    },
    {
      title: "folder2",
      folder: [
        {
          title: "folder2-1",
          folder: [],
          url: ["dill.com", "dill.com"],
        },
        {
          title: "folder2-2",
          folder: [],
          url: [],
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

function getFolders(item, idx, subfolder, level) {
  console.log(item, idx, level);
  return `<div data-id=${level}-${idx} class="${
    subfolder ? "sub-folder " : ""
  } dropdown menu-list">
            <div class="menu-list-content">
              <a onclick="getCurrentItem(this)" href="#">Edit</a>
              <a onclick="getCurrentItem(this)" href="#">Share</a>
              <a onclick="addFolder(this)" href="#">+</a>
            </div>
            ${item.folder.length == 0 && item.url.length == 0 ? "" : getIcon()}
            ${getFolderImage()}
            <span>${item.title}</span>
            <ul id="myDropdown" class="dropdown-content">
            ${item.url.length == 0 ? "" : getURLs(item.url)}
            </ul>
            </div>
            ${
              item.folder.length == 0
                ? ""
                : item.folder
                    .map((item, idx) => {
                      console.log(idx);
                      return `${getFolders(item, idx, true, level + 1)}`;
                    })
                    .join("")
            }
          `;
}

function getIcon() {
  return `<i onclick="expandSubFolder(this)" class="fa fa-thumbs-up"></i>`;
}

function getFolderImage() {
  return `<img src="../assets/folder-icon.png" style="width: 20px;" />`;
}

function getURLs(urls) {
  const html = urls
    .map((item, idx) => {
      return `
        <li style="padding: 0px;margin-left: 50px;">${item}</li>
      `;
    })
    .join("");

  return html;
}

function renderFolders(folders) {
  let folderList = folders.folder;
  const html = folderList
    .map((item, idx) => {
      console.log(idx);
      return `${getFolders(item, idx, false, 0)}`;
    })
    .join("");

  folderPannel.innerHTML = html;
}

let folderPannel = document.getElementById("folder-list");

renderFolders(folders);
