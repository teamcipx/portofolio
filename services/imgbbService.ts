
// Service to handle image uploads to ImgBB
// Get your API Key here: https://api.imgbb.com/

// NOTE: For a production app, use an Environment Variable (process.env.REACT_APP_IMGBB_KEY)
// This is a public demo key, please replace it with your own from api.imgbb.com
const IMGBB_API_KEY = '06c58070517e85833b7443573f42c52c'; 

export const uploadImageToImgBB = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      console.error('ImgBB Upload Failed:', data.error);
      alert(`Upload failed: ${data.error?.message || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    alert('Network error while uploading image.');
    return null;
  }
};
