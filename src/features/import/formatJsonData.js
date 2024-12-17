// ちゃんと、フォーマット確認をして不足情報あれば付け足すようにする
export const formatJsonData = (jsonData) => {
  const data = JSON.parse(jsonData);
  try {
    if (isCorrectNodeFormat(data.nodes) && isCorrectEdgeFormat(data.edges)) {
      throw new Error("Invalid JSON data format");
    }

    return data;
  } catch (error) {
    throw new Error("Error in formatJsonData: " + error);
  }
};

const isCorrectNodeFormat = (nodes) => {
  const nodeDef = {
    id: { type: "number", isRequired: true },
    x: { type: "number", isRequired: false },
    y: { type: "number", isRequired: false },
    r: { type: "number", isRequired: false },
    label: { type: "string", isRequired: false },
    color: { type: "string", isRequired: false },
  };

  if (!Array.isArray(nodes)) {
    throw new Error("Invalid JSON data format");
  }
  for (const node of nodes) {
    for (const key in nodeDef) {
      if (nodeDef[`${key}`].isRequired && !node[`${key}`]) {
        throw new Error(`Missing required field: ${key}`);
      }
      if (typeof node[`${key}`] !== nodeDef[`${key}`].type) {
        throw new Error(`Invalid field type: ${key}`);
      }
    }
  }

  return true;
};

const isCorrectEdgeFormat = (edges) => {
  const edgeDef = {
    id: { type: "number", isRequired: true },
    source: { type: "number", isRequired: true },
    target: { type: "number", isRequired: true },
    weight: { type: "number", isRequired: false },
    label: { type: "string", isRequired: false },
    color: { type: "string", isRequired: false },
  };

  if (!Array.isArray(edges)) {
    throw new Error("Invalid JSON data format");
  }
  for (const edge of edges) {
    for (const key in edgeDef) {
      if (edgeDef[`${key}`].isRequired && !edge[`${key}`]) {
        throw new Error(`Missing required field: ${key}`);
      }
      if (typeof edge[`${key}`] !== edgeDef[`${key}`].type) {
        throw new Error(`Invalid field type: ${key}`);
      }
    }
  }

  return true;
};
