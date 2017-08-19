import Thumbor from 'thumbor';
import Config from './config';

export function hasher(event, context, callback) {
  const img = event.pathParameters.image;
  const image = () => new Thumbor(Config.SecurityKey, Config.ThumborUrl).setImagePath(img);

  const sizes = {
    '50x50': image().crop(30, 30, 60, 60).resize(50, 50).buildUrl(),
    '300x0': image().resize(300, 0).buildUrl()
  };

  const reponse = {
    statusCode: 200,
    body: JSON.stringify(sizes)
  };

  callback(null, reponse);
}