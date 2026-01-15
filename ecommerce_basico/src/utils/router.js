export function isRoute(req, method, path) {
  return req.method === method && req.url === path
}