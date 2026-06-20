import { test, expect } from "@playwright/test";

const BASE_URL = "https://practice.expandtesting.com/notes/api";

test("API health check", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/health-check`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.message).toBe("Notes API is Running");
});

test("Register a new user via API", async ({ request }) => {
  const uniqueEmail = `testuser${Date.now()}@gmail.com`;

  const response = await request.post(`${BASE_URL}/users/register`, {
    data: {
      name: "Test User",
      email: uniqueEmail,
      password: "Test1234!",
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.message).toBe("User account created successfully");
  expect(body.data.email).toBe(uniqueEmail);
});

test("Login via API and receive token", async ({ request }) => {
  const response = await request.post(`${BASE_URL}/users/login`, {
    data: {
      email: "testuser1234567@gmail.com",
      password: "Test1234!",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.message).toBe("Login successful");
  expect(body.data.token).toBeTruthy();
});

test("Get user profile with valid token", async ({ request }) => {
  // Step 1 — login to get token
  const loginResponse = await request.post(`${BASE_URL}/users/login`, {
    data: {
      email: "testuser1234567@gmail.com",
      password: "Test1234!",
    },
  });

  const loginBody = await loginResponse.json();
  const token = loginBody.data.token;

  // Step 2 — use token to get profile
  const profileResponse = await request.get(`${BASE_URL}/users/profile`, {
    headers: {
      "x-auth-token": token,
    },
  });

  expect(profileResponse.status()).toBe(200);

  const profileBody = await profileResponse.json();
  expect(profileBody.success).toBe(true);
  expect(profileBody.data.email).toBe("testuser1234567@gmail.com");
});

test("Get user profile without a token", async ({ request }) => {
  const profileResponse = await request.get(`${BASE_URL}/users/profile`);

  expect(profileResponse.status()).toBe(401);

  const profileBody = await profileResponse.json();
  expect(profileBody.success).toBe(false);
  expect(profileBody.message).toBe(
    "No authentication token specified in x-auth-token header",
  );
});


test('Create and delete a note via API', async ({ request }) => {
  // Step 1 — login to get token
  const loginResponse = await request.post(`${BASE_URL}/users/login`, {
    data: {
      email: 'testuser1234567@gmail.com',
      password: 'Test1234!'
    }
  });
  const loginBody = await loginResponse.json();
  const token = loginBody.data.token;

  // Step 2 — create a note
  const createResponse = await request.post(`${BASE_URL}/notes`, {
    headers: { 'x-auth-token': token },
    data: {
      title: 'My test note',
      description: 'Created by Playwright',
      category: 'Home'
    }
  });

  expect(createResponse.status()).toBe(200);
  const createBody = await createResponse.json();
  expect(createBody.success).toBe(true);
  expect(createBody.data.title).toBe('My test note');

  const noteId = createBody.data.id;

  // Step 3 — delete the note
  const deleteResponse = await request.delete(`${BASE_URL}/notes/${noteId}`, {
    headers: { 'x-auth-token': token }
  });

  expect(deleteResponse.status()).toBe(200);
  const deleteBody = await deleteResponse.json();
  expect(deleteBody.success).toBe(true);
  expect(deleteBody.message).toBe('Note successfully deleted');
});