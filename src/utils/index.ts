class CommonUtility {
  static buildNestedStructure(flatArray: Array<any>) {
    const idMapping = flatArray.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});

    let root: Array<any> = [];
    flatArray.forEach((el) => {
      if (el.parentId === 0) {
        root.push(el);
        return;
      }
      const parentEl = flatArray[idMapping[el.parentId]];
      parentEl.children = [...(parentEl.children || []), el];
    });
    return root;
  }

  static flattenNestedStructure(nestedArray: Array<any>) {
    let flatArray: Array<any> = [];
    function flatten(node: any, parentId = 0) {
      let { children, ...restNode } = node;
      flatArray.push({ ...restNode, parentId });

      if (children && children.length > 0) {
        children.forEach((child: any) => flatten(child, node.id));
      }
    }
    nestedArray.forEach((rootNode) => flatten(rootNode));
    return flatArray;
  }

  static encryptQueryString(queryString: string | number) {
    const isProduction = process.env.REACT_APP_ENV === "production";

    if (isProduction) {
      return btoa(queryString.toString());
    } else {
      return queryString;
    }
  }
}

export default CommonUtility;
