/** miscellaneous utility methods **/

/** Helper method to remove duplicates from an array **/
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

/** Helper method to generate random text strings for testing */
const randomText = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

module.exports = { onlyUnique, randomText };
