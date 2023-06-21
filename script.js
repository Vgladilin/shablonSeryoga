async function sendUserData(){
  let inputName = document.querySelector('.name_in').value;
  let inputSurname = document.querySelector('.surname_in').value;

  if(inputName == "" && inputSurname == ""){
      return false;
  }
  else{

  let user = {
      name:inputName,
      surname:inputSurname
  }

  // console.log(user);

  let response = await fetch('/api/user/',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(user)
  })

  if (response.status === 200) {
      const addedUser = await response.json()
      console.log('Пользователь успешно добавлен', addedUser);
  }

  getUsers('get/users/');
  return true;
}
}

function openTab(tabId) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
  
    var navButtons = document.getElementsByClassName("nav-button");
    for (var j = 0; j < navButtons.length; j++) {
      navButtons[j].classList.remove("active");
    }
  
    document.getElementById(tabId).style.display = "block";
    document.querySelector("button[data-tab='" + tabId + "']").classList.add("active");
  }
  
  var loginForm = document.getElementById("loginForm");
  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");
  
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var username = usernameInput.value;
    var password = passwordInput.value;
    console.log("Username: " + username + ", Password: " + password);
  
    // Здесь можно добавить логику для обработки авторизации
    // Например, можно отправить данные на сервер для проверки и выполнения соответствующих действий
  
    closeModal(); // Закрываем модальное окно после отправки формы
  });
  
//   function openModal() {
//     var modal = document.getElementById("modal");
//     modal.style.display = "block";
//     usernameInput.value = ""; // Очищаем поле ввода имени пользователя
//     passwordInput.value = ""; // Очищаем поле ввода пароля
//   }
  
//   function closeModal() {
//     var modal = document.getElementById("modal");
//     modal.style.display = "none";
//   }
function redirectToSecondPage() {
    window.location.href = 'autorization.html';
  }

  const modelWindow = document.querySelector('.modelWindow')
const addButton = document.querySelector('.addButton')
addButton.addEventListener('click', x => (modelWindow.style.visibility = 'visible'))


function blank(name, surname, i, element){
  let white_sqr = document.querySelector('.white_sqr')
  const panel = document.createElement("div")
  panel.className = 'panel';
  const id_Name = document.createElement("label")
  id_Name.className = 'id_Name'
  const panel_Name = document.createElement("label")
  panel_Name.className = 'panel_Name'
  const panel_Surname = document.createElement("label")
  panel_Surname.className = 'panel_Surname'
  const btn = document.createElement("div")
  btn.className = 'btn';
  btn.style.display = 'flex';
  const delBtn = document.createElement("button")
  delBtn.className = 'addBtn';
  
  let panelDiv = white_sqr.appendChild(panel);
  let id_Name_text = panelDiv.appendChild(id_Name)
  id_Name_text.innerText = i+1;
  id_Name_text.style.margin='5px'
  let panel_Name_text = panelDiv.appendChild(panel_Name)
  panel_Name_text.innerText = name;
  let panel_Surname_text = panelDiv.appendChild(panel_Surname)
  panel_Surname_text.innerText = surname;

  let buttonsDiv = panel.appendChild(btn);
  let DELETE = buttonsDiv.appendChild(delBtn)
  DELETE.innerText='add'
  DELETE.className='addBtn'+i;
  DELETE.id = i;
  // var delButton = document.querySelector('.delBtn'+i)
  // delButton.addEventListener('click', () => {delete_From(i, element)})

}
blank()