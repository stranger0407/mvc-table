import { User } from '../model/model';

export class Services {
  private url: string;
  private users: User[] = [];

  constructor() {
    this.url = 'https://dummyjson.com/users';
  }

  async getUsers(): Promise<{ users: User[] }> {
    const response = await fetch(`${this.url}`);
    if (!response.ok) {
      throw new Error('${response.status}:somethingerror');
    }
    const data = await response.json();
    this.users = data.users;
    return data;
  }

  addUser(data: User): User[] {
    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: `${data.firstName}`,
        lastName: `${data.lastName}`,
        age: `${data.age}`,
        username: `${data.username}`,
        email: `${data.email}`,
        gender: `${data.gender}`,
      }),
    })
      .then((res) => res.json())
      .then(console.log);

    if (!data.id) {
      data.id = Date.now();
    }
    this.users.push(data);
    return this.users;
  }

  async sortUser(
    sortfeild1: string,
    sortfeild2: string,
  ): Promise<{ users: User[] }> {
    const response = await fetch(
      `${this.url}?sortBy=${sortfeild2}&order=${sortfeild1}`,
    );
    const data = await response.json();
    return data;
  }

  async deleteUser(id: string) {
    fetch(`https://dummyjson.com/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(console.log);
  }
}

/*

import { User } from '../model/model';

interface ApiResponse<T> {
  users: T[];
  total?: number;
  skip?: number;
  limit?: number;
}

export class Services {
  private readonly BASE_URL = 'https://dummyjson.com/users';
  private users: User[] = [];

  // Centralized error handler
  private async handleApiResponse<T>(
    response: Response, 
    errorMessage: string = 'An error occurred'
  ): Promise<T> {
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`${response.status}: ${errorBody || errorMessage}`);
    }
    return response.json();
  }

  async getUsers(limit: number = 10, skip: number = 0): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.BASE_URL}?limit=${limit}&skip=${skip}`);
      const data = await this.handleApiResponse<ApiResponse<User>>(response, 'Failed to fetch users');
      
      this.users = data.users;
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async addUser(userData: Omit<User, 'id'>): Promise<User> {
    try {
      // Validate input
      this.validateUserData(userData);

      const response = await fetch(`${this.BASE_URL}/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const addedUser = await this.handleApiResponse<User>(response, 'Failed to add user');
      
      // Assign local ID if not provided by API
      const finalUser = {
        ...addedUser,
        id: addedUser.id || Date.now()
      };

      this.users.push(finalUser);
      return finalUser;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async sortUser(
    sortField: keyof User = 'firstName', 
    order: 'asc' | 'desc' = 'asc'
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(
        `${this.BASE_URL}?sortBy=${sortField}&order=${order}`
      );
      
      const data = await this.handleApiResponse<ApiResponse<User>>(
        response, 
        'Failed to sort users'
      );
      
      this.users = data.users;
      return data;
    } catch (error) {
      console.error('Error sorting users:', error);
      throw error;
    }
  }

  async deleteUser(id: number | string): Promise<void> {
    try {
      const response = await fetch(`${this.BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      });

      await this.handleApiResponse(response, 'Failed to delete user');
      
      // Remove user from local array
      this.users = this.users.filter(user => user.id !== id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Get current users (useful for view without re-fetching)
  getCurrentUsers(): User[] {
    return [...this.users];
  }

  // Private validation method
  private validateUserData(userData: Partial<User>): void {
    const requiredFields: (keyof User)[] = [
      'firstName', 'lastName', 'email', 
      'username', 'age', 'gender'
    ];

    // Check for missing required fields
    const missingFields = requiredFields.filter(field => !userData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Additional specific validations
    if (userData.email && !this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    if (userData.age && (isNaN(Number(userData.age)) || Number(userData.age) < 0)) {
      throw new Error('Age must be a valid positive number');
    }
  }

  // Email validation method
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

*/
/*

import { User } from '../model/model';

export class Services {
  private url: string;
  private users: User[] = [];

  constructor() {
    this.url = 'https://dummyjson.com/users';
  }

  // ... existing methods ...

  async searchUsers(query: string): Promise<{ users: User[] }> {
    const response = await fetch(`${this.url}/search?q=${query}`);
    if (!response.ok) {
      throw new Error(`${response.status}: Search error`);
    }
    const data = await response.json();
    return data;
  }
}

*/