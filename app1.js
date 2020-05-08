// let data = {
//   Fish: {
//     trout: {},
//     salmon: {},
//   },
//   Tree: {
//     Huge: {
//       sequoia: {},
//       oak: {},
//     },
//     Flowering: {
//       "apple tree": {},
//       magnolia: {},
//     },
//   },
// };

let data1 = {
  folder: [
    {
      title: "folder1",
      id: 1,
      subfolder: [
        {
          title: "folder1-1",
          id: 2,
          subfolder: [
            {
              title: "folder1-1-1",
              id: 3,
              subfolder: [],
              url: ["dill.com", "dill.com"],
            },
            {
              title: "folder1-2-2",
              id: 4,
              subfolder: [],
              url: ["dill.com", "dill.com"],
            },
          ],
          url: ["dill.com", "dill.com"],
        },
        {
          title: "folder1-2",
          id: 5,
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
      ],
      url: ["dill.com", "dill.com"],
    },
    {
      title: "folder2",
      id: 6,
      subfolder: [
        {
          title: "folder2-1",
          id: 7,
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
        {
          title: "folder2-2",
          id: 8,
          subfolder: [],
          url: ["dill.com", "dill.com"],
        },
      ],
      url: ["dill.com", "dill.com"],
    },
  ],
};

function getFolderIcon() {
  return `<img src="assets/folder-icon.png" style="width: 20px;" />`;
}

function getToggleIcon() {
  return `<i class="fa fa-thumbs-up"></i>`;
}

function getFolderInfo(item) {
  return `<span class="menu-list" data-id=${item.id}>${
    item.title
  } ${getMenuList()}</span>`;
}

function getMenuList() {
  return `
            <div class="menu-list-content">
                <a href="#">Edit</a>
                <a  href="#">Share</a>
                <a href="#">+</a>
            </div>`;
}

function createTree(obj) {
  let container = document.querySelector("#container");
  container.innerHTML = createTreeText(obj);
}

function createTreeText(obj) {
  function recursive(obj) {
    let li = "";
    let ul;
    for (let item of obj) {
      li +=
        "<li>" +
        getToggleIcon() +
        getFolderIcon() +
        getFolderInfo(item) +
        recursive(item.subfolder) +
        "</li>";
    }

    if (li) {
      ul = "<ul>" + li + "</ul>";
    }

    return ul || "";
  }

  let html = recursive(obj);
  let attrTemplate = " class='tree' id='tree' ";
  return html.slice(0, 3) + attrTemplate + html.slice(3);
}

function getFolder(id) {
  let result;
  function dfs(obj) {
    if (result) {
      return;
    }

    for (let item of obj) {
      if (item.id == id || dfs(item.subfolder)) {
        result = item;
        return;
      }
    }

    // return result;
  }

  dfs(data1.folder);
  console.log("Result: ", result);
  return result;
}

function generateFolderContent(id) {
  // Get the node detail
  let folder = getFolder(id);
  if (!folder) return;

  let name = document.querySelector("#folder-name");
  let sub = document.querySelector("#sub-folder");
  let url = document.querySelector("#sub-folder-url");

  name.innerHTML = "Folder: " + folder.title;
  sub.innerHTML =
    "Sub-folder: " + (folder.subfolder ? folder.subfolder : "No sub");
  url.innerHTML = "URLs: " + (folder.url ? folder.url : "No URL");
}

function addEventToTree() {
  let tree = document.querySelector("#tree");

  // Move all text into <span>
  //   let lis = tree.querySelectorAll("li");
  //   for (let li of lis) {
  //     let span = document.createElement("span");
  //     console.log("Last child: ", li.firstChild.nextSibling);
  //     li.firstChild.nextSibling.insertAdjacentElement("afterend", span);

  //     // move the text node into span
  //     span.append(span.nextSibling);
  //   }

  // To show details about clicked folder
  tree.addEventListener("click", (e) => {
    if (e.target.tagName != "SPAN") {
      return;
    }
    console.log(e.target);
    let currentNodeId = e.target.getAttribute("data-id");
    generateFolderContent(currentNodeId);

    let parentNode = e.target.parentNode;
    let childrenContainer = parentNode.querySelector("ul");
    if (!childrenContainer) return; // No children
  });

  // To toggle clicked folder
  tree.addEventListener("click", (e) => {
    if (e.target.tagName != "I") {
      return;
    }

    console.log("I tag: ", e.target);

    e.target.classList.toggle("fa-thumbs-down");
    let parentNode = e.target.parentNode;
    let childrenContainer = parentNode.querySelector("ul");
    if (!childrenContainer) return; // No children

    childrenContainer.hidden = !childrenContainer.hidden;
    // parentNode.classList.toggle("fa-thumbs-down");
  });

  // To show custome menu
  //   tree.addEventListener("mouseover", (e) => {
  //     if (e.target.tagName == "IMG" || e.target.tagName == "SPAN") {
  //       console.log(e.target);
  //       console.log(e.clientX, e.clientY, e.target.offsetTop);
  //       let x = e.clientX + 20 + "px";
  //       let y = e.clientY + 20 + "px";
  //       e.target.nextSibling.nextSibling.style.top =
  //         e.target.offsetTop - 8 + "px";
  //       e.target.nextSibling.nextSibling.classList.add("show");
  //       //   console.log(e.target.nextSibling.nextSibling.classList.add("show"));
  //     }
  //   });

  // To show custome menu
  //   tree.addEventListener("mouseout", (e) => {
  //     if (e.target.tagName == "IMG" || e.target.tagName == "SPAN") {
  //       console.log(e.target);
  //       console.log(e.clientX, e.clientY);
  //       let x = e.clientX + 20 + "px";
  //       let y = e.clientY + 20 + "px";
  //       e.target.nextSibling.nextSibling.classList.remove("show");
  //       console.log(e.target.nextSibling.nextSibling.classList.remove("show"));
  //     }
  //   });
}

function addIconToggle() {
  let lis = document.querySelectorAll("li");
  console.log(lis);

  let lis1 = document.getElementsByTagName("li");
  console.log(lis1);

  for (let li of lis) {
    // Get the count of all <li> below this <li>
    let descendantsCount = li.querySelectorAll("li").length;
    if (!descendantsCount) {
      li.firstChild.style.display = "none";
      continue;
    }

    // Add directly to the text node
    console.log(li.classList);

    // li.classList.add("fa", "fa-thumbs-up");
    // li.firstChild.innerHTML += " [" + descendantsCount + "] ";
  }
}

let inputBox = document.querySelector("#myInput");
inputBox.addEventListener("keyup", (e) => {
  if (e.which === 13 || e.key == "Enter" || e.code == "Enter") {
    if (e.target.value === "") {
      alert("Please type your folder name");
    } else {
      // Add obj to last index
      let data = {
        title: e.target.value,
        id: Math.floor(Math.random() * 100001),
        subfolder: [],
        url: [],
      };
      data1.folder.push(data);
      e.target.value = "";

      // insert to DOM tree
      createTree(data1.folder);
      addIconToggle();
      addEventToTree();

      saveData();

      console.log(data1.folder[data1.folder.length - 1]);
    }
  }
});

createTree(data1.folder);
addIconToggle();
addEventToTree();

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAiICWukNVR_U5m-rtB1YUk62urukuG_sE",
  authDomain: "url-sharing-3cecf.firebaseapp.com",
  databaseURL: "https://url-sharing-3cecf.firebaseio.com",
  projectId: "url-sharing-3cecf",
  storageBucket: "url-sharing-3cecf.appspot.com",
  messagingSenderId: "85139787014",
  appId: "1:85139787014:web:4cee05a2400cfcc569a287",
  measurementId: "G-E6PM4E3X38",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Cloud Firestore - It is document db
// collection = [doc1, doc2, doc3, . . . ]
var db = firebase.firestore();
const docRef = db.doc("samples/url");

const outputHeader = document.querySelector("#hotDogOutput");

getRealtimeUpdates = function () {
  docRef.onSnapshot((doc) => {
    if (doc && doc.exists) {
      console.log("Check out this document I recieved: ", doc);
      const myData = doc.data();
      data1.folder = myData.data;
      outputHeader.innerHTML =
        "Hot dog status: " +
        myData.data.map((item) => {
          return item.title;
        });

      createTree(data1.folder);
      addIconToggle();
      addEventToTree();
    }
  });
};

function saveData() {
  docRef
    .set({
      data: data1.folder,
    })
    .then(() => {
      console.log("Status saved");
    })
    .catch((error) => {
      console.log("Got an error: ", error);
    });
}

getRealtimeUpdates();
