import { checkImageExists } from "./checkImageExists";
export  const constructImageUrl = async (username) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];
    
    for (const extension of imageExtensions) {
      const imageUrl = `http://localhost:4000/uploads/${username}.${extension}`;
      const exists = await checkImageExists(imageUrl);
      
      if (exists) {
        return imageUrl;
      }
    }
  
    return null;
  };