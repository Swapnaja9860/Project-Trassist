import { useEffect } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import ConfirmTrashPage from '../components/ConfirmTrashPage';

interface CategoryProps {
    location: {
      state: {
        photos: string[]; 
      };
    };
  }

// Added by swapnaja

const Category: React.FC<CategoryProps> = (props) => {
const {category, processImage } = usePhotoGallery();

useEffect(() => {
    const fetchAndProcessImages = async () => {
    const photos = props.location.state.photos;
    await processImage(photos);
    };
  
    fetchAndProcessImages();
  }, []);

return(
    <>
      {/* <h3>Detected Categories:</h3>
      {category.map((cat)=>{
        return <h3 key={cat}>{cat}</h3>
      })} */}
      {console.log("----------------category-----------", category)}
      {category.length>0 && <ConfirmTrashPage category={category}/> }
    </>
)
}

export default Category;

