"use strict";
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var alert = document.querySelector(".error");

var isValid;

var bookmarkContainer = [];

if (localStorage.getItem("bookmark") !== null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark(bookmarkContainer);
}

function submit() {
  switch (true) {
    case bookmarkNameInput.value == null:
    case bookmarkUrlInput.value == null:
    case bookmarkNameInput.value == "":
    case bookmarkUrlInput.value == "":
    case isValid == false:
      alert.classList.add("d-block");
      alert.classList.remove("d-none");
      alert.addEventListener('click', function(event) {
        const errorModal = document.getElementById('errorModal');
        const item = errorModal.querySelector('.item');
      
        if (!item.contains(event.target) && !errorModal.classList.contains('d-none')) {
          errorModal.classList.add('d-none');
          errorModal.classList.remove('d-block');
      
        }
      });
      break;

    default:
      var bookmark = {
        code: bookmarkNameInput.value,
        url: bookmarkUrlInput.value,
      };
      if (
        bookmark.url.trim().toLowerCase().includes('https://') == false &&
        bookmark.url.trim().toLowerCase().includes('http://') == false &&
        bookmark.url.trim().toLowerCase().includes('mailto://') == false
      ) {
        bookmark.url = "https://" + bookmark.url;
      }
      bookmarkContainer.push(bookmark);
      clearForm();
      localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
      displayBookmark(bookmarkContainer);
      console.log(bookmarkContainer);
      break;
  }
}

function clearForm() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
}

function displayBookmark(arr) {
  var cartoona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartoona += `
      <tr>
                  <td>${i + 1}</td>
                  <td>${arr[i].code}</td>
                  <td> <a class="btn visit " href="${
                    arr[i].url
                  }" target="blank"><span><i class="fa-solid fa-eye pe-2"></i></span> Visit</a></td>
                <td> <a onclick="deleteBookmark(${i})" class="btn delete " href=""><span><i class="fa-solid fa-trash-can pe-2"></i></span> Delete</a></td>
                  
                </tr>
    `;
  }
  document.getElementById("rowData").innerHTML = cartoona;
}

function deleteBookmark(deletedIndex) {
  bookmarkContainer.splice(deletedIndex, 1);
  displayBookmark(bookmarkContainer);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
}

function validateInput(element) {
  var regex = {
    bookmarkName: /^([a-z]|[A-Z]){3,}/,
    bookmarkUrl: new RegExp(
      '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    ),
  };

  if (regex[element.id].test(element.value) ) {
    isValid = true;
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    isValid = false;
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function closeForm() {
  alert.classList.add("d-none");
  alert.classList.remove("d-block");
}


// is another function tyo valid url **and i Don't use it**
function isValidUrl(string) {
  try {
    new URL(string.value);

    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    console.log(true);
  } catch (err) {
    bookmarkUrlInput.classList.add("is-invalid");
    bookmarkUrlInput.classList.remove("is-valid");
    console.log(false);
  }
}
