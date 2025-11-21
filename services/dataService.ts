
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { PROJECTS, PRODUCTS, BLOGS } from '../constants';
import { Project, Product, BlogPost } from '../types';

// Generic Fetch with Fallback
// If Firebase is empty (fresh project), it returns the constant mock data.
export const fetchData = async <T>(collectionName: string, fallbackData: T[]): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`No data in ${collectionName}, using fallback.`);
      return fallbackData;
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return fallbackData;
  }
};

// --- Projects ---
export const getProjects = () => fetchData<Project>('projects', PROJECTS);
export const addProject = (data: Omit<Project, 'id'>) => addDoc(collection(db, 'projects'), data);
export const deleteProject = (id: string) => deleteDoc(doc(db, 'projects', id));

// --- Products ---
export const getProducts = () => fetchData<Product>('products', PRODUCTS);
export const addProduct = (data: Omit<Product, 'id'>) => addDoc(collection(db, 'products'), data);
export const deleteProduct = (id: string) => deleteDoc(doc(db, 'products', id));

// --- Blogs ---
export const getBlogs = () => fetchData<BlogPost>('blogs', BLOGS);
export const addBlog = (data: Omit<BlogPost, 'id'>) => addDoc(collection(db, 'blogs'), data);
export const deleteBlog = (id: string) => deleteDoc(doc(db, 'blogs', id));

// --- Messages (Chat) ---
export const sendMessageToAdmin = (text: string, sender: string = 'Guest') => {
  return addDoc(collection(db, 'messages'), {
    text,
    sender,
    createdAt: new Date().toISOString(),
    read: false
  });
};

export const getMessages = async () => {
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching messages", error);
    return [];
  }
};
