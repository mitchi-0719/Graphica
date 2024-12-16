export const setImportFileData = (files, setImportData, setFileName) => {
  if (!files || files.length === 0) return;

  const file = files[0];
  const fileName = file.name;
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      // TODO: 中身を見て不足情報の追加、エラーハンドリング
      const data = JSON.parse(e.target.result);
      setImportData(data);
      setFileName(fileName);
    } catch (error) {
      console.error("Error parsing JSON file:", error);
    }
  };
  reader.readAsText(file);
};
