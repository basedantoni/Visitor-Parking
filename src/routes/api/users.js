import { Router } from 'express';

const router = Router();

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};
 
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

router.get('/', (req, res) => {
  return res.send(Object.values(users))
});

router.get('/:userId', (req, res) => {
  return res.send(users[req.params.userId])
});

router.post('/', (req, res) => {
  return res.send('POST HTTP method on user resource')
});

router.put('/:userId', (req, res) => res.send('PUT HTTP method on user resource'));

router.delete('/:userId', (req, res) => res.send('DELETE HTTP method on user resource'));

export default router;