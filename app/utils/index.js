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

/** Error handler for route controllers */
const handleError = (res, err) => {
  return res.status(500).json({ message: err });
};

module.exports = { onlyUnique, randomText, handleError };
