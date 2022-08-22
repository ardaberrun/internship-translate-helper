export default async function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      if(reader.result) {
        resolve(reader.result as string);
      }
    });

    reader.readAsText(file, 'UTF-8');
  });
}
