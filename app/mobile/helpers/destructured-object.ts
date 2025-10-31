export function destructuredObject(
  obj: Object,
  data: "key" | "value" = "value"
): any[] {
  if (data === "key") return Object.keys(obj);

  const newObjData = Object.values(obj);
  const values = [];
  for (let i = 0; i < newObjData.length; i++) {
    const valueData = newObjData[i];

    if (valueData instanceof Array) continue;

    if (valueData instanceof Date) {
      values.push(valueData.toString());
      continue;
    }

    if (valueData instanceof Object) {
      values.push(...destructuredObject(valueData, "value"));
      continue;
    }

    values.push(valueData);
  }

  return values;
}
