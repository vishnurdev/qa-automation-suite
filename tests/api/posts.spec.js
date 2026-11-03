// API tests against JSONPlaceholder, a free public fake REST API.
// (It accepts writes but doesn't store them, so we check the responses.)
const { test, expect } = require('@playwright/test');

test.describe('Posts API', () => {
  test('GET /posts returns 100 posts with the right shape', async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');

    const posts = await res.json();
    expect(posts).toHaveLength(100);
    for (const p of posts) {
      expect(p).toEqual(expect.objectContaining({
        userId: expect.any(Number), id: expect.any(Number), title: expect.any(String), body: expect.any(String),
      }));
    }
  });

  test('GET /posts/1 returns a single post', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.ok()).toBeTruthy();
    const post = await res.json();
    expect(post.id).toBe(1);
    expect(post.title.length).toBeGreaterThan(0);
  });

  test('GET a missing post returns 404', async ({ request }) => {
    const res = await request.get('/posts/99999');
    expect(res.status()).toBe(404);
  });

  test('filter posts by user with a query parameter', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 3 } });
    const posts = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.userId === 3)).toBe(true);
  });

  test('POST /posts creates a post', async ({ request }) => {
    const payload = { title: 'QA automation', body: 'Created by Playwright', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    const created = await res.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  test('PUT /posts/1 replaces a post', async ({ request }) => {
    const payload = { id: 1, title: 'Updated', body: 'New body', userId: 1 };
    const res = await request.put('/posts/1', { data: payload });
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(payload);
  });

  test('PATCH /posts/1 updates one field', async ({ request }) => {
    const res = await request.patch('/posts/1', { data: { title: 'Patched title' } });
    expect(res.status()).toBe(200);
    const post = await res.json();
    expect(post.title).toBe('Patched title');
    expect(post.body).toBeTruthy(); // other fields kept
  });

  test('DELETE /posts/1 succeeds', async ({ request }) => {
    const res = await request.delete('/posts/1');
    expect(res.status()).toBe(200);
  });

  test('response time is under 2 seconds', async ({ request }) => {
    const start = Date.now();
    const res = await request.get('/users');
    expect(res.ok()).toBeTruthy();
    expect(Date.now() - start).toBeLessThan(2000);
  });
});
