
// Service to handle image uploads to ImgBB
// Get your API Key here: https://api.imgbb.com/

// NOTE: For a production app, use an Environment Variable (process.env.REACT_APP_IMGBB_KEY)
const IMGBB_API_KEY = 'ec53d0942b9aefcb5a49770be5dfad14'; 

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
