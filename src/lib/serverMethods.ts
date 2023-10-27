import Env from '@/config/env';
import { headers } from 'next/headers';

// * lấy tất cả bài viết
export async function getPosts() {
  const res = await fetch(`${Env.APP_URL}/api/post`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * lấy bài viết của người dùng
export async function getUserPosts() {
  const res = await fetch(`${Env.APP_URL}/api/user/post`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * lấy danh sách người dùng
export async function getUsers() {
  const res = await fetch(`${Env.APP_URL}/api/user`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * lấy một bài viết duy nhất
export async function getPost(id: number) {
  const res = await fetch(`${Env.APP_URL}/api/post/${id}`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * lấy bình luận của người dùng
export async function getUserComments() {
  const res = await fetch(`${Env.APP_URL}/api/user/comment`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * lấy một người dùng
export async function getUser(id: number) {
  const res = await fetch(`${Env.APP_URL}/api/user/${id}`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * lấy danh sách thông báo
export async function getNotifications() {
  const res = await fetch(`${Env.APP_URL}/api/notification`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}

// * tìm kiếm người dùng
export async function exploreUsers(query: string) {
  const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`, {
    cache: 'no-cache',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const response = await res.json();

  return response?.data;
}