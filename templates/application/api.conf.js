module.exports = (server) => {

  server.get('/api/test', (req, res) => {
    console.log(res);

    res.send({
      hello: 'world'
    });
  });

};
