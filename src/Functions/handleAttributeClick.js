const handleAttributesClick = (attribute, attributes, attributeId, index) => {
  const arr = attribute.items.map((item) => {
    if (item.id === attributeId) {
      item = { ...item, selected: true };
      return item;
    } else {
      item = { ...item, selected: false };
      return item;
    }
  });

  attribute = { ...attribute, items: arr };

  const newArr = [...attributes];
  if (index !== -1) {
    newArr[index] = attribute;
  }

  return newArr;
};

export default handleAttributesClick;
