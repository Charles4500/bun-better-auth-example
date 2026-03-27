const server = Bun.serve({
  development: true,
  port: 3000,
  routes: {
    "/": () => new Response("Bun initial setup!"),
  },
});

console.log(`Listening on ${server.url}`);
