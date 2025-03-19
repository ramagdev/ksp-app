// ImageService.ts
export const resizeImage = async (file: File, maxWidth: number, maxHeight: number) => {
    const img = document.createElement('img');
    img.src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
    
    await new Promise((resolve) => (img.onload = resolve));
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Hitung rasio resize
    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return new Promise<Blob>((resolve) => 
      canvas.toBlob((blob) => blob && resolve(blob), 'image/jpeg', 0.8)
    );
  };