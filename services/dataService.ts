
import { db } from './firebase';
import { Project, Product, BlogPost } from '../types';

// Generic Fetch Function (Strictly Firebase)
export const fetchData = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot = await db.collection(collectionName).get();
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
};

// --- Projects ---
export const getProjects = () => fetchData<Project>('projects');
export const addProject = (data: Omit<Project, 'id'>) => db.collection('projects').add(data);
export const deleteProject = (id: string) => db.collection('projects').doc(id).delete();

// --- Products ---
export const getProducts = () => fetchData<Product>('products');
export const addProduct = (data: Omit<Product, 'id'>) => db.collection('products').add(data);
export const deleteProduct = (id: string) => db.collection('products').doc(id).delete();

// --- Blogs ---
export const getBlogs = () => fetchData<BlogPost>('blogs');
export const addBlog = (data: Omit<BlogPost, 'id'>) => db.collection('blogs').add(data);
export const deleteBlog = (id: string) => db.collection('blogs').doc(id).delete();

// --- Messages (Chat) ---
export const sendMessageToAdmin = (text: string, sender: string = 'Guest', email?: string, photoUrl?: string) => {
  return db.collection('messages').add({
    text,
    sender,
    email: email || '',
    photoUrl: photoUrl || '',
    createdAt: new Date().toISOString(),
    read: false
  });
};

export const getMessages = async () => {
  try {
    const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching messages", error);
    return [];
  }
};
