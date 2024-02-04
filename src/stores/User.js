// user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    todos: [], // Yeni eklenen todos state'i
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        data.forEach((user, index) => {http://localhost:5173/
          if (user.phone) {
            user.phone = user.phone.split(' ')[0];
          }

          const images = ['jane.png', 'jhon.png', 'nazli.png'];
          user.image = `/src/assets/img/${images[index % images.length]}`;
        });

        this.setUsers(data);
        console.log('Users:', this.getUsers());

        // Users fetch edildikten sonra todos'u fetch et
        await this.fetchUserTodos();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async fetchUserTodos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();

        // TODO: İlgili kullanıcının todos'u için filtreleme
        const userTodos = data.filter(todo => todo.userId === this.users[0]?.id);

        this.setTodos(userTodos);
        console.log('Todos:', this.getTodos());
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },

    setUsers(users) {
      this.users = users;
    },

    getUsers() {
      return this.users;
    },

    setTodos(todos) {
      this.todos = todos;
    },

    getTodos() {
      return this.todos;
    },

    getUserById(id) {
      return this.users.find(user => user.id === id);
    },
  },
});

