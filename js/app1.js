class Folder {
  constructor(name, id, rootId) {
    this.name = name;
    this.id = id;
    this.root = rootId;
    this.data = [];
    this.subfolder = [];
    this.accessible = [];
  }

  addData(data) {
    this.data.push(data);
  }

  removeData(data) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === data) {
        this.data.splice(this.data[i], 1);
      }
    }
  }

  addSubFolder(folder) {
    this.subfolder.push(folder);
  }

  removeSubFolder(folderId) {
    for (let i = 0; i < this.subfolder.length; i++) {
      if (this.subfolder[i].id === folderId) {
        this.subfolder.splice(this.subfolder[i], 1);
      }
    }
  }
}

function generateUniqueID() {
  return uuidv1();
}

class Directory {
  constructor() {
    this.root = new Folder("root", generateUniqueID().toString(), null);
    this.json;
  }

  findRoot(root, rootId) {
    let result = [];
    function dfs(root, rootId) {
      if (!root) {
        return;
      }

      if (root.id === rootId) {
        console.log("root found....", root);
        result.push(root);
        return root;
      }

      for (let i = 0; i < root.subfolder.length; i++) {
        if (dfs(root.subfolder[i], rootId)) {
          return root.subfolder[i];
        }
      }
    }

    dfs(root, rootId);
    return result[0];
  }

  buildTree() {
    // read json file
    // build tree object
    let newRoot = JSON.parse(this.json);
    dfs(newRoot);
  }

  saveTree() {
    // save to json file
    this.json = JSON.stringify(this.root);
    console.log(this.json);
  }

  renderDirectory() {
    let root = JSON.parse(this.json);
    //view.renderDirectory(root);
  }

  addFolder(name, id, rootId) {
    console.log("Search for: ", rootId);
    let newFolder = new Folder(name, id, rootId);
    let parent = this.findRoot(this.root, rootId);
    console.log("Parent is: ", parent.id, parent.name);
    if (rootId === parent.id) {
      console.log("MATCHED.....");
    }
    if (parent) {
      parent.addSubFolder(newFolder);
    } else {
      console.log("No parent found!");
    }
  }

  removeFolder(folderId) {
    let node = this.findRoot(this.root, folderId);
    let root = this.findRoot(this.root, node.root);
    console.log("Removing node: ", node);
    if (root) {
      root.removeSubFolder(folderId);
    } else {
      console.log("No parent found!");
    }
  }

  editFolder(data, parentId) {
    let root = this.findRoot(this.root, parentId);
    console.log("Editing node: ", root.name, data);
    if (root) {
      root.name = data;
    } else {
      console.log("No parent found!");
    }
  }

  addData(nodeId, data) {
    let currentNode = this.dfs(this.root, nodeId);

    if (currentNode) {
      currentNode.addData(data);
    } else {
      console.log("No current node found!");
    }
  }

  removeData(nodeId, data) {
    let currentNode = this.dfs(this.root, nodeId);

    if (currentNode) {
      currentNode.removeData(data);
    } else {
      console.log("No current node found!");
    }
  }
}

class View {
  constructor() {}

  getIcon() {
    return `<i onclick="dom.expandSubFolder(this)" class="fa fa-thumbs-up"></i>`;
  }

  getFolderImage() {
    return `<img src="../assets/folder-icon.png" style="width: 20px;" />`;
  }

  getURLs(urls) {
    const html = urls
      .map((item, idx) => {
        return `
          <li style="padding: 0px;margin-left: 50px;">${item}</li>
        `;
      })
      .join("");

    return html;
  }

  getFolders(item, level) {
    return `<div data-id=${item.id} data-level=${level} class="${
      level > 0 ? "sub-folder dropdown-content" : ""
    } ${item.subfolder.length > 0 ? "dropdown" : ""} 
    menu-list" style="--distance: ${level * 50}px">
              <div class="menu-list-content">
                <a onclick="dom.getCurrentItem(this)" href="#">Edit</a>
                <a onclick="dom.getCurrentItem(this)" href="#">Share</a>
                <a onclick="dom.getCurrentItem(this)" href="#">+</a>
              </div>
              ${
                item.data.length == 0 && item.subfolder.length == 0
                  ? ""
                  : this.getIcon()
              }
              ${this.getFolderImage()}
              <span>${item.name}</span>
              <span>${item.id}</span>
              <ul id="myDropdown" class="dropdown-content">
              ${item.data.length == 0 ? "" : this.getURLs(item.data)}
              </ul>
              </div>
              ${
                item.subfolder.length == 0
                  ? ""
                  : item.subfolder
                      .map((item, idx) => {
                        console.log(idx);
                        return `${this.getFolders(item, level + 1)}`;
                      })
                      .join("")
              }
            `;
  }

  getInputBox() {
    return `<input
        class=""
        id="myInput"
        placeholder="Enter folder title..."
        type="text",
        onkeyup="dom.addNewFolder(event, this)"
      />`;
  }

  getDataBox() {
    return `<input
        class=""
        id="myInputData"
        placeholder="Enter data title..."
        type="text",
        onkeyup="dom.addNewData(event)"
      />`;
  }

  getModal() {
    return `<div id="myModal" class="modal">
              <!-- Modal content -->
              <div class="modal-content">
                <span class="close">&times;</span>
                <input
                  class=""
                  id="myInput1"
                  placeholder="Enter sub-folder title..."
                  type="text",
                  />
                  <span id="delete-button">REMOVE</span>
                  <span id="save-button">SAVE</span>
              </div>
          </div>`;
  }

  renderDirectory(root) {
    const folderPannel = root.subfolder
      .map((item, idx) => {
        return `${this.getFolders(item, 0)}`;
      })
      .join("");

    const inputBox = this.getInputBox();
    const dataBox = this.getDataBox();
    const modalBox = this.getModal();

    let folderList = document.getElementById("folder-list");
    folderList.innerHTML = modalBox + folderPannel + inputBox + dataBox;
  }
}

class DOM {
  constructor(directory, view) {
    this.directory = directory;
    this.view = view;
  }

  addNewData(e) {
    let myData = document.getElementById("myInputData");
    if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
      // e.preventDefault();
      if (myData.value === "") {
        alert("You must input Data!");
        return;
      } else {
        this.directory.addData(1, myData.value);
        // Clear the input box
        myData.value = "";
        this.view.renderDirectory(this.directory.root);
        this.directory.saveTree();
      }
    }
  }

  addNewFolder(e, x) {
    if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
      // e.preventDefault();
      if (x.value === "") {
        alert("You must input Folder name!");
        return;
      } else {
        let parentId = this.directory.root.id;
        dom.directory.addFolder(x.value, generateUniqueID(), parentId);
        // Clear the input box
        x.value = "";
        dom.view.renderDirectory(dom.directory.root);
        dom.directory.saveTree();
      }
    }
  }

  getCurrentItem(x) {
    /* console.log("Current Item");
      console.log(x.parentNode.parentNode);
      console.log(x.parentNode.parentNode.getAttribute("data-id")); */
    let parent = x.parentNode.parentNode;
    console.log("This is parent", parent);
    console.log("I am ", x);
    let parentId = parent.getAttribute("data-id");
    let parentText = parent.getElementsByTagName("SPAN")[0].innerText;
    // console.log("Test", parentText, parentId);
    this.showPopup(parentId, parentText);
  }

  showPopup(parentId, parentText) {
    var modal = document.getElementById("myModal"); // Get the modal
    var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    let dom = this;

    let deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", () => {
      console.log("I a mclicked");
      console.log("Detail", parentId);
      dom.directory.removeFolder(parentId);

      dom.view.renderDirectory(dom.directory.root);
      dom.directory.saveTree();
    });

    let saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", function () {
      console.log("VALLLL", this.parentNode.parentNode);
      console.log(
        "VALLLLGGGGG",
        this.parentNode.parentNode.getElementsByTagName("INPUT")[0].value
      );

      let inputData = this.parentNode.parentNode.getElementsByTagName(
        "INPUT"
      )[0].value;
      dom.directory.editFolder(inputData, parentId);
      // Clear the input box
      this.value = "";
      dom.view.renderDirectory(dom.directory.root);
      dom.directory.saveTree();
    });

    let inputBox = document.getElementById("myInput1");
    inputBox.placeholder = parentText;

    inputBox.addEventListener("keyup", function (e) {
      if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
        // e.preventDefault();
        if (this.value === "") {
          alert("You must input Folder name!");
          return;
        } else {
          dom.directory.addFolder(
            this.value,
            generateUniqueID().toString(),
            parentId
          );
          // Clear the input box
          this.value = "";
          dom.view.renderDirectory(dom.directory.root);
          dom.directory.saveTree();
        }
      }
    });
  }

  expandSubFolder(x) {
    console.log("Start  ", x.classList);

    function keepState(nextSibling, limit) {
      if (parseInt(nextSibling.getAttribute("data-level")) == limit) {
        return nextSibling;
      }
      let iconShow = nextSibling.getElementsByTagName("I")[0];
      console.log("Icon show ", iconShow);
      if (iconShow) {
        let len = iconShow.classList.length;
        let lastAction = iconShow.classList[len - 1];
        let show = true ? lastAction === "fa-thumbs-down" : false;
        if (show) {
          console.log("Current ", nextSibling);
          console.log("Next ", nextSibling.nextElementSibling);
          nextSibling.nextElementSibling.classList.add("show");
        } else {
        }
      }
      keepState(nextSibling.nextElementSibling, level + 1);
    }

    x.classList.toggle("fa-thumbs-down");

    let currentNode = x.parentNode;
    let min = parseInt(currentNode.getAttribute("data-level"));
    let nextSibling = currentNode.nextElementSibling;
    let len = x.classList.length;
    let lastAction = x.classList[len - 1];

    let show = true ? lastAction === "fa-thumbs-down" : false;
    console.log(show);
    while (nextSibling) {
      console.log(nextSibling);
      // getElementsByTagName("INPUT")[0]
      if (show && parseInt(nextSibling.getAttribute("data-level")) == min + 1) {
        nextSibling.classList.add("show");
        let next = keepState(nextSibling, min + 1);
        nextSibling = next.nextElementSibling;
        continue;
      }

      if (
        !show &&
        parseInt(nextSibling.getAttribute("data-level")) >= min + 1
      ) {
        // Hide folder
        nextSibling.classList.remove("show");
      }

      if (parseInt(nextSibling.getAttribute("data-level")) == min) {
        break;
      }

      // nextSibling.classList.toggle("show");
      nextSibling = nextSibling.nextElementSibling;
    }

    // x.parentNode.getElementsByTagName("ul")[0].classList.toggle("show");
    // document.getElementById("myDropdown").classList.toggle("show");
  }

  renderPage() {
    this.view.renderDirectory(this.directory.root);
  }
}

function main() {
  /* root = new Folder("root", 0);
    f1 = new Folder("folder1", 1);
    f2 = new Folder("folder2", 2);
    f3 = new Folder("folder3", 3);
    
    f4 = new Folder("sub-folder4", 4);
    f5 = new Folder("sub-folder5", 5);
    
    root.addSubFolder(f1);
    root.addSubFolder(f2);
    root.addSubFolder(f3);
    
    f1.addSubFolder(f4);
    f1.addSubFolder(f5);
    f1.addData("dill.com");
    f1.addData("smile.com");
    
    
    f5.addData("dill.com");
    f5.addData("smile.com")
    
    
    dfs(root);
    
    console.log("----------------");
    
    f1.removeSubFolder(f4);
    dfs(root);
    
    
    console.log("--------Directory--------");
    directory = new Directory(root);
    directory.saveTree();
    directory.buildTree();
    directory.renderDirectory(); */

  directory = new Directory();
  view = new View();

  dom = new DOM(directory, view);
  dom.renderPage();
  /* dom.print() */
}

main();
