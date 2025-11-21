
import { db } from './firebase';
import { Project, Product, BlogPost, Message } from '../types';

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
export const getBlogById = async (id: string): Promise<BlogPost | null> => {
  try {
    const doc = await db.collection('blogs').doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog", error);
    return null;
  }
};
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
    read: false,
    reply: ''
  });
};

export const getMessages = async () => {
  try {
    // Admin view: newest first. 
    // If this fails due to index, you can remove orderBy here too and sort in JS.
    // However, simple ordering usually works if not combined with complex where clauses.
    const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching messages", error);
    // Fallback fetch without order if index is missing
    const snapshot = await db.collection('messages').get();
    const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
    return msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
};

export const replyToMessage = (messageId: string, reply: string) => {
  return db.collection('messages').doc(messageId).update({ reply });
};

export const subscribeToUserMessages = (email: string, callback: (messages: Message[]) => void) => {
  // Removed orderBy('createdAt') to prevent "Missing Index" error on composite queries.
  // We filter by email here, then sort the results in memory.
  return db.collection('messages')
    .where('email', '==', email)
    .onSnapshot(snapshot => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      // Client-side sort: Oldest first (for chat history flow)
      msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      callback(msgs);
    });
};

// --- Settings / Profile ---
export const getProfileSettings = async () => {
  try {
    const doc = await db.collection('settings').doc('profile').get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error("Error fetching profile settings", error);
    return null;
  }
};

export const updateProfileSettings = (data: any) => {
  return db.collection('settings').doc('profile').set(data, { merge: true });
};
