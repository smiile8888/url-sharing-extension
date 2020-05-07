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
      subfolder: [
        {
          title: "folder1-1",
          subfolder: [
            {
              title: "folder1-1-1",
              subfolder: [],
              url: ["dill.com", "dill.com"],
            },
            {
              title: "folder1-2-2",
              subfolder: [],
              url: ["dill.com", "dill.com"],
            },
          ],
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

function createTree(container, obj) {
  container.innerHTML = createTreeText(obj);
}

function getFolderIcon() {
  return `<img src="../assets/folder-icon.png" style="width: 20px;" />`;
}

function createTreeText(obj) {
  function recursive(obj) {
    let li = "";
    let ul;
    for (let item of obj) {
      li +=
        "<li>" +
        getFolderIcon() +
        item.title +
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

createTree(container, data1.folder);

function addEventToTree() {
  let tree = document.querySelector("#tree");

  // Move all text into <span>
  let lis = tree.querySelectorAll("li");
  for (let li of lis) {
    let span = document.createElement("span");
    li.prepend(span);
    // move the text node into span
    span.append(span.nextSibling);
  }

  tree.addEventListener("click", (e) => {
    if (e.target.tagName != "SPAN") {
      return;
    }

    let parentNode = e.target.parentNode;
    let childrenContainer = parentNode.querySelector("ul");
    if (!childrenContainer) return; // No children

    childrenContainer.hidden = !childrenContainer.hidden;
    parentNode.classList.toggle("fa-thumbs-down");
  });
}

function addIconToggle() {
  let lis = document.querySelectorAll("li");
  console.log(lis);

  let lis1 = document.getElementsByTagName("li");
  console.log(lis1);

  for (let li of lis) {
    // Get the count of all <li> below this <li>
    let descendantsCount = li.querySelectorAll("li").length;
    if (!descendantsCount) continue;

    // Add directly to the text node
    console.log(li.classList);

    li.classList.add("fa", "fa-thumbs-up");
    li.firstChild.innerHTML += " [" + descendantsCount + "] ";
  }
}

addIconToggle();
addEventToTree();
