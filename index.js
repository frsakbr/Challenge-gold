const express = require('express');
const app =  express();
const userRoutes = require('./routes/user.routes');
// const itemRoutes = require('./routes/items.routes');
// const orderRoutes = require('./routes/orders.routes');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Server running'));

app.use('/users', userRoutes);
// app.use('/items', itemRoutes);
// app.use('/orders', orderRoutes);

app.listen(PORT, () => {
    console.log('Server listening on PORT: ', PORT);
})