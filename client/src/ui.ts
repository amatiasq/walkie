import { User } from './users';

export function forceUserToSetName() {
  let name = sessionStorage.getItem('amongus:username');
  while (!name) name = prompt('Username');
  sessionStorage.setItem('amongus:username', name);
  return name;
}

export function renderUsername(name: string) {
  const parent = $('#username');
  parent.innerHTML = `<h1>${name}</h1>`;
}

export function renderCTA(text: string, onClick: Function) {
  const parent = $('#cta');
  const button = makeButton(text, () => {
    parent.innerHTML = '';
    onClick();
  });

  parent.appendChild(document.createElement('hr'));
  parent.appendChild(button);
}

export function renderMessage(message: string) {
  const parent = $('#message');
  parent.innerHTML = message;
}

export function renderUsers(users: User[], onClick: Function) {
  const parent = $('#userlist');

  for (const user of users) {
    const el = document.createElement('div');

    const buttonClick = async () => {
      await onClick(user);
      renderUsers(users, onClick);
    };

    const button = user.isCalling
      ? makeButton(`${user.name} (colgar)...`, buttonClick)
      : makeButton(user.name, buttonClick);

    el.appendChild(button);
    parent.appendChild(el);
  }
}

function $(id: string) {
  const found = document.querySelector(id);

  if (found) {
    found.innerHTML = '';
    return found;
  }

  const created = document.createElement('div');
  created.id = id.substr(1);
  document.body.appendChild(created);
  return created;
}

function makeButton(text: string, onClick: (e: Event) => void) {
  const btn = document.createElement('button');
  btn.innerHTML = text;
  btn.style.fontSize = '3em';
  btn.style.padding = '0.5em';
  btn.onclick = onClick as any;
  return btn;
}
