export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert image"));
      }
    };

    reader.onerror = () => {
      reject(new Error("File reading error"));
    };

    reader.readAsDataURL(file);
  });
}