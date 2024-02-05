// user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    todos: [],
    posts: [],
    albums: [],
    photos: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        data.forEach((user, index) => {
          if (user.phone) {
            user.phone = user.phone.split(' ')[0];
          }

          const images = ['jane.png', 'john.png', 'nazli.png'];
          user.image = `/src/assets/img/${images[index % images.length]}`;
        });

        this.setUsers(data);

        // Users fetch edildikten sonra todos'u fetch et
        await this.fetchUserTodos();
      } catch (error) {
      }
      await this.fetchUserAlbums();
      await this.fetchUserPhotos();
    },

    async fetchUserTodos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();

        const userTodos = data
          .filter(todo => todo.userId === this.users[0]?.id)
          .map(todo => ({
            ...todo,
            title: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
          }));

        this.setTodos(userTodos);
      } catch (error) {
      }
    },

    async fetchUserPosts(userId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        let data = await response.json();

        data = data.map(post => {
          const titleWords = post.title.split(' ');
          const updatedTitle = titleWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

          return {
            ...post,
            title: updatedTitle,
            body: post.body.charAt(0).toUpperCase() + post.body.slice(1),
          };
        });

        this.setPosts(data);
      } catch (error) {
      }
    },

    async fetchUserAlbums() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${this.users[0]?.id}`);
        const data = await response.json();

        const formattedAlbums = data.map(album => ({
          ...album,
          title: album.title.charAt(0).toUpperCase() + album.title.slice(1),
        }));

        this.setAlbums(formattedAlbums);

        // Her albüm için fotoğrafları ayrı ayrı getir
        for (const album of formattedAlbums) {
          await this.fetchAlbumPhotos(album.id);
          album.photos = this.getPhotos().slice(); // Albüm fotoğraflarını kopyala
        }
      } catch (error) {
      }
    },
    
    async fetchUserPhotos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();

        const userPhotos = data
          .filter(photo => photo.albumId === this.albums[0]?.id)
          .map(photo => ({
            ...photo,
            title: photo.title.charAt(0).toUpperCase() + photo.title.slice(1),
          }));

        this.setPhotos(userPhotos);
      } catch (error) {
      }
    },

    async fetchAlbumPhotos(albumId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const data = await response.json();

        const albumPhotos = data.map(photo => ({
          ...photo,
          title: photo.title.charAt(0).toUpperCase() + photo.title.slice(1),
        }));

        this.setPhotos(albumPhotos);
      } catch (error) {
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

    setPosts(posts) {
      this.posts = posts;
    },

    getPosts() {
      return this.posts;
    },

    setAlbums(albums) {
      this.albums = albums;
    },

    getAlbums() {
      return this.albums;
    },

    setPhotos(photos) {
      this.photos = photos;
    },

    getPhotos() {
      return this.photos;
    },

    getUserById(id) {
      return this.users.find(user => user.id === id);
    },
  },
});
