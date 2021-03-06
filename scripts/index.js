const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

export const setUpUI = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "none";
    });
  } else {
    loggedInLinks.forEach((link) => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "block";
    });
  }
};

// setup guides
export const setupGuides = (data) => {
  if (data.length) {
    let html = "";

    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
      </li>
    `;
      html += li;
    });

    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = "<h5 class='center-align'>login to view guides</h5>";
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
