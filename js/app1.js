class Folder {
  constructor(name, id) {
    this.name = name;
    this.id = id;
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

class Directory {
  constructor() {
    this.root = new Folder("root", 0);
    this.json;
  }

  dfs(root, rootId) {
    if (!root) {
      return;
    }

    if (root.id === rootId) {
      return root;
    }

    for (let i = 0; i < root.subfolder.length; i++) {
      if (this.dfs(root.subfolder[i], rootId)) {
        return root.subfolder[i];
      }
    }
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
    let newFolder = new Folder(name, id);
    let parent = this.dfs(this.root, rootId);
    if (parent) {
      parent.addSubFolder(newFolder);
    } else {
      console.log("No parent found!");
    }
  }

  removeFolder(folderId, rootId) {
    let parent = this.dfs(this.root, rootId);

    if (parent) {
      parent.removeSubFolder(folderId);
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
    return `<div data-id=${item.id} class="${
      item.subfolder.length > 0 && level > 0 ? "sub-folder " : ""
    } dropdown menu-list">
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
        onkeyup="dom.addNewFolder(event)"
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
              </div>
          </div>`;
  }

  renderDirectory(root) {
    const html = root.subfolder
      .map((item, idx) => {
        return `${this.getFolders(item, 0)}`;
      })
      .join("");

    const inputBox = this.getInputBox();
    const dataBox = this.getDataBox();
    const modalBox = this.getModal();

    let folderPannel = document.getElementById("folder-list");
    folderPannel.innerHTML = modalBox + html + inputBox + dataBox;
  }
}

class DOM {
  constructor(directory, view) {
    this.directory = directory;
    this.view = view;
  }

  print() {}

  getCurrentItem(x) {
    console.log("Current Item");
    console.log(x.parentNode.parentNode);
    console.log(x.parentNode.parentNode.getAttribute("data-id"));
    return x.parentNode.parentNode.getAttribute("data-id");
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

  addNewFolder(e) {
    let myInput = document.getElementById("myInput");

    if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
      // e.preventDefault();
      if (myInput.value === "") {
        alert("You must input Folder name!");
        return;
      } else {
        this.directory.addFolder(myInput.value, 1, 0);
        // Clear the input box
        myInput.value = "";
        this.view.renderDirectory(this.directory.root);
        this.directory.saveTree();
      }
    } else {
      console.log(this);
    }
  }

  addNewFolder1(e, parentId) {
    /* let myInput = document.getElementById("myInput1") */
    if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
      // e.preventDefault();
      if (this.value === "") {
        alert("You must input Folder name!");
        return;
      } else {
        console.log("Current Item", this);
        /* let parentId = this.getCurrentItem(x) */
        this.directory.addFolder(this.value, 1, parentId);
        // Clear the input box
        myInput.value = "";
        this.view.renderDirectory(this.directory.root);
        this.directory.saveTree();
      }
    } else {
      console.log(this);
    }
  }
  getCurrentItem(x) {
    /* console.log("Current Item");
      console.log(x.parentNode.parentNode);
      console.log(x.parentNode.parentNode.getAttribute("data-id")); */
    let parentId = x.parentNode.parentNode.getAttribute("data-id");
    let parentText = x.parentNode.parentNode.getElementsByTagName("SPAN")[0]
      .innerText;
    console.log(parentText);
    this.showPopup(parentId, parentText);
  }

  showPopup(parentId, parentText) {
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
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

    let inputBox = document.getElementById("myInput1");
    inputBox.placeholder = parentText;
    let dom = this;

    inputBox.addEventListener("keyup", function (e) {
      if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
        // e.preventDefault();
        if (this.value === "") {
          alert("You must input Folder name!");
          return;
        } else {
          dom.directory.addFolder(this.value, 5, parseInt(parentId));
          // Clear the input box
          this.value = "";
          dom.view.renderDirectory(dom.directory.root);
          dom.directory.saveTree();
        }
      }
    });
  }

  expandSubFolder(x) {
    console.log(x.parentNode.getElementsByTagName("ul"));
    x.classList.toggle("fa-thumbs-down");
    x.parentNode.getElementsByTagName("ul")[0].classList.toggle("show");
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
