import { SerializedUser } from './../../server/src/users';

export function renderUsername(name: string) {
  const parent = $('#username');
  parent.innerHTML = `<h1>${name}</h1>`;
}

export function renderUsers(users: SerializedUser[], onClick: Function) {
  const parent = $('#userlist');

  for (const user of users) {
    const el = document.createElement('div');
    const btn = document.createElement('button');

    btn.innerHTML = user.name;
    btn.onclick = () => onClick(user);

    el.appendChild(btn);
    parent.appendChild(el);
  }
}

function $(id: string) {
  const found = document.querySelector(id);

  if (found) {
    found.innerHTML = '';
    // Array.from(found.children).forEach(x => x.remove());
    return found;
  }

  const created = document.createElement('div');
  created.id = id.substr(1);
  document.body.appendChild(created);
  return created;
}
