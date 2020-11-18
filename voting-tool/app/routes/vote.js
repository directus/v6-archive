const directus = require('../directus');

const vote = (req, res, redirectToItem = false) => {
  const id = req.body.request_id;
  const action = req.body.action;
  const username = req.user;

  // If user isn't logged in, redirect to the homepage immediately
  if (!username) return res.redirect('/');

  // Check if user has already voted for this item
  directus
    .getItems('votes', {
      'in[request_id]': id,
      'in[username]': username,
      'in[active]': 1
    })
    .then(({ data }) => {
      // If data exists, update the record accordingly
      if (data.length > 0) {
        const vote = data[0];
        const voteID = vote.id;
        const value = vote.value;

        const dataToUpdate = {};

        if (value === 0) {
          dataToUpdate.value = action === 'plus' ? 1 : -1;
        } else {
          dataToUpdate.value = 0;
        }

        return directus.updateItem('votes', voteID, dataToUpdate);
      }

      // If not, create record
      const newVote = {
        value: action === 'plus' ? 1 : -1,
        request_id: id,
        username,
        active: 1
      };

      return directus.createItem('votes', newVote);
    })
    .then(() => {
      if (Boolean(redirectToItem) === true)
        res.redirect('/r/' + id);
      else
        res.redirect(req.header('Referer'));
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

module.exports = vote;
