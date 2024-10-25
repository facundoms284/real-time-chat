export const uploadImage = async (event, userId) => {
  const files = event.target.files;
  console.log('files', files);
  if (files) {
    //Creo el FormData
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('userId', userId);

    try {
      const response = await fetch('http://localhost:3000/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log('Error al subir la imagen');
      }
    } catch (error) {
      console.log('Error en la petición de subir imagen', error);
    }
  }
};
