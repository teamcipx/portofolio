
import { db } from './firebase';
import { Project, Product, BlogPost, Message, Order, Testimonial } from '../types';
import firebase from 'firebase/compat/app';

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

// --- Testimonials ---
export const getTestimonials = () => fetchData<Testimonial>('testimonials');
export const addTestimonial = (data: Omit<Testimonial, 'id'>) => db.collection('testimonials').add(data);
export const deleteTestimonial = (id: string) => db.collection('testimonials').doc(id).delete();

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
    const snapshot = await db.collection('messages').get();
    const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
    return msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error fetching messages", error);
    return [];
  }
};

export const replyToMessage = (messageId: string, reply: string) => {
  return db.collection('messages').doc(messageId).update({ reply });
};

export const subscribeToUserMessages = (email: string, callback: (messages: Message[]) => void) => {
  return db.collection('messages')
    .where('email', '==', email)
    .onSnapshot(snapshot => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      // Client-side sort: Oldest first (for chat history flow)
      msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      callback(msgs);
    });
};

// --- Orders ---
export const createOrder = (order: Order) => {
  return db.collection('orders').add(order);
};

export const getUserOrders = async (email: string): Promise<Order[]> => {
  try {
    const snapshot = await db.collection('orders').where('userEmail', '==', email).get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error fetching orders", error);
    return [];
  }
};

// ADMIN: Get All Orders
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const snapshot = await db.collection('orders').get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error fetching all orders", error);
    return [];
  }
};

// ADMIN: Update Order Status
export const updateOrderStatus = (orderId: string, status: 'pending' | 'completed' | 'rejected') => {
  return db.collection('orders').doc(orderId).update({ status });
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
