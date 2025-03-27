import { User } from '../model/model';

export class View {
  private user_list: HTMLElement;
  private submitHandler: ((e: SubmitEvent) => void) | null = null;
  constructor() {
    const userList = document.querySelector('.user_list');
    if (!userList) {
      throw new Error();
    }
    this.user_list = userList as HTMLElement;
    this.closebtn();
  }

  private closebtn() {
    const addForm = document.getElementById('addForm') as HTMLFormElement;
    const container = document.getElementById('containerId');
    const closeButton = document.createElement('button');

    closeButton.textContent = 'close';
    closeButton.id = 'close-form-btn';
    closeButton.type = 'button';
    closeButton.addEventListener('click', () => {
      if (addForm && container) {
        addForm.style.zIndex = '-1';
        container.style.opacity = '1';
        addForm.reset();
      }
    });
    addForm.querySelector('.formInput')?.after(closeButton);
  }

  renderSort(sortOption: string[], sortValue: string[], select: HTMLElement) {
    for (let i = 0; i < sortOption.length; i++) {
      const option = document.createElement('option');
      option.textContent = sortOption[i];
      option.value = sortValue[i];
      option.ariaLabel = sortOption[i];
      select.appendChild(option);
    }
  }

  render(data: User[]): void {
    this.user_list.innerHTML = '';
    data.forEach((element) => {
      const user = document.createElement('div');
      const first_name = document.createElement('span');
      const last_name = document.createElement('span');
      const email = document.createElement('span');
      const username = document.createElement('span');
      const age = document.createElement('span');
      const gender = document.createElement('span');
      const deletebtn = document.createElement('button');

      deletebtn.className = 'delete-btn';
      deletebtn.textContent = 'Delete';

      user.className = 'user_list_item';
      first_name.className = 'user_list_first_name';
      last_name.className = 'user_list_last_name';
      age.className = 'user_list_age';
      email.className = 'user_list_email';
      username.className = 'user_list_username';
      gender.className = 'user_list_gender';
      first_name.textContent = element.firstName;
      last_name.textContent = element.lastName;
      email.textContent = element.email;
      username.textContent = element.username;
      age.textContent = element.age;
      gender.textContent = element.gender;

      deletebtn.value = element.id.toString();

      user.appendChild(first_name);
      user.appendChild(last_name);
      user.appendChild(email);
      user.appendChild(username);
      user.appendChild(age);
      user.appendChild(gender);
      user.appendChild(deletebtn);
      user.id = element.id.toString();
      this.user_list.appendChild(user);
    });
  }

  addUser(): Promise<User[]> {
    const addForm = document.getElementById('addForm') as HTMLFormElement;
    addForm.style.display = 'flex';
    const container = document.getElementById('containerId');

    if (!addForm || !container) {
      console.error('Required elements not found');
      return Promise.resolve([]);
    }
    const users: User[] = [];
    return new Promise((resolve) => {
      addForm.style.zIndex = '1';
      container.style.opacity = '0.2';
      if (this.submitHandler) {
        addForm.removeEventListener('submit', this.submitHandler);
      }
      this.submitHandler = (e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(addForm);
        const id = Date.now().toString();
        const newuser: User = {
          firstName: data.get('firstName') as string,
          lastName: data.get('lastName') as string,
          age: data.get('age') as string,
          email: data.get('email') as string,
          username: data.get('username') as string,
          gender: data.get('gender') as string,
          id: Number(id),
        };
        users.push(newuser);
        addForm.reset();
        addForm.style.zIndex = '-1';
        container.style.opacity = '1';

        resolve(users);
      };
      addForm.addEventListener('submit', this.submitHandler);
    });
  }

  deleteUser(id: string): void {
    const val = document.getElementById(id);
    if (val) {
      val.style.display = 'none';
    }
  }
}



// render(data: User[]): void {
//   // Clear existing content
//   this.user_list.innerHTML = '';

//   // Create table element
//   const table = document.createElement('table');
//   table.className = 'user-data-table';

//   // Create table header row
//   const headerRow = document.createElement('tr');
//   const headers = ['First Name', 'Last Name', 'Email', 'Username', 'Age', 'Gender', 'Actions'];
//   headers.forEach(headerText => {
//     const th = document.createElement('th');
//     th.textContent = headerText;
//     headerRow.appendChild(th);
//   });
//   table.appendChild(headerRow);

//   // Create table rows for each user
//   data.forEach((element) => {
//     const row = document.createElement('tr');
//     row.id = element.id.toString();

//     // Create cells for user data
//     const cellData = [
//       element.firstName,
//       element.lastName,
//       element.email,
//       element.username,
//       element.age,
//       element.gender
//     ];

//     cellData.forEach(data => {
//       const cell = document.createElement('td');
//       cell.textContent = data;
//       row.appendChild(cell);
//     });

//     // Create delete button cell
//     const deleteCell = document.createElement('td');
//     const deletebtn = document.createElement('button');
//     deletebtn.className = 'delete-btn';
//     deletebtn.textContent = 'Delete';
//     deletebtn.value = element.id.toString();
//     deleteCell.appendChild(deletebtn);
//     row.appendChild(deleteCell);

//     table.appendChild(row);
//   });

//   // Append the table to the user list container
//   this.user_list.appendChild(table);
// }


/*
import { User } from '../model/model';

export class View {
  private user_list: HTMLElement;
  private submitHandler: ((e: SubmitEvent) => void) | null = null;
  private errorContainer: HTMLElement;

  constructor() {
    const userList = document.querySelector('.user_list');
    if (!userList) {
      throw new Error('User list element not found');
    }
    this.user_list = userList as HTMLElement;

    // Create error container
    this.errorContainer = document.createElement('div');
    this.errorContainer.id = 'error-container';
    this.errorContainer.className = 'error-message';
    this.user_list.parentElement?.insertBefore(this.errorContainer, this.user_list);

    this.closebtn();
  }

  // ... existing methods ...

  showError(message: string): void {
    this.errorContainer.textContent = message;
    this.errorContainer.style.display = 'block';
    
    // Automatically hide error after 3 seconds
    setTimeout(() => {
      this.errorContainer.style.display = 'none';
    }, 3000);
  }
}

*/