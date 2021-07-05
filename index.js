let loader = document.getElementById('loader');
let load = function () {
  loader.style.display = 'none';
};

let url = 'https://api.github.com/users/KseniaVislova';
let date = new Date();

let userName = (url) => {
  let split = url.split('/');
  let name = split[4];
  if (name === undefined || name === null) {
    name = 'Информация о пользователе не доступна';
  }
  return name;
};

const getName = new Promise((resolve, reject) => {
  setTimeout(
    () => (userName ? resolve(userName) : reject('имя не найдено')),
    2000
  );
});

const getDate = new Promise((resolve, reject) => {
  setTimeout(() => {
    load();
    resolve(date);
  }, 3000);
});

Promise.all([getDate, getName])
  .then(() => fetch(url))
  .then((result) => result.json())
  .then((json) => {
    let img = document.createElement('img');
    img.src = json.avatar_url;
    document.body.append(img);

    let createName = (json) => {
      let name = json.name;
      if (json.name === undefined || json.name === null) {
        name = 'Информация о пользователе не доступна';
      }

      return name;
    };

    let name = document.createElement('a');
    name.href = json.html_url;
    name.innerHTML = ` ${createName(json)}`;
    document.body.append(name);

    let createBio = (json) => {
      let bio = json.bio;
      if (json.bio === undefined || json.bio === null) {
        bio = 'Информация о пользователе не доступна';
      }
      return bio;
    };

    let bio = document.createElement('p');
    bio.innerHTML = `${createBio(json)}`;
    document.body.append(bio);

    let dateInner = document.createElement('p');
    dateInner.innerHTML = `Дата: ${date}`;
    document.body.append(dateInner);
  })
  .catch((err) => console.log(err));
