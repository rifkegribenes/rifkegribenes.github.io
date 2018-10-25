/** miscellaneous utility methods **/

/** Helper method to remove duplicates from an array **/
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

module.exports = { onlyUnique };
